import { NextResponse } from "next/server";

const rateLimitMap = new Map<string, { count: number; lastReset: number }>();

export interface RateLimitOptions {
    windowMs: number;
    max: number;
}

/**
 * Enhanced in-memory rate limiting for Next.js Route Handlers.
 * Centralized here to allow for easy swap to Redis/Upstash later.
 */
export function checkRateLimit(ip: string, options: RateLimitOptions) {
    const now = Date.now();
    const clientLimit = rateLimitMap.get(ip) || { count: 0, lastReset: now };

    // Reset window if expired
    if (now - clientLimit.lastReset > options.windowMs) {
        clientLimit.count = 0;
        clientLimit.lastReset = now;
    }

    if (clientLimit.count >= options.max) {
        return {
            isLimited: true,
            response: NextResponse.json(
                { 
                    success: false, 
                    error: "Too many requests. Please try again later.",
                    retryAfter: Math.ceil((options.windowMs - (now - clientLimit.lastReset)) / 1000)
                }, 
                { status: 429 }
            )
        };
    }

    clientLimit.count++;
    rateLimitMap.set(ip, clientLimit);

    return { isLimited: false };
}

/**
 * Standard API response wrapper
 */
export function apiResponse(data: any, status = 200) {
    return NextResponse.json({ success: true, ...data }, { status });
}

/**
 * Standard API error wrapper
 */
export function apiError(message: string, status = 500, details?: any) {
    return NextResponse.json(
        { 
            success: false, 
            error: message, 
            ...(details && { details }) 
        }, 
        { status }
    );
}

/**
 * Helper to get clean IP from request headers
 */
export function getClientIP(request: Request) {
    const forwarded = request.headers.get("x-forwarded-for");
    if (forwarded) {
        return forwarded.split(',')[0].trim();
    }
    return "anonymous";
}
