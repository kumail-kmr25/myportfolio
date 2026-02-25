import { NextResponse } from "next/server";
import { prisma } from "@portfolio/database";
import bcrypt from "bcryptjs";
import crypto from "crypto";

function generateUserId(): string {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let id = "KK-";
    for (let i = 0; i < 5; i++) {
        id += chars.charAt(crypto.randomInt(chars.length));
    }
    return id;
}

function verifyCredentials(name: string, email: string, phone: string) {
    const adminName = (process.env.ADMIN_NAME || "kumail kmr").toLowerCase().trim();
    const adminEmail = (process.env.ADMIN_EMAIL || "ka6307464@gmail.com").toLowerCase().trim();
    const adminPhone = (process.env.ADMIN_PHONE || "6006121193").trim();

    const nameMatch = name.toLowerCase().trim() === adminName;
    const emailMatch = email.toLowerCase().trim() === adminEmail;
    const phoneMatch = phone.trim() === adminPhone;

    return { nameMatch, emailMatch, phoneMatch, allMatch: nameMatch && emailMatch && phoneMatch };
}

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const name = searchParams.get("name") || "";
        const email = searchParams.get("email") || "";
        const phone = searchParams.get("phone") || "";

        const result = verifyCredentials(name, email, phone);

        return NextResponse.json({
            nameMatch: result.nameMatch,
            emailMatch: result.emailMatch,
            phoneMatch: result.phoneMatch,
        });
    } catch (error) {
        console.error("Verification check error:", error);
        return NextResponse.json({ error: "Verification failed" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const existingAdmin = await prisma.admin.findFirst();
        if (existingAdmin) {
            return NextResponse.json({ error: "Admin already registered. Registration is closed." }, { status: 403 });
        }

        const { name, email, phone, password } = await request.json();

        if (!name || !email || !phone || !password) {
            return NextResponse.json({ error: "Name, email, phone and password are required." }, { status: 400 });
        }

        if (password.length < 8) {
            return NextResponse.json({ error: "Password must be at least 8 characters." }, { status: 400 });
        }

        const verification = verifyCredentials(name, email, phone);
        if (!verification.allMatch) {
            return NextResponse.json({ error: "You cannot register. Only authorised admins can register." }, { status: 403 });
        }

        const userId = generateUserId();
        const hashedPassword = await bcrypt.hash(password, 12);

        const admin = await prisma.admin.create({
            data: {
                name: name.trim(),
                email: email.toLowerCase().trim(),
                phone: phone.trim(),
                userId,
                password: hashedPassword,
            },
        });

        return NextResponse.json({
            success: true,
            message: "Admin registered successfully!",
            userId: admin.userId,
        });
    } catch (error: any) {
        console.error("Registration error:", error);
        if (error.code === "P2002") {
            return NextResponse.json({ error: "An account with these details already exists." }, { status: 409 });
        }
        return NextResponse.json({ error: "Registration failed. Please try again." }, { status: 500 });
    }
}
