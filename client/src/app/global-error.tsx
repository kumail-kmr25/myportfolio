"use client";

import { useEffect } from "react";

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error("Global Error:", error);
    }, [error]);

    return (
        <html lang="en">
            <body className="min-h-screen bg-[#050505] text-white flex items-center justify-center p-6" style={{ fontFamily: "system-ui, sans-serif" }}>
                <div className="text-center space-y-6 max-w-md">
                    <div className="space-y-2">
                        <p style={{ fontSize: "10px", color: "#f87171", fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.3em" }}>
                            Critical Exception
                        </p>
                        <h2 style={{ fontSize: "2rem", fontWeight: 900, color: "white" }}>
                            Something went wrong
                        </h2>
                        <p style={{ color: "#6b7280", fontSize: "0.875rem" }}>
                            An unexpected error occurred. Our team has been notified.
                        </p>
                    </div>
                    <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
                        <button
                            onClick={() => reset()}
                            style={{ padding: "0.75rem 2rem", background: "#3b82f6", color: "white", borderRadius: "1rem", fontWeight: 900, fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.1em", cursor: "pointer", border: "none" }}
                        >
                            Try Again
                        </button>
                        <button
                            onClick={() => (window.location.href = "/")}
                            style={{ padding: "0.75rem 2rem", background: "rgba(255,255,255,0.05)", color: "white", borderRadius: "1rem", fontWeight: 900, fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.1em", cursor: "pointer", border: "1px solid rgba(255,255,255,0.1)" }}
                        >
                            Go Home
                        </button>
                    </div>
                </div>
            </body>
        </html>
    );
}
