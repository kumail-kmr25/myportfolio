import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@portfolio/database";

export async function GET() {
    try {
        const session = await getServerSession(authOptions);
        if (!session) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });

        const contributions = await prisma.openSourceContribution.findMany({
            orderBy: { stars: 'desc' }
        });
        return NextResponse.json({ success: true, data: contributions });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });

        const data = await req.json();
        const contribution = await prisma.openSourceContribution.create({
            data: {
                ...data,
                technologies: Array.isArray(data.technologies) ? data.technologies : []
            }
        });
        return NextResponse.json({ success: true, data: contribution });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
