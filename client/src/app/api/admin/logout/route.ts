import { NextResponse } from "next/server";

export async function POST() {
    const response = NextResponse.json({ success: true });

    // Clear legacy custom admin session cookie
    response.cookies.set("admin_session", "", {
        expires: new Date(0),
        path: "/",
    });

    // Clear NextAuth JWT session cookies (belt-and-suspenders server-side cleanup)
    response.cookies.set("next-auth.session-token", "", {
        expires: new Date(0),
        path: "/",
    });
    response.cookies.set("__Secure-next-auth.session-token", "", {
        expires: new Date(0),
        path: "/",
        secure: true,
    });

    return response;
}
