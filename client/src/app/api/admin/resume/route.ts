import { NextResponse } from "next/server";
import { prisma } from "@portfolio/database";
import { getSession } from "@/lib/auth";
import { writeFile } from "fs/promises";
import { join } from "path";
import { randomUUID } from "crypto";

export async function GET() {
    try {
        const session = await getSession();
        if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const resumes = await prisma.resume.findMany({
            orderBy: { createdAt: "desc" }
        });

        return NextResponse.json(resumes);
    } catch (error) {
        console.error("Admin Resume GET error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const session = await getSession();
        if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const formData = await request.formData();
        const file = formData.get("file") as File;

        if (!file) {
            return NextResponse.json({ error: "No file provided" }, { status: 400 });
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Create unique filename
        const filename = `${randomUUID()}-${file.name.replace(/\s+/g, "_")}`;
        const path = join(process.cwd(), "public", "resumes", filename);

        await writeFile(path, buffer);

        const url = `/resumes/${filename}`;

        // Create resume record
        const resume = await prisma.resume.create({
            data: {
                url,
                visible: true
            }
        });

        // Optionally, hide previous resumes
        await prisma.resume.updateMany({
            where: {
                id: { not: resume.id }
            },
            data: { visible: false }
        });

        return NextResponse.json(resume, { status: 201 });
    } catch (error) {
        console.error("Admin Resume POST error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

export async function PATCH(request: Request) {
    try {
        const session = await getSession();
        if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const { id, visible } = await request.json();

        if (!id) {
            return NextResponse.json({ error: "Resume ID is required" }, { status: 400 });
        }

        const resume = await prisma.resume.update({
            where: { id },
            data: { visible }
        });

        return NextResponse.json(resume);
    } catch (error) {
        console.error("Admin Resume PATCH error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
