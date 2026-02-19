import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { sendRegistrationSMS } from "@/lib/sms";

/**
 * Generate userId in format: KK25-XXXXXX
 * where XXXXXX = last 6 digits of phone number
 */
function generateUserId(phone: string): string {
    const last6 = phone.slice(-6);
    return `KK25-${last6}`;
}

/**
 * Generate a strong random password
 */
function generateStrongPassword(): string {
    const upper = "ABCDEFGHJKLMNPQRSTUVWXYZ";
    const lower = "abcdefghjkmnpqrstuvwxyz";
    const digits = "23456789";
    const special = "!@#$%&*";
    const all = upper + lower + digits + special;

    let password = "";
    password += upper[crypto.randomInt(upper.length)];
    password += lower[crypto.randomInt(lower.length)];
    password += digits[crypto.randomInt(digits.length)];
    password += special[crypto.randomInt(special.length)];

    for (let i = 0; i < 8; i++) {
        password += all[crypto.randomInt(all.length)];
    }

    return password.split("").sort(() => Math.random() - 0.5).join("");
}

/**
 * Verify registration credentials against env vars
 */
function verifyCredentials(name: string, email: string, phone: string): {
    nameMatch: boolean;
    emailMatch: boolean;
    phoneMatch: boolean;
    allMatch: boolean;
} {
    const adminName = (process.env.ADMIN_NAME || "kumail kmr").toLowerCase().trim();
    const adminEmail = (process.env.ADMIN_EMAIL || "ka6307464@gmail.com").toLowerCase().trim();
    const adminPhone = (process.env.ADMIN_PHONE || "6006121193").trim();

    const nameMatch = name.toLowerCase().trim() === adminName;
    const emailMatch = email.toLowerCase().trim() === adminEmail;
    const phoneMatch = phone.trim() === adminPhone;

    return {
        nameMatch,
        emailMatch,
        phoneMatch,
        allMatch: nameMatch && emailMatch && phoneMatch,
    };
}

/**
 * GET — Real-time credential verification for yellow spotlight
 * Query params: name, email, phone
 */
export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
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

/**
 * POST — Register admin (only if credentials match)
 */
export async function POST(req: Request) {
    try {
        // Check if admin already exists
        const existingAdmin = await prisma.admin.findFirst();
        if (existingAdmin) {
            return NextResponse.json(
                { error: "Only admins can register. Registration is closed." },
                { status: 403 }
            );
        }

        const { name, email, phone } = await req.json();

        if (!name || !email || !phone) {
            return NextResponse.json(
                { error: "Name, email, and phone are required." },
                { status: 400 }
            );
        }

        // Verify credentials match the authorized admin
        const verification = verifyCredentials(name, email, phone);
        if (!verification.allMatch) {
            return NextResponse.json(
                { error: "You cannot register. Only admins can register." },
                { status: 403 }
            );
        }

        // Auto-generate strong password
        const generatedPassword = generateStrongPassword();
        const userId = generateUserId(phone);
        const hashedPassword = await bcrypt.hash(generatedPassword, 12);

        const admin = await prisma.admin.create({
            data: {
                name: name.trim(),
                email: email.toLowerCase().trim(),
                phone: phone.trim(),
                userId,
                password: hashedPassword,
            },
        });

        // Send SMS notification with auto-generated credentials
        sendRegistrationSMS({
            to: phone.trim(),
            userId: admin.userId,
            password: generatedPassword,
        }).catch((err) => console.error("SMS notification failed:", err));

        return NextResponse.json({
            success: true,
            message: "Admin registered successfully!",
            userId: admin.userId,
            smsSent: true,
            note: "Your credentials have been sent to your phone number.",
        });
    } catch (error: any) {
        console.error("Registration error:", error);
        if (error.code === "P2002") {
            return NextResponse.json(
                { error: "An account with these details already exists." },
                { status: 409 }
            );
        }
        return NextResponse.json(
            { error: "Registration failed. Please try again." },
            { status: 500 }
        );
    }
}
