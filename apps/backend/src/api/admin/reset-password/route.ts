import { Request, Response } from 'express';
import { prisma } from '@portfolio/database';
import bcrypt from "bcryptjs";

export const POST = async (req: Request, res: Response) => {
    try {
        const { token, newPassword } = req.body;

        if (!token || !newPassword) {
            return res.status(400).json({ error: "Token and new password are required." });
        }

        if (newPassword.length < 8) {
            return res.status(400).json({ error: "Password must be at least 8 characters long." });
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
            return res.status(400).json({ error: "Invalid or expired reset token." });
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

        return res.json({
            success: true,
            message: "Password reset successfully! You can now login.",
        });
    } catch (error) {
        console.error("Reset password error:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}
