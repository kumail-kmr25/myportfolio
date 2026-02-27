import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    if (pathname.startsWith("/admin")) {
        // Public admin pages that do NOT require auth
        const publicAdminPaths = ["/admin/login", "/admin/register", "/admin/reset-password", "/admin/forgot-password"];
        if (publicAdminPaths.includes(pathname)) {
            return NextResponse.next();
        }

        const token = await getToken({
            req: request,
            secret: process.env.NEXTAUTH_SECRET,
        });

        if (!token) {
            return NextResponse.redirect(new URL("/admin/login", request.url));
        }

        return NextResponse.next();
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/admin/:path*"],
};
