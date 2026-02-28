import { NextResponse } from "next/server";
import { prisma } from "@portfolio/database";
import crypto from "crypto";
import { sendPasswordResetEmail } from "@/lib/mail";

export async function POST(request: Request) {
    try {
        const { email } = await request.json();

        if (!email) {
            return NextResponse.json({ error: "Email is required." }, { status: 400 });
        }

        const admin = await prisma.admin.findFirst({
            where: { email },
        });

        // Even if we don't find the admin, we return success to prevent email enumeration
        if (!admin) {
            return NextResponse.json({
                success: true,
                message: "If an account exists for that email, we've sent a reset link.",
            });
        }

        const resetToken = crypto.randomBytes(32).toString("hex");
        const resetTokenExpiry = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes

        await prisma.admin.update({
            where: { id: admin.id },
            data: {
                resetToken,
                resetTokenExpiry,
            },
        });

        const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/admin/reset-password?token=${resetToken}`;

        await sendPasswordResetEmail(email, resetUrl);

        return NextResponse.json({
            success: true,
            message: "If an account exists for that email, we've sent a reset link.",
        });
    } catch (error) {
        console.error("Forgot password error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
