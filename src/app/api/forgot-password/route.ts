import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import crypto from "crypto";
import { sendPasswordResetEmail } from "@/lib/mail";

// Basic in-memory rate limiting
const rateLimit = new Map<string, { count: number; lastReset: number }>();
const LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutes
const MAX_REQUESTS = 3;

export async function POST(req: Request) {
    try {
        const ip = req.headers.get("x-forwarded-for") || "anonymous";
        const now = Date.now();
        const clientLimit = rateLimit.get(ip) || { count: 0, lastReset: now };

        if (now - clientLimit.lastReset > LIMIT_WINDOW) {
            clientLimit.count = 0;
            clientLimit.lastReset = now;
        }

        if (clientLimit.count >= MAX_REQUESTS) {
            return NextResponse.json(
                { error: "Too many reset attempts. Please try again in 15 minutes." },
                { status: 429 }
            );
        }

        clientLimit.count++;
        rateLimit.set(ip, clientLimit);

        const { email } = await req.json();

        if (!email || !email.includes("@")) {
            return NextResponse.json({ message: "If this email is registered, a reset link will be sent." }, { status: 200 });
        }

        const admin = await prisma.admin.findUnique({
            where: { email: email.toLowerCase() },
        });

        if (admin) {
            const token = crypto.randomBytes(32).toString("hex");
            const expiry = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes

            await prisma.admin.update({
                where: { id: admin.id },
                data: {
                    resetToken: token,
                    resetTokenExpiry: expiry,
                },
            });

            const appUrl = process.env.APP_URL || "http://localhost:3000";
            const resetUrl = `${appUrl}/admin/reset-password?token=${token}`;

            await sendPasswordResetEmail(admin.email, resetUrl);
        }

        // Always return generic success to prevent email enumeration
        return NextResponse.json({
            message: "If this email is registered, a reset link will be sent.",
        });
    } catch (error) {
        console.error("Forgot password error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
