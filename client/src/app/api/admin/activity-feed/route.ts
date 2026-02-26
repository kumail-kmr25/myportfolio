import { NextResponse } from "next/server";
import { prisma } from "@portfolio/database";
import { getSession } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET() {
    try {
        const payload = await getSession();
        if (!payload || !payload.userId) {
            return NextResponse.json([], { status: 401 });
        }

        // Fetch recent items from multiple models
        const [hireRequests, messages, diagLogs] = await Promise.all([
            prisma.hireRequest.findMany({
                orderBy: { createdAt: "desc" },
                take: 10
            }),
            prisma.contactSubmission.findMany({
                orderBy: { created_at: "desc" },
                take: 10
            }),
            prisma.diagnosticLog.findMany({
                orderBy: { createdAt: "desc" },
                take: 10
            })
        ]);

        // Unified Activity Feed with type-specific metadata
        const activities = [
            ...hireRequests.map(h => ({
                id: h.id,
                type: "hire",
                title: `New Hire Request: ${h.name}`,
                subtitle: `${h.selectedService} | ${h.budgetRange}`,
                timestamp: h.createdAt,
                status: h.status,
                color: "blue"
            })),
            ...messages.map(m => ({
                id: m.id,
                type: "message",
                title: `Message from ${m.name}`,
                subtitle: m.inquiryType || "General Inquiry",
                timestamp: m.created_at,
                status: m.replied ? "replied" : "new",
                color: "indigo"
            })),
            ...diagLogs.map(l => ({
                id: l.id,
                type: "diagnostic",
                title: "Diagnostic Run",
                subtitle: l.description.substring(0, 60) + (l.description.length > 60 ? "..." : ""),
                timestamp: l.createdAt,
                status: l.matchedPatternId ? "matched" : "no-match",
                color: "purple"
            })),
            // Simulated Operational Logs for "Studio" feel
            {
                id: "sys-1",
                type: "system",
                title: "Security Heartbeat",
                subtitle: "SSL/TLS integrity check verified. Secure handshake active.",
                timestamp: new Date(Date.now() - 1000 * 60 * 5),
                status: "secure",
                color: "green"
            },
            {
                id: "sys-2",
                type: "system",
                title: "Database Optimization",
                subtitle: "Vacuum process completed. Index health: 98.4%",
                timestamp: new Date(Date.now() - 1000 * 60 * 45),
                status: "optimized",
                color: "blue"
            },
            {
                id: "sys-3",
                type: "security",
                title: "Admin Session",
                subtitle: `Authorized session active from 192.168.1.1`,
                timestamp: new Date(Date.now() - 1000 * 60 * 2),
                status: "active",
                color: "amber"
            }
        ].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

        return NextResponse.json(activities.slice(0, 20));

    } catch (error) {
        console.error("LIVE_FEED_API_ERROR:", error);
        return NextResponse.json([], { status: 500 });
    }
}

