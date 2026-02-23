import { Request, Response } from 'express';
import { encrypt } from "../../../lib/auth";
import { prisma } from '@portfolio/database';
import bcrypt from "bcryptjs";

export const POST = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: "Email and password are required." });
        }

        const admin = await prisma.admin.findFirst({
            where: { email: email.toLowerCase() },
        });

        if (!admin) {
            return res.status(401).json({ error: "Invalid credentials." });
        }

        const isPasswordValid = await bcrypt.compare(password, admin.password);

        if (!isPasswordValid) {
            return res.status(401).json({ error: "Invalid credentials." });
        }

        const expires = new Date(Date.now() + 2 * 60 * 60 * 1000); // 2 hours
        const session = await encrypt({
            user: "admin",
            userId: admin.userId,
            name: admin.name,
            email: admin.email,
            expires,
        });

        res.cookie("admin_session", session, {
            expires,
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
        });

        return res.json({
            success: true,
            name: admin.name,
            userId: admin.userId,
        });
    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}
