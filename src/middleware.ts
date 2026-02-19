import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { decrypt } from "@/lib/auth";

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Only protect /admin sub-routes (not the login page itself)
    if (pathname.startsWith("/admin")) {
        // Public admin pages that do NOT require auth
        const publicAdminPaths = ["/admin", "/admin/login", "/admin/register", "/admin/reset-password"];
        if (publicAdminPaths.includes(pathname)) {
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
