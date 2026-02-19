import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
    try {
        const { token, newPassword } = await req.json();

        if (!token || !newPassword) {
            return NextResponse.json(
                { error: "Token and new password are required." },
                { status: 400 }
            );
        }

        if (newPassword.length < 8) {
            return NextResponse.json(
                { error: "Password must be at least 8 characters long." },
                { status: 400 }
            );
        }

        const admin = await prisma.admin.findFirst({
            where: {
                resetToken: token,
                resetTokenExpiry: {
                    gt: new Date(),
                },
            },
        });

        if (!admin) {
            return NextResponse.json(
                { error: "Invalid or expired reset token." },
                { status: 400 }
            );
        }

        const hashedPassword = await bcrypt.hash(newPassword, 12);

        await prisma.admin.update({
            where: { id: admin.id },
            data: {
                password: hashedPassword,
                resetToken: null,
                resetTokenExpiry: null,
            },
        });

        return NextResponse.json({
            success: true,
            message: "Password reset successfully! You can now login.",
        });
    } catch (error) {
        console.error("Reset password error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
