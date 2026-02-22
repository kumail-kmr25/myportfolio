const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
    console.log("Seeding Diagnostic Patterns...");

    const patterns = [
        {
            keywords: ["cors", "access-control-allow-origin", "cross-origin"],
            possibleCauses: [
                "Missing CORS headers on the backend",
                "Frontend is hitting a different port/domain than configured",
                "Preflight request (OPTIONS) is failing"
            ],
            debugSteps: [
                "Check browser console for the exact CORS error message",
                "Verify 'next.config.js' or backend middleware allows your origin",
                "Inspect the 'Access-Control-Allow-Origin' header in the Network tab"
            ],
            complexity: "Medium",
            recommendedService: "Backend Debugging"
        },
        {
            keywords: ["404", "not found", "route missing"],
            possibleCauses: [
                "File-based routing path mismatch",
                "API endpoint is not exported correctly",
                "Base URL is incorrect in the fetch call"
            ],
            debugSteps: [
                "Verify the file exists in 'src/app/api/...'",
                "Check if the API route is using 'export async function GET'",
                "Ensure the URL in fetch matches the folder structure"
            ],
            complexity: "Low",
            recommendedService: "Bug Fixing"
        },
        {
            keywords: ["unauthorized", "401", "403", "session", "login"],
            possibleCauses: [
                "Cookie is not being sent with the request",
                "JWT secret mismatch between environments",
                "Session has expired"
            ],
            debugSteps: [
                "Check if the 'admin_session' cookie exists in Application tab",
                "Verify middleware logic in 'middleware.ts'",
                "Ensure 'credentials: \"include\"' is set in fetch if applicable"
            ],
            complexity: "Medium",
            recommendedService: "Security Audit"
        },
        {
            keywords: ["slow", "performance", "lcp", "lighthouse", "optimization"],
            possibleCauses: [
                "Unoptimized images (missing sizes or priority)",
                "Blocking third-party scripts",
                "Excessive client-side JavaScript"
            ],
            debugSteps: [
                "Run a Lighthouse audit in Incognito mode",
                "Analyze the JS bundle size with a bundle analyzer",
                "Identify the Largest Contentful Paint (LCP) element"
            ],
            complexity: "High",
            recommendedService: "Performance Optimization"
        }
    ];

    for (const pattern of patterns) {
        await prisma.issuePattern.create({
            data: pattern
        });
    }

    console.log("Seeding complete!");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
