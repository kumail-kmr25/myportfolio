"use client";

import { useState } from "react";
import { Loader2, Mail, CheckCircle2, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function ForgotPasswordForm() {
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");
        try {
            const res = await fetch("/api/admin/forgot-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });
            const data = await res.json();
            if (!res.ok) {
                setError(data.error || "Failed to send link.");
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
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-blue-500/10 border border-blue-500/20 mb-6">
                        <CheckCircle2 className="w-10 h-10 text-blue-500" />
                    </div>
                    <h1 className="text-3xl font-bold text-white mb-3">Check your email!</h1>
                    <p className="text-gray-400 mb-8 leading-relaxed">We&apos;ve sent a password reset link to <span className="text-white font-medium">{email}</span>.</p>
                    <Link href="/admin" className="text-white hover:text-blue-400 transition-colors inline-flex items-center gap-2 text-sm font-semibold">
                        <ArrowLeft className="w-4 h-4" /> Back to Login
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
                    <h1 className="text-3xl font-bold text-white">Reset Password</h1>
                    <p className="text-gray-400 mt-2 leading-relaxed">Enter your email and we&apos;ll send you a recovery link.</p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">Email Address</label>
                        <input type="email" className="input-field" placeholder="admin@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    {error && <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-sm text-center">{error}</div>}
                    <button type="submit" disabled={isLoading} className="btn-primary w-full disabled:opacity-50">{isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Send Reset Link"}</button>
                </form>
                <div className="mt-8 text-center">
                    <Link href="/admin" className="text-gray-500 hover:text-white transition-colors text-sm inline-flex items-center gap-2">
                        <ArrowLeft className="w-4 h-4" /> Back to Login
                    </Link>
                </div>
            </div>
        </div>
    );
}
