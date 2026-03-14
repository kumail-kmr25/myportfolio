import { NextResponse } from "next/server";
import { prisma } from "@portfolio/database";
import bcrypt from "bcryptjs";
import { apiResponse, apiError } from "@/lib/rate-limit";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function POST(request: Request) {
    try {
        const { token, newPassword } = await request.json();

        if (!token || !newPassword) {
            return apiError("Token and new password are required.", 400);
        }

        if (newPassword.length < 8) {
            return apiError("Password must be at least 8 characters long.", 400);
        }

        const admin = await (prisma as any).user.findFirst({
            where: {
                resetToken: token,
                resetTokenExpiry: {
                    gt: new Date(),
                },
            },
        });

        if (!admin) {
            return apiResponse({ success: false, error: "Invalid or expired reset token." }, 400);
        }

        const hashedPassword = await bcrypt.hash(newPassword, 12);

        await (prisma as any).user.update({
            where: { id: admin.id },
            data: {
                password: hashedPassword,
                resetToken: null,
                resetTokenExpiry: null,
            },
        });

        return apiResponse({
            success: true,
            message: "Password reset successfully! You can now login.",
        });
    } catch (error) {
        console.error("Reset password error:", error);
        return apiError("Internal server error");
    }
}
