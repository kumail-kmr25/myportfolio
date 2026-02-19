"use client";

import { useState, useEffect } from "react";
import { Loader2, Trash2, LogOut, ShieldCheck } from "lucide-react";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

interface Testimonial {
    id: string;
    name: string;
    intervention_type: string;
    message: string;
    rating: number;
    about_delivery_lead: string;
    created_at: string;
}

export default function AdminPage() {
    const [password, setPassword] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const { data: testimonials, mutate } = useSWR<Testimonial[]>(
        isLoggedIn ? "/api/testimonials" : null,
        fetcher
    );

    useEffect(() => {
        // Check if session exists (could be done more robustly)
        const checkSession = async () => {
            // In a real app, you'd call an endpoint to verify the session
        };
        checkSession();
    }, []);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            const res = await fetch("/api/admin/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ password }),
            });

            if (res.ok) {
                setIsLoggedIn(true);
            } else {
                const data = await res.json();
                setError(data.error || "Login failed");
            }
        } catch (err) {
            setError("An unexpected error occurred");
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this testimonial?")) return;

        try {
            const res = await fetch(`/api/testimonials/${id}`, {
                method: "DELETE",
            });

            if (res.ok) {
                mutate();
            } else {
                alert("Failed to delete testimonial");
            }
        } catch (err) {
            alert("An error occurred while deleting");
        }
    };

    const handleLogout = async () => {
        try {
            await fetch("/api/admin/logout", { method: "POST" });
            setIsLoggedIn(false);
            setPassword("");
        } catch (err) {
            console.error("Logout failed", err);
            window.location.reload();
        }
    };

    if (!isLoggedIn) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#050505] p-6">
                <div className="w-full max-w-md glass-effect rounded-[2.5rem] p-12 border border-white/10 shadow-2xl">
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/5 border border-white/10 mb-6">
                            <ShieldCheck className="w-8 h-8 text-white" />
                        </div>
                        <h1 className="text-3xl font-bold text-white">Admin Access</h1>
                        <p className="text-gray-400 mt-2">Enter your password to manage testimonials.</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="space-y-2">
                            <input
                                type="password"
                                className="input-field"
                                placeholder="Enter Admin Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        {error && (
                            <p className="text-sm text-red-500 text-center">{error}</p>
                        )}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="btn-primary w-full disabled:opacity-50"
                        >
                            {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Sign In"}
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#050505] p-6 md:p-12 lg:p-24">
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                    <div>
                        <h1 className="text-4xl font-bold text-white">Testimonial Moderation</h1>
                        <p className="text-gray-400 mt-2">Manage and review client feedback.</p>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="btn-secondary gap-2 border-red-500/20 text-red-500 hover:bg-red-500/10"
                    >
                        <LogOut className="w-4 h-4" />
                        Log Out
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {testimonials?.map((testimonial) => (
                        <div
                            key={testimonial.id}
                            className="card relative group border-white/5 bg-white/5"
                        >
                            <button
                                onClick={() => handleDelete(testimonial.id)}
                                className="absolute top-4 right-4 p-2 bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all opacity-0 group-hover:opacity-100"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>

                            <div className="mb-4">
                                <h4 className="font-bold text-white">{testimonial.name}</h4>
                                <p className="text-xs text-gray-500 uppercase tracking-tight">{testimonial.intervention_type}</p>
                            </div>
                            <p className="text-gray-400 text-sm italic mb-6">
                                &quot;{testimonial.message}&quot;
                            </p>
                            <div className="mt-auto pt-4 border-t border-white/5">
                                <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Delivery Lead Feedback</p>
                                <p className="text-xs text-gray-300 mt-1">{testimonial.about_delivery_lead}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {testimonials?.length === 0 && (
                    <div className="text-center py-24 glass-effect rounded-[3rem] border border-dashed border-white/10">
                        <p className="text-gray-500">No testimonials to display.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
