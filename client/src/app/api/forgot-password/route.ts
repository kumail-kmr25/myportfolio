import { prisma } from "@portfolio/database";
import crypto from "crypto";
import { sendPasswordResetEmail } from "@/lib/mail";
import { apiResponse, apiError } from "@/lib/rate-limit";

// Basic in-memory rate limiting
const rateLimit = new Map<string, { count: number; lastReset: number }>();
const LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutes
const MAX_REQUESTS = 3;

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
            return apiError("Too many reset attempts. Please try again in 15 minutes.", 429);
        }

        clientLimit.count++;
        rateLimit.set(ip, clientLimit);

        const { email } = await request.json();

        if (!email || !email.includes("@")) {
            return apiResponse({ message: "If this email is registered, a reset link will be sent." });
        }

        const admin = await prisma.user.findFirst({
            where: { email },
        });

        if (admin) {
            const resetToken = crypto.randomBytes(32).toString("hex");
            const resetTokenExpiry = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes

            await prisma.user.update({
                where: { id: admin.id },
                data: {
                    resetToken,
                    resetTokenExpiry,
                },
            });

            const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
            const resetUrl = `${appUrl}/admin/reset-password?token=${resetToken}`;
            await sendPasswordResetEmail(email, resetUrl);
        }

        // Always return generic success to prevent email enumeration
        return apiResponse({
            message: "If this email is registered, a reset link will be sent.",
        });
    } catch (error) {
        console.error("Forgot password error:", error);
        return apiError("Internal server error");
    }
}
