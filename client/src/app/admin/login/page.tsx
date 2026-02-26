"use client";

import { useState } from "react";
import { Loader2, ShieldCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import { getApiUrl } from "@/lib/api";

function LoginPageContent() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [authError, setAuthError] = useState("");
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setAuthError("");

        try {
            const res = await fetch(getApiUrl("/api/admin/login"), {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (res.ok) {
                router.push("/admin");
                router.refresh();
            } else {
                setAuthError(data.error || "Login failed");
            }
        } catch {
            setAuthError("Something went wrong.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#050505] p-6 text-white font-[family-name:var(--font-outfit)]">
            <div className="w-full max-w-sm glass-effect rounded-[3rem] p-12 border border-white/10 shadow-2xl relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />
                <div className="text-center mb-10 relative">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-white/5 border border-white/10 mb-8 group-hover:scale-110 transition-transform duration-700">
                        <ShieldCheck className="w-10 h-10 text-white" />
                    </div>
                    <h1 className="text-3xl font-black tracking-tight uppercase">Admin Login</h1>
                    <p className="text-gray-500 mt-2 text-[10px] font-bold tracking-widest uppercase">Secure Portal Access</p>
                </div>
                <form onSubmit={handleLogin} className="space-y-6 relative">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-4">Identifier</label>
                        <input type="email" autoComplete="email" className="input-field min-h-[48px]" placeholder="Admin Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-4">Access Secret</label>
                        <input type="password" title="password" autoComplete="current-password" className="input-field min-h-[48px]" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    {authError && <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-[10px] font-bold text-red-500 uppercase tracking-widest text-center">{authError}</div>}
                    <button type="submit" disabled={isLoading} className="btn-primary w-full py-5 text-xs font-black uppercase tracking-[0.2em] shadow-xl shadow-blue-500/10 disabled:opacity-50 min-h-[48px] flex justify-center items-center mt-6">
                        {isLoading ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : "Authenticate"}
                    </button>
                </form>
            </div>
        </div>
    );
}

import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function LoginPage() {
    const session = await getSession();
    if (session) {
        redirect("/admin");
    }
    return <LoginPageContent />;
}
