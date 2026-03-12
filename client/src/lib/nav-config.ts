"use client";

/**
 * Utility to determine if admin-related navigation links should be hidden.
 * This can be controlled via the NEXT_PUBLIC_HIDE_ADMIN environment variable.
 */
export function shouldHideAdmin(): boolean {
    // Check environment variable
    if (process.env.NEXT_PUBLIC_HIDE_ADMIN === 'true') {
        return true;
    }

    // Optional: Check query parameter for manual override during demos
    if (typeof window !== "undefined") {
        const params = new URLSearchParams(window.location.search);
        if (params.get('admin') === 'hide') {
            return true;
        }
    }

    return false;
}
