import { NextResponse } from "next/server";

export async function POST() {
    const response = NextResponse.json({ success: true });

    // Clear legacy custom admin session cookie
    response.cookies.set("admin_session", "", {
        expires: new Date(0),
        path: "/",
    });

    // Clear NextAuth JWT session cookies with robust attributes
    const cookieOptions = {
        expires: new Date(0),
        path: "/",
        secure: process.env.NODE_ENV === "production",
        httpOnly: true,
        sameSite: "lax" as const,
    };

    response.cookies.set("next-auth.session-token", "", cookieOptions);
    response.cookies.set("__Secure-next-auth.session-token", "", { ...cookieOptions, secure: true });
    response.cookies.set("next-auth.callback-url", "", cookieOptions);
    response.cookies.set("next-auth.csrf-token", "", cookieOptions);

    return response;
}
