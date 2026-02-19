"use client";

import { useState } from "react";
import { Loader2, ShieldCheck, CheckCircle2, Copy } from "lucide-react";
import Link from "next/link";

export default function RegisterPage() {
    const [formData, setFormData] = useState({ name: "", email: "", password: "" });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [result, setResult] = useState<{
        userId: string;
        suggestedStrongPassword: string;
    } | null>(null);
    const [copied, setCopied] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            const res = await fetch("/api/admin/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.error);
                return;
            }

            setResult({
                userId: data.userId,
                suggestedStrongPassword: data.suggestedStrongPassword,
            });
        } catch {
            setError("Something went wrong. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const copyToClipboard = (text: string, label: string) => {
        navigator.clipboard.writeText(text);
        setCopied(label);
        setTimeout(() => setCopied(""), 2000);
    };

    if (result) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#050505] p-6">
                <div className="w-full max-w-md glass-effect rounded-[2.5rem] p-12 border border-white/10 shadow-2xl">
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-green-500/10 border border-green-500/20 mb-6">
                            <CheckCircle2 className="w-8 h-8 text-green-500" />
                        </div>
                        <h1 className="text-3xl font-bold text-white">Registration Complete!</h1>
                        <p className="text-gray-400 mt-2">Save your credentials below.</p>
                    </div>

                    <div className="space-y-4">
                        <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
                            <p className="text-xs text-gray-500 uppercase tracking-widest font-bold mb-2">Your User ID</p>
                            <div className="flex items-center justify-between">
                                <p className="text-xl font-mono font-bold text-white">{result.userId}</p>
                                <button onClick={() => copyToClipboard(result.userId, "userId")} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                                    <Copy className={`w-4 h-4 ${copied === "userId" ? "text-green-400" : "text-gray-400"}`} />
                                </button>
                            </div>
                        </div>

                        <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
                            <p className="text-xs text-gray-500 uppercase tracking-widest font-bold mb-2">Suggested Strong Password</p>
                            <div className="flex items-center justify-between">
                                <p className="font-mono text-sm text-yellow-400 break-all">{result.suggestedStrongPassword}</p>
                                <button onClick={() => copyToClipboard(result.suggestedStrongPassword, "password")} className="p-2 hover:bg-white/10 rounded-lg transition-colors shrink-0">
                                    <Copy className={`w-4 h-4 ${copied === "password" ? "text-green-400" : "text-gray-400"}`} />
                                </button>
                            </div>
                            <p className="text-[10px] text-gray-600 mt-2">Optional: Update your password to this for extra security.</p>
                        </div>
                    </div>

                    <Link href="/admin" className="btn-primary w-full mt-8 inline-flex items-center justify-center">
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
                        <ShieldCheck className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold text-white">Admin Registration</h1>
                    <p className="text-gray-400 mt-2">Create your admin account.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">Name</label>
                        <input
                            type="text"
                            className="input-field"
                            placeholder="Your full name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">Email</label>
                        <input
                            type="email"
                            className="input-field"
                            placeholder="your@email.com"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">Password</label>
                        <input
                            type="password"
                            className="input-field"
                            placeholder="Min 6 characters"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            required
                            minLength={6}
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
                        {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Register"}
                    </button>
                </form>

                <p className="text-center text-gray-500 text-sm mt-6">
                    Already registered?{" "}
                    <Link href="/admin" className="text-white hover:text-blue-400 transition-colors">
                        Login here
                    </Link>
                </p>
            </div>
        </div>
    );
}
