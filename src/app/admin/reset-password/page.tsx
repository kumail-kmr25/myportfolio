"use client";

import { useState } from "react";
import { Loader2, KeyRound, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function ResetPasswordPage() {
    const [step, setStep] = useState<"verify" | "reset">("verify");
    const [identifier, setIdentifier] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const handleReset = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (step === "verify") {
            if (!identifier.trim()) {
                setError("Please enter your phone number or email.");
                return;
            }
            setStep("reset");
            return;
        }

        if (newPassword !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        if (newPassword.length < 6) {
            setError("Password must be at least 6 characters.");
            return;
        }

        setIsLoading(true);

        try {
            const res = await fetch("/api/admin/reset-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ identifier, newPassword }),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.error);
                if (res.status === 403) {
                    setStep("verify");
                }
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
                    <h1 className="text-3xl font-bold text-white mb-2">Password Reset!</h1>
                    <p className="text-gray-400 mb-8">Your password has been updated successfully.</p>
                    <Link href="/admin" className="btn-primary inline-flex items-center justify-center px-8">
                        Go to Login →
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
                        <KeyRound className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold text-white">Reset Password</h1>
                    <p className="text-gray-400 mt-2">
                        {step === "verify"
                            ? "Verify your identity to proceed."
                            : "Enter your new password."}
                    </p>
                </div>

                <form onSubmit={handleReset} className="space-y-5">
                    {step === "verify" ? (
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-300">Phone Number or Email</label>
                            <input
                                type="text"
                                className="input-field"
                                placeholder="Enter registered phone or email"
                                value={identifier}
                                onChange={(e) => setIdentifier(e.target.value)}
                                required
                            />
                            <p className="text-xs text-gray-600">
                                Enter the phone number or email linked to your admin account.
                            </p>
                        </div>
                    ) : (
                        <>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-300">New Password</label>
                                <input
                                    type="password"
                                    className="input-field"
                                    placeholder="Min 6 characters"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    required
                                    minLength={6}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-300">Confirm Password</label>
                                <input
                                    type="password"
                                    className="input-field"
                                    placeholder="Confirm your new password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                    minLength={6}
                                />
                            </div>
                        </>
                    )}

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
                        ) : step === "verify" ? (
                            "Verify & Continue"
                        ) : (
                            "Reset Password"
                        )}
                    </button>
                </form>

                <p className="text-center text-gray-500 text-sm mt-6">
                    <Link href="/admin" className="text-white hover:text-blue-400 transition-colors">
                        Back to Login
                    </Link>
                </p>
            </div>
        </div>
    );
}
