import { NextResponse } from "next/server";
import { prisma } from "@portfolio/database";

export async function POST(req: Request) {
    try {
        const { referrerCode, targetEmail } = await req.json();
        
        // In a real app, logic for tracking referrals would go here
        // For now, we'll log it or create a placeholder lead
        const referral = await prisma.referral.create({
            data: {
                referralCode: referrerCode,
                referrerName: "Incomplete Profile", // Required by schema
                referrerEmail: "pending@kumailkmr.com", // Required by schema
                status: "active",
            }
        });

        return NextResponse.json({ success: true, data: referral });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
