"use client";

import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";

import { useState } from "react";
import { Loader2, Mail, CheckCircle2, ArrowLeft } from "lucide-react";
import Link from "next/link";

function ForgotPasswordPageContent() {
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        try {
            const res = await fetch("/api/forgot-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.error || "Failed to send reset email.");
                return;
            }

            setSuccess(true);
        } catch {
            setError("Something went wrong. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    if (success) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#050505] p-6">
                <div className="w-full max-w-md glass-effect rounded-[2.5rem] p-12 border border-white/10 shadow-2xl text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-green-500/10 border border-green-500/20 mb-6">
                        <CheckCircle2 className="w-8 h-8 text-green-500" />
                    </div>
                    <h1 className="text-3xl font-bold text-white mb-2">Check your email</h1>
                    <p className="text-gray-400 mb-8">
                        If an account exists for {email}, we&apos;ve sent a password reset link.
                    </p>
                    <Link href="/admin" className="btn-primary inline-flex items-center justify-center px-8">
                        Back to Login
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#050505] p-6">
            <div className="w-full max-w-md glass-effect rounded-[2.5rem] p-12 border border-white/10 shadow-2xl">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/5 border border-white/10 mb-6">
                        <Mail className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold text-white">Forgot Password</h1>
                    <p className="text-gray-400 mt-2">
                        Enter your email to receive a password reset link.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">Admin Email</label>
                        <input
                            type="email"
                            className="input-field"
                            placeholder="Enter your registered email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    {error && (
                        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-sm text-center">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="btn-primary w-full disabled:opacity-50"
                    >
                        {isLoading ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                            "Send Reset Link"
                        )}
                    </button>
                </form>

                <p className="text-center text-gray-500 text-sm mt-6">
                    <Link href="/admin" className="text-white hover:text-blue-400 transition-colors inline-flex items-center gap-2">
                        <ArrowLeft size={14} />
                        Back to Login
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default async function ForgotPasswordPage() {
    const session = await getSession();

    if (session) {
        redirect("/admin");
    }

    return <ForgotPasswordPageContent />;
}


