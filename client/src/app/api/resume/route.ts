import { NextResponse } from "next/server";

export async function GET() {
    return NextResponse.json({
        url: "#",
        updatedAt: new Date().toISOString(),
        visible: false
    });
}
