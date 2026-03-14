import { NextRequest, NextResponse } from "next/server";
import { load } from "cheerio";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json().catch(() => ({}));
        const { url } = body;

        if (!url) {
            return NextResponse.json({ success: false, error: "URL is required" }, { status: 400 });
        }

        // 1. Normalize and validate URL
        let targetUrl = url;
        if (!/^https?:\/\//i.test(targetUrl)) {
            targetUrl = `https://${targetUrl}`;
        }

        try {
            new URL(targetUrl);
        } catch (e) {
            return NextResponse.json({ success: false, error: "Invalid URL format" }, { status: 400 });
        }

        // 2. SSL Check & Initial Load
        const sslCheck = targetUrl.startsWith("https://");
        let html = "";
        let loadTime = 0;

        try {
            const startTime = Date.now();
            const response = await fetch(targetUrl, { 
                headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36' },
                next: { revalidate: 0 } 
            });
            loadTime = (Date.now() - startTime) / 1000;
            html = await response.text();
        } catch (error) {
            return NextResponse.json({ success: false, error: "Could not connect to the website" }, { status: 500 });
        }

        // 3. SEO & Mobile Checks with Cheerio
        const $ = load(html);
        const title = $("title").first().text() || "";
        const description = $('meta[name="description"]').first().attr("content") || "";
        const h1Count = $("h1").length;
        const ogTitle = $('meta[property="og:title"]').first().attr("content") || "";
        const viewport = $('meta[name="viewport"]').first().attr("content") || "";

        const seo = {
            title: title ? "✅ Present" : "❌ Missing",
            titleContent: title,
            description: description ? "✅ Present" : "❌ Missing",
            descriptionContent: description,
            h1: h1Count > 0 ? `✅ Present (${h1Count})` : "❌ Missing",
            ogTags: ogTitle ? "✅ Present" : "❌ Missing",
        };

        const mobile = {
            responsive: viewport.includes("width=device-width") ? "✅ Mobile Friendly" : "❌ Not Mobile Friendly",
            viewport: viewport ? "✅ Present" : "❌ Missing",
        };

        // 4. PageSpeed Insights API call (Google)
        const apiKey = process.env.NEXT_PUBLIC_PAGESPEED_API_KEY;
        const pagespeedApiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(targetUrl)}&category=performance&category=accessibility&category=best-practices&category=seo&strategy=mobile${apiKey ? `&key=${apiKey}` : ""}`;
        
        let perfData = null;
        try {
            const psResponse = await fetch(pagespeedApiUrl);
            const psJson = await psResponse.json();

            if (psResponse.ok) {
                const lighthouse = psJson.lighthouseResult;
                const categories = lighthouse?.categories;
                if (categories) {
                    perfData = {
                        performance: Math.round((categories?.performance?.score || 0) * 100),
                        accessibility: Math.round((categories?.accessibility?.score || 0) * 100),
                        bestPractices: Math.round((categories?.['best-practices']?.score || 0) * 100),
                        seo: Math.round((categories?.seo?.score || 0) * 100),
                        fcp: lighthouse?.audits?.['first-contentful-paint']?.displayValue || "N/A",
                        lcp: lighthouse?.audits?.['largest-contentful-paint']?.displayValue || "N/A",
                        tti: lighthouse?.audits?.['interactive']?.displayValue || "N/A",
                    };
                }
            } else {
                console.error("PageSpeed API error status:", psResponse.status, psJson.error);
            }
        } catch (error) {
            console.error("PageSpeed API network error:", error);
        }

        const auditData = {
            url: targetUrl,
            loadTime: `${loadTime.toFixed(2)}s`,
            ssl: sslCheck ? "✅ Secure (HTTPS)" : "⚠️ Not Secure (HTTP)",
            seo,
            mobile,
            performance: perfData
        };

        // 5. Save to database (Lead Capture)
        try {
            const { prisma } = await import("@portfolio/database");
            await prisma.auditRequest.create({
                data: {
                    websiteUrl: targetUrl,
                    performance: perfData?.performance,
                    accessibility: perfData?.accessibility,
                    seo: perfData?.seo,
                    bestPractices: perfData?.bestPractices,
                    loadTime: loadTime,
                    fcp: perfData?.fcp,
                    lcp: perfData?.lcp,
                    tti: perfData?.tti,
                    hasSSL: sslCheck,
                    isMobileFriendly: mobile.responsive.includes("✅"),
                    leadScore: perfData?.performance || 0,
                }
            });
        } catch (dbError) {
            console.error("Failed to save audit to DB:", dbError);
            // We still return results to user even if DB save fails
        }

        return NextResponse.json({
            success: true,
            data: auditData
        });
    } catch (error: any) {
        console.error("AUDIT_API_CRASH:", error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
