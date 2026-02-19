import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import crypto from "crypto";

function generateUserId(): string {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let id = "KK-";
    for (let i = 0; i < 5; i++) {
        id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
}

function generateStrongPassword(): string {
    const upper = "ABCDEFGHJKLMNPQRSTUVWXYZ";
    const lower = "abcdefghjkmnpqrstuvwxyz";
    const digits = "23456789";
    const special = "!@#$%&*";
    const all = upper + lower + digits + special;

    let password = "";
    password += upper[Math.floor(Math.random() * upper.length)];
    password += lower[Math.floor(Math.random() * lower.length)];
    password += digits[Math.floor(Math.random() * digits.length)];
    password += special[Math.floor(Math.random() * special.length)];

    for (let i = 0; i < 8; i++) {
        password += all[Math.floor(Math.random() * all.length)];
    }

    return password.split("").sort(() => Math.random() - 0.5).join("");
}

export async function POST(req: Request) {
    try {
        // Check if admin already exists
        const existingAdmin = await prisma.admin.findFirst();
        if (existingAdmin) {
            return NextResponse.json(
                { error: "Only admin can register. Registration is closed." },
                { status: 403 }
            );
        }

        const { name, email, password } = await req.json();

        if (!name || !email || !password) {
            return NextResponse.json(
                { error: "Name, email, and password are required." },
                { status: 400 }
            );
        }

        if (password.length < 6) {
            return NextResponse.json(
                { error: "Password must be at least 6 characters." },
                { status: 400 }
            );
        }

        const userId = generateUserId();
        const hashedPassword = await bcrypt.hash(password, 12);

        const admin = await prisma.admin.create({
            data: {
                name,
                email,
                userId,
                password: hashedPassword,
            },
        });

        const suggestedPassword = generateStrongPassword();

        return NextResponse.json({
            success: true,
            message: "Admin registered successfully!",
            userId: admin.userId,
            suggestedStrongPassword: suggestedPassword,
            note: "Save your User ID. Use the suggested strong password if you want extra security (you'll need to update your password to use it).",
        });
    } catch (error: any) {
        console.error("Registration error:", error);
        if (error.code === "P2002") {
            return NextResponse.json(
                { error: "Email already in use." },
                { status: 409 }
            );
        }
        return NextResponse.json(
            { error: "Registration failed. Please try again." },
            { status: 500 }
        );
    }
}
