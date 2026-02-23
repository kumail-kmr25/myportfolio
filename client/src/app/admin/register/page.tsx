"use client";

import { useState, useEffect, useCallback } from "react";
import { Loader2, ShieldCheck, CheckCircle2, Phone, AlertTriangle } from "lucide-react";
import Link from "next/link";

export default function RegisterPage() {
    const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    // Real-time matching state
    const [matchStatus, setMatchStatus] = useState({
        nameMatch: false,
        emailMatch: false,
        phoneMatch: false,
    });
    const [debounceTimer, setDebounceTimer] = useState<NodeJS.Timeout | null>(null);

    // Real-time credential verification for yellow spotlight
    const checkMatch = useCallback(
        (name: string, email: string, phone: string) => {
            if (debounceTimer) clearTimeout(debounceTimer);

            const timer = setTimeout(async () => {
                if (!name && !email && !phone) {
                    setMatchStatus({ nameMatch: false, emailMatch: false, phoneMatch: false });
                    return;
                }

                try {
                    const params = new URLSearchParams({
                        name: name || "",
                        email: email || "",
                        phone: phone || "",
                    });
                    const res = await fetch(`/api/admin/register?${params}`);
                    if (res.ok) {
                        const data = await res.json();
                        setMatchStatus({
                            nameMatch: data.nameMatch,
                            emailMatch: data.emailMatch,
                            phoneMatch: data.phoneMatch,
                        });
                    }
                } catch {
                    // Silent fail for spotlight check
                }
            }, 300);

            setDebounceTimer(timer);
        },
        [] // eslint-disable-line react-hooks/exhaustive-deps
    );

    // Trigger verification on field change
    useEffect(() => {
        checkMatch(formData.name, formData.email, formData.phone);
    }, [formData.name, formData.email, formData.phone, checkMatch]);

    const handleFieldChange = (field: string, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const getFieldClasses = (fieldName: "name" | "email" | "phone", value: string) => {
        if (!value.trim()) return "input-field";

        const matchKey = `${fieldName}Match` as keyof typeof matchStatus;
        const isMatch = matchStatus[matchKey];

        if (isMatch) {
            return "input-field border-yellow-400/80 shadow-[0_0_20px_rgba(234,179,8,0.25)] bg-yellow-500/5";
        }
        return "input-field border-red-500/30 bg-red-500/5";
    };

    const getMatchLabel = (fieldName: "name" | "email" | "phone", value: string) => {
        if (!value.trim()) return null;

        const matchKey = `${fieldName}Match` as keyof typeof matchStatus;
        const isMatch = matchStatus[matchKey];

        if (isMatch) {
            return (
                <span className="flex items-center gap-1 text-[11px] font-semibold text-yellow-400 mt-1 animate-pulse">
                    <CheckCircle2 className="w-3 h-3" /> Matching
                </span>
            );
        }
        return (
            <span className="flex items-center gap-1 text-[11px] font-semibold text-red-400 mt-1">
                <AlertTriangle className="w-3 h-3" /> Not matching
            </span>
        );
    };

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

            setSuccess(true);
        } catch {
            setError("Something went wrong. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    // ===== SUCCESS SCREEN =====
    if (success) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#050505] p-6">
                <div className="w-full max-w-md glass-effect rounded-[2.5rem] p-12 border border-white/10 shadow-2xl text-center">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-green-500/10 border border-green-500/20 mb-6">
                        <CheckCircle2 className="w-10 h-10 text-green-500" />
                    </div>
                    <h1 className="text-3xl font-bold text-white mb-3">Registration Complete!</h1>
                    <div className="bg-white/5 rounded-2xl p-5 border border-white/10 mb-8">
                        <div className="flex items-center justify-center gap-2 text-green-400 text-sm mb-2">
                            <Phone className="w-5 h-5" />
                            <span className="font-semibold">Credentials sent to your phone</span>
                        </div>
                        <p className="text-gray-500 text-xs">Check your SMS for your User ID and Password.</p>
                    </div>
                    <Link href="/admin" className="btn-primary w-full inline-flex items-center justify-center">
                        Go to Login →
                    </Link>
                </div>
            </div>
        );
    }

    // ===== REGISTRATION FORM =====
    return (
        <div className="min-h-screen flex items-center justify-center bg-[#050505] p-6">
            <div className="w-full max-w-md glass-effect rounded-[2.5rem] p-12 border border-white/10 shadow-2xl">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/5 border border-white/10 mb-6">
                        <ShieldCheck className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold text-white">Admin Registration</h1>
                    <p className="text-gray-400 mt-2">Verify your identity. Password will be sent to your phone.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Name */}
                    <div className="space-y-1">
                        <label className="text-sm font-medium text-gray-300">Full Name</label>
                        <input
                            type="text"
                            className={`${getFieldClasses("name", formData.name)} transition-all duration-300`}
                            placeholder="Your full name"
                            value={formData.name}
                            onChange={(e) => handleFieldChange("name", e.target.value)}
                            required
                        />
                        {getMatchLabel("name", formData.name)}
                    </div>

                    {/* Email */}
                    <div className="space-y-1">
                        <label className="text-sm font-medium text-gray-300">Email</label>
                        <input
                            type="email"
                            className={`${getFieldClasses("email", formData.email)} transition-all duration-300`}
                            placeholder="your@email.com"
                            value={formData.email}
                            onChange={(e) => handleFieldChange("email", e.target.value)}
                            required
                        />
                        {getMatchLabel("email", formData.email)}
                    </div>

                    {/* Phone */}
                    <div className="space-y-1">
                        <label className="text-sm font-medium text-gray-300">Phone Number</label>
                        <input
                            type="tel"
                            className={`${getFieldClasses("phone", formData.phone)} transition-all duration-300`}
                            placeholder="10-digit phone number"
                            value={formData.phone}
                            onChange={(e) => handleFieldChange("phone", e.target.value)}
                            required
                            pattern="[0-9]{10}"
                            maxLength={10}
                        />
                        {getMatchLabel("phone", formData.phone)}
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
