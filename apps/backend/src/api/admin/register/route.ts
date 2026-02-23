import { Request, Response } from 'express';
import { prisma } from '@portfolio/database';
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { sendRegistrationSMS } from "../../../lib/sms";

/**
 * Generate a random userId in format: KK-XXXXX
 */
function generateUserId(): string {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let id = "KK-";
    for (let i = 0; i < 5; i++) {
        id += chars.charAt(crypto.randomInt(chars.length));
    }
    return id;
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
export const GET = async (req: Request, res: Response) => {
    try {
        const { searchParams } = new URL(req.url);
        const name = searchParams.get("name") || "";
        const email = searchParams.get("email") || "";
        const phone = searchParams.get("phone") || "";

        const result = verifyCredentials(name, email, phone);

        return res.json({
            nameMatch: result.nameMatch,
            emailMatch: result.emailMatch,
            phoneMatch: result.phoneMatch,
        });
    } catch (error) {
        console.error("Verification check error:", error);
        return res.status(500).json({ error: "Verification failed" });
    }
}

/**
 * POST — Register admin (only if credentials match)
 */
export const POST = async (req: Request, res: Response) => {
    try {
        // Check if admin already exists
        const existingAdmin = await prisma.admin.findFirst();
        if (existingAdmin) {
            return res.status(403).json({ error: "Only admins can register. Registration is closed." });
        }

        const { name, email, phone } = req.body;

        if (!name || !email || !phone) {
            return res.status(400).json({ error: "Name, email, and phone are required." });
        }

        // Verify credentials match the authorized admin
        const verification = verifyCredentials(name, email, phone);
        if (!verification.allMatch) {
            return res.status(403).json({ error: "You cannot register. Only admins can register." });
        }

        // Auto-generate strong password
        const generatedPassword = generateStrongPassword();
        const userId = generateUserId();
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
        console.log(`[Registration] Triggering SMS for ${admin.userId}...`);
        sendRegistrationSMS({
            to: phone.trim(),
            userId: admin.userId,
            password: generatedPassword,
        }).then((sent) => {
            if (sent) console.log(`[Registration] SMS process completed for ${admin.userId}`);
            else console.error(`[Registration] SMS process failed for ${admin.userId}`);
        }).catch((err) => console.error("[Registration] SMS notification error:", err));

        return res.json({
            success: true,
            message: "Admin registered successfully!",
            userId: admin.userId,
            smsSent: true,
            note: "Your credentials have been sent to your phone number.",
        });
    } catch (error: any) {
        console.error("Registration error:", error);
        if (error.code === "P2002") {
            return res.status(409).json({ error: "An account with these details already exists." });
        }
        return res.status(500).json({ error: "Registration failed. Please try again." });
    }
}
