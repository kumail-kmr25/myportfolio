import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@portfolio/database";

// GET /api/admin/audit-requests
export async function GET(req: NextRequest) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    try {
        const { searchParams } = new URL(req.url);
        const contacted = searchParams.get("contacted");
        
        const where: any = {};
        if (contacted === "true") where.contacted = true;
        if (contacted === "false") where.contacted = false;

        const requests = await prisma.auditRequest.findMany({
            where,
            orderBy: { createdAt: "desc" },
        });

        // Basic analytics
        const total = await prisma.auditRequest.count();
        const pending = await prisma.auditRequest.count({ where: { contacted: false } });
        const avgScore = await prisma.auditRequest.aggregate({
            _avg: { performance: true }
        });

        return NextResponse.json({
            success: true,
            data: requests,
            analytics: {
                total,
                pending,
                avgScore: Math.round(avgScore._avg.performance || 0)
            }
        });
    } catch (error: any) {
        console.error("ADMIN_AUDIT_GET_ERROR:", error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

// PATCH /api/admin/audit-requests
export async function PATCH(req: NextRequest) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    try {
        const body = await req.json();
        const { id, contacted, notes } = body;

        if (!id) {
            return NextResponse.json({ success: false, error: "ID is required" }, { status: 400 });
        }

        const updated = await prisma.auditRequest.update({
            where: { id },
            data: { contacted, notes },
        });

        return NextResponse.json({ success: true, data: updated });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

// DELETE /api/admin/audit-requests
export async function DELETE(req: NextRequest) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");

        if (!id) {
            return NextResponse.json({ success: false, error: "ID is required" }, { status: 400 });
        }

        await prisma.auditRequest.delete({
            where: { id },
        });

        return NextResponse.json({ success: true, message: "Request deleted successfully" });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
