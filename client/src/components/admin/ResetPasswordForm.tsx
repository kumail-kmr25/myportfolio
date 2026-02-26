"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Loader2, KeyRound, CheckCircle2, AlertCircle } from "lucide-react";
import Link from "next/link";

function ResetPasswordFormContent() {
    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const handleReset = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        if (!token) { setError("Missing or invalid reset token."); return; }
        if (newPassword !== confirmPassword) { setError("Passwords do not match."); return; }
        if (newPassword.length < 8) { setError("Password must be at least 8 characters."); return; }
        setIsLoading(true);
        try {
            const res = await fetch("/api/admin/reset-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token, newPassword }),
            });
            const data = await res.json();
            if (!res.ok) { setError(data.error || "Reset failed. The link may be expired."); return; }
            setSuccess(true);
        } catch { setError("Something went wrong. Please try again."); }
        finally { setIsLoading(false); }
    };

    if (success) {
        return (
            <div className="w-full max-w-md glass-effect rounded-[2.5rem] p-12 border border-white/10 shadow-2xl text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-green-500/10 border border-green-500/20 mb-6">
                    <CheckCircle2 className="w-8 h-8 text-green-500" />
                </div>
                <h1 className="text-3xl font-bold text-white mb-2">Password Reset!</h1>
                <p className="text-gray-400 mb-8">Your password has been updated successfully.</p>
                <Link href="/admin" className="btn-primary inline-flex items-center justify-center px-8">Go to Login →</Link>
            </div>
        );
    }

    if (!token) {
        return (
            <div className="w-full max-w-md glass-effect rounded-[2.5rem] p-12 border border-white/10 shadow-2xl text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/20 mb-6">
                    <AlertCircle className="w-8 h-8 text-red-500" />
                </div>
                <h1 className="text-3xl font-bold text-white mb-2">Invalid Link</h1>
                <p className="text-gray-400 mb-8">The password reset link is missing or invalid.</p>
                <Link href="/admin/forgot-password" className="text-white hover:text-blue-400 underline transition-colors opacity-40">Request a new link</Link>
            </div>
        );
    }

    return (
        <div className="w-full max-w-md glass-effect rounded-[2.5rem] p-12 border border-white/10 shadow-2xl">
            <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/5 border border-white/10 mb-6">
                    <KeyRound className="w-8 h-8 text-white" />
                </div>
                <h1 className="text-3xl font-bold text-white">New Password</h1>
                <p className="text-gray-400 mt-2">Set a secure password for your account.</p>
            </div>
            <form onSubmit={handleReset} className="space-y-5">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">New Password</label>
                    <input type="password" className="input-field" placeholder="Min 8 characters" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required minLength={8} />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Confirm Password</label>
                    <input type="password" className="input-field" placeholder="Confirm your new password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required minLength={8} />
                </div>
                {error && <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-sm text-center">{error}</div>}
                <button type="submit" disabled={isLoading} className="btn-primary w-full disabled:opacity-50">{isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Reset Password"}</button>
            </form>
        </div>
    );
}

export default function ResetPasswordForm() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-[#050505] p-6">
            <Suspense fallback={<div className="flex items-center justify-center"><Loader2 className="w-10 h-10 animate-spin text-white/20" /></div>}>
                <ResetPasswordFormContent />
            </Suspense>
        </div>
    );
}
