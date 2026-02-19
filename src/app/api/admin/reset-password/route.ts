import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
    try {
        const { identifier, newPassword } = await req.json();

        if (!identifier || !newPassword) {
            return NextResponse.json(
                { error: "Recovery identifier and new password are required." },
                { status: 400 }
            );
        }

        if (newPassword.length < 6) {
            return NextResponse.json(
                { error: "New password must be at least 6 characters." },
                { status: 400 }
            );
        }

        const recoveryPhone = process.env.RECOVERY_PHONE || "6006121193";
        const recoveryEmail = process.env.RECOVERY_EMAIL || "ka6307464@gmail.com";

        const trimmedIdentifier = identifier.trim();

        if (trimmedIdentifier !== recoveryPhone && trimmedIdentifier.toLowerCase() !== recoveryEmail.toLowerCase()) {
            return NextResponse.json(
                { error: "Verification failed. The phone number or email does not match our records." },
                { status: 403 }
            );
        }

        const admin = await prisma.admin.findFirst();
        if (!admin) {
            return NextResponse.json(
                { error: "No admin account found. Please register first." },
                { status: 404 }
            );
        }

        const hashedPassword = await bcrypt.hash(newPassword, 12);

        await prisma.admin.update({
            where: { id: admin.id },
            data: { password: hashedPassword },
        });

        return NextResponse.json({
            success: true,
            message: "Password reset successfully! You can now login with your new password.",
        });
    } catch (error: any) {
        console.error("Password reset error:", error);
        return NextResponse.json(
            { error: "Password reset failed. Please try again." },
            { status: 500 }
        );
    }
}
