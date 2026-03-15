const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
    console.log("🚀 Starting Feature Registry Seeding...");
    console.log("Prisma keys:", Object.keys(prisma).filter(k => k.indexOf('$') === -1));

    const features = [
        // TIER 1
        { featureKey: "ai-chat", name: "AI Chat Assistant", category: "engagement", description: "Smart conversational bot for lead capture and FAQ." },
        { featureKey: "project-video", name: "Video Walkthroughs", category: "engagement", description: "In-depth project demo videos for high-impact trust." },
        { featureKey: "live-preview", name: "Live Site Previews", category: "engagement", description: "Interactive iframe previews of completed works." },
        { featureKey: "revenue-dashboard", name: "Revenue Dashboard", category: "engagement", description: "Public-facing ROI and revenue generation metrics." },
        { featureKey: "voice-intro", name: "Voice Introduction", category: "personality", description: "Personal audio greeting for the 'About' section." },
        
        // TIER 2
        { featureKey: "certifications", name: "Certifications", category: "trust", description: "Verified industry credentials and achievement badges." },
        { featureKey: "dev-log", name: "Development Log", category: "trust", description: "Weekly 'How I Spent My Time' transparency feed." },
        { featureKey: "code-snippets", name: "Code Snippets", category: "trust", description: "Reusable logic blocks showcased with syntax highlighting." },
        { featureKey: "tech-radar", name: "Technology Radar", category: "trust", description: "Interactive visualization of current proficiency matrix." },
        { featureKey: "fit-score", name: "Client Fit Score", category: "trust", description: "Gamified questionnaire to qualify incoming leads." },
        
        // TIER 3
        { featureKey: "proposal-gen", name: "Proposal Generator", category: "automation", description: "Instant project scope and pricing PDF generator." },
        { featureKey: "payment-links", name: "Payment Links", category: "monetization", description: "Direct Razorpay/Stripe integration for quick deposits." },
        { featureKey: "milestone-tracker", name: "Milestone Tracker", category: "engagement", description: "Public progress bar for active client projects." },
        { featureKey: "ab-testing", name: "A/B Testing", category: "automation", description: "Element variation testing for conversion optimization." },
        { featureKey: "qr-card", name: "QR Business Card", category: "engagement", description: "Digital vCard with scan-to-save functionality." },
        
        // TIER 4
        { featureKey: "theme-toggle", name: "Dark/Light Mode", category: "personality", description: "Global theme customization for visitor comfort." },
        { featureKey: "multi-lang", name: "Multi-Language", category: "engagement", description: "i18n support for global reach (EN/HI)." },
        { featureKey: "email-sig", name: "Email Signature Gen", category: "automation", description: "Professional signature generator for Gmail/Outlook." },
        { featureKey: "learning-hub", name: "Mini Learning Section", category: "engagement", description: "Small, high-value tutorials for visitors." },
        { featureKey: "badges", name: "Achievement Badges", category: "personality", description: "Gamified reward system for site interaction." },
        
        // TIER 5
        { featureKey: "weekly-reports", name: "Weekly Client Reports", category: "automation", description: "Automated project health and metrics reporting." },
        { featureKey: "onboarding", name: "Onboarding Wizard", category: "automation", description: "Multi-step client intake form for project kickoff." },
        { featureKey: "brief-templates", name: "Project Brief Templates", category: "automation", description: "Downloadable strategy templates for prospects." },
        { featureKey: "subscriber-sync", name: "Subscriber Notifications", category: "automation", description: "Newsletter and project update broadcast tool." },
        { featureKey: "client-map", name: "Client Map", category: "trust", description: "Geospatial visualization of global client base." },
        
        // TIER 6
        { featureKey: "os-contributions", name: "Open Source Activity", category: "personality", description: "Real-time feed of GitHub contributions/PRs." },
        { featureKey: "tech-blog", name: "Technical Blog", category: "trust", description: "Deep-dives into architecture and engineering." },
        { featureKey: "component-lib", name: "Component Library", category: "trust", description: "Showcase of custom UI components and animations." },
        { featureKey: "adr-logs", name: "Arch Decisions (ADR)", category: "trust", description: "Formal logs of technical architecture choices." },
        
        // TIER 7
        { featureKey: "courses", name: "Mini Courses", category: "monetization", description: "Premium educational content for lead nourishment." },
        { featureKey: "templates", name: "Premium Templates", category: "monetization", description: "Ready-to-use codebase templates for sale." },
        { featureKey: "freelance-resources", name: "Freelance Toolkit", category: "monetization", description: "Standard contracts, checklists, and templates." },
        { featureKey: "consultation", name: "Paid Consultation", category: "monetization", description: "Calendly-style discovery and strategy bookings." },
        
        // TIER 8
        { featureKey: "spotify", name: "Spotify Integration", category: "personality", description: "Live 'Now Playing' and curated dev-playlists." },
        { featureKey: "bts-gallery", name: "BTS Gallery", category: "personality", description: "Behind-the-scenes look at the workspace and setup." },
        { featureKey: "think-process", name: "Thinking Process", category: "trust", description: "Case studies focused on 'How I Solved X'." },
        { featureKey: "differently", name: "Retrospectives", category: "trust", description: "'What I'd Do Differently' reflecting on old projects." },
        
        // TIER 9-11
        { featureKey: "integrations", name: "Integration Hub", category: "automation", description: "Management of all external API connections." },
        { featureKey: "website-grader", name: "Website Grader", category: "trust", description: "Automated speed/SEO audit tool for prospects." },
        { featureKey: "cost-calc", name: "Cost Calculator", category: "automation", description: "Instant estimate generator based on requirements." },
        { featureKey: "meta-gen", name: "Meta Tag Gen", category: "automation", description: "Utility for generating SEO-ready social cards." },
        { featureKey: "responsive-tool", name: "Responsiveness Checker", category: "automation", description: "Live viewport testing for websites." },
        { featureKey: "day-in-life", name: "Day in My Life", category: "personality", description: "Chronological timeline of routine and focus." },
        { featureKey: "media-appearances", name: "Media Highlights", category: "trust", description: "Podcasts, interviews, and public appearances." },
        { featureKey: "reading-list", name: "Reading List", category: "personality", description: "Curated books that shaped my engineering mindset." },
        { featureKey: "comparison", name: "Comparison Matrix", category: "monetization", description: "Direct comparison: Freelancer vs Agency vs Fiverr." },
        { featureKey: "success-videos", name: "Success Stories", category: "trust", description: "Video testimonials from past clients." },
        { featureKey: "feature-analytics", name: "Tactical Analytics", category: "automation", description: "Deep usage tracking for every site module." }
    ];

    for (const f of features) {
        try {
            console.log(`📡 Processing: ${f.featureKey}`);
            await prisma.featureToggle.upsert({
                where: { featureKey: f.featureKey },
                update: {}, // Don't overwrite existing settings
                create: {
                    ...f,
                    enabled: false,
                    config: {}
                }
            });
            console.log(`✅ ${f.name} initialized.`);
        } catch (error) {
            console.error(`❌ ${f.name} failed:`, error);
        }
    }

    console.log("🏁 Feature Registry Synchronization Complete.");

    // Initialize Tier 1 Configs
    try {
        await prisma.aIChatConfig.upsert({
            where: { id: "default-ai-config" },
            update: {},
            create: {
                id: "default-ai-config",
                enabled: true,
                botName: "Kumail KMR's Assistant",
                welcomeMessage: "Hi! I'm Kumail KMR's AI assistant. How can I help you build something amazing today?",
                quickQuestions: ["What services do you offer?", "How much does a website cost?", "Are you available for hire?"],
            }
        });
        console.log("✅ AI Chat Config initialized.");
    } catch (error) {
        console.error("❌ AI Chat Config initialization failed:", error);
    }

    // Feature 2: Project Videos
    const videos = [
        { title: "CUE AI: Contextual Reasoning Architecture", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", videoType: "youtube", description: "Deep dive into the contextual reasoning engine.", featured: true, duration: 342 },
        { title: "MedQ AI: Secure Data Flow", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", videoType: "youtube", description: "Architectural overview of medical data security.", featured: true, duration: 258 }
    ];
    for (const v of videos) {
        await prisma.projectVideo.upsert({
            where: { id: v.title.toLowerCase().replace(/ /g, "-") },
            update: {},
            create: { id: v.title.toLowerCase().replace(/ /g, "-"), ...v }
        });
    }

    // Feature 3: Live Previews
    const previews = [
        { title: "EduNova SaaS", siteUrl: "https://edunova-saas.vercel.app", defaultView: "desktop" },
        { title: "ValeKash Fintech", siteUrl: "https://valekash.vercel.app/", defaultView: "mobile" }
    ];
    for (const p of previews) {
        await prisma.livePreview.upsert({
            where: { id: p.title.toLowerCase().replace(/ /g, "-") },
            update: {},
            create: { id: p.title.toLowerCase().replace(/ /g, "-"), ...p }
        });
    }

    // Feature 4: Client Revenue
    const revenue = [
        { clientName: "Global Retail", industry: "ecommerce", monthlyRevenueBefore: 1200000, monthlyRevenueAfter: 4500000, totalRevenueGenerated: 25000000, conversionBefore: 1.2, conversionAfter: 3.8, trafficBefore: 50000, trafficAfter: 125000 },
        { clientName: "Skyline Logistics", industry: "logistics", monthlyRevenueBefore: 8500000, monthlyRevenueAfter: 11200000, totalRevenueGenerated: 42000000, conversionBefore: 0.8, conversionAfter: 2.1, trafficBefore: 15000, trafficAfter: 42000 }
    ];
    for (const r of revenue) {
        await prisma.clientRevenue.upsert({
            where: { id: r.clientName.toLowerCase().replace(/ /g, "-") },
            update: {},
            create: { id: r.clientName.toLowerCase().replace(/ /g, "-"), ...r }
        });
    }

    // Feature 5: Voice Intro
    await prisma.voiceIntro.upsert({
        where: { id: "default-voice-intro" },
        update: {},
        create: {
            id: "default-voice-intro",
            enabled: true,
            audioUrl: "/audio/intro.mp3",
            transcript: "Hi, I'm Kumail KMR. I build high-performance systems that drive real business impact. Welcome to my engineering repository."
        }
    });
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
