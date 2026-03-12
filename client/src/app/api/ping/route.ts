import { NextResponse } from "next/server";
export const runtime = "nodejs";
export async function GET() {
    return NextResponse.json({ status: "ok", message: "Deployment check: v1.0.1", timestamp: new Date().toISOString() });
}
