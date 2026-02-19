import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { decrypt } from "@/lib/auth";

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Only protect /admin routes
    if (pathname.startsWith("/admin")) {
        // Exclude specific paths like registration or reset password if they need to be public
        // (Though usually they are also protected or handled differently)
        if (pathname === "/admin/login") {
            return NextResponse.next();
        }

        const session = request.cookies.get("admin_session")?.value;

        if (!session) {
            return NextResponse.redirect(new URL("/admin", request.url));
        }

        try {
            const payload = await decrypt(session);
            if (!payload || !payload.userId) {
                return NextResponse.redirect(new URL("/admin", request.url));
            }
            return NextResponse.next();
        } catch (error) {
            return NextResponse.redirect(new URL("/admin", request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/admin/:path*"],
};
