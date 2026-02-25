import { NextResponse } from "next/server";
import { encrypt } from "@/lib/auth";
import { prisma } from "@portfolio/database";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
    try {
        const { email, password } = await request.json();

        if (!email || !password) {
            return NextResponse.json({ error: "Email and password are required." }, { status: 400 });
        }

        const admin = await prisma.admin.findFirst({
            where: { email: email.toLowerCase() },
        });

        if (!admin) {
            return NextResponse.json({ error: "Invalid credentials." }, { status: 401 });
        }

        const isPasswordValid = await bcrypt.compare(password, admin.password);

        if (!isPasswordValid) {
            return NextResponse.json({ error: "Invalid credentials." }, { status: 401 });
        }

        const expires = new Date(Date.now() + 2 * 60 * 60 * 1000); // 2 hours
        const session = await encrypt({
            user: "admin",
            userId: admin.userId,
            name: admin.name,
            email: admin.email,
            expires,
        });

        // Log the login activity (non-blocking)
        (prisma as any).adminActivityLog.create({
            data: {
                adminId: admin.id,
                action: "login",
                ip: request.headers.get("x-forwarded-for") || "unknown",
                userAgent: request.headers.get("user-agent") || "unknown",
            }
        }).catch(() => { });

        const response = NextResponse.json({
            success: true,
            name: admin.name,
            userId: admin.userId,
        });

        response.cookies.set("admin_session", session, {
            expires,
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
        });

        return response;
    } catch (error) {
        console.error("Login error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
