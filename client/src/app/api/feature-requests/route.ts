import { NextResponse } from "next/server";
import { prisma } from "@portfolio/database";
import { featureRequestSchema } from "@portfolio/shared";
import xss from "xss";

// In-memory rate limiting (per-instance)
const rateLimit = new Map<string, { count: number; lastReset: number }>();
const LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour
const MAX_REQUESTS = 5;

export async function GET() {
    try {
        const completedRequests = await prisma.featureRequest.findMany({
            where: { status: "completed" },
            orderBy: { created_at: "desc" },
            take: 10
        });
        return NextResponse.json(completedRequests);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch features" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const ip = request.headers.get("x-forwarded-for") || "anonymous";
        const now = Date.now();
        const clientLimit = rateLimit.get(ip) || { count: 0, lastReset: now };

        if (now - clientLimit.lastReset > LIMIT_WINDOW) {
            clientLimit.count = 0;
            clientLimit.lastReset = now;
        }

        if (clientLimit.count >= MAX_REQUESTS) {
            return NextResponse.json({ error: "Too many submissions. Try again later." }, { status: 429 });
        }

        const body = await request.json();

        const result = featureRequestSchema.safeParse(body);
        if (!result.success) {
            return NextResponse.json({ error: "Validation failed", details: result.error.format() }, { status: 400 });
        }

        const { name, email, message, category } = result.data;

        const featureRequest = await prisma.featureRequest.create({
            data: {
                name: xss(name),
                email,
                message: xss(message),
                category,
                status: "pending"
            }
        });

        clientLimit.count++;
        rateLimit.set(ip, clientLimit);

        return NextResponse.json({ success: true, id: featureRequest.id });
    } catch (error) {
        console.error("Feature request POST error:", error);
        return NextResponse.json({ error: "Failed to submit feature request" }, { status: 500 });
    }
}
