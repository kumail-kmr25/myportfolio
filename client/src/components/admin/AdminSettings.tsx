"use client";

import { useState, useEffect } from "react";
import { Save, Loader2, Globe, Linkedin, Github, Twitter, Mail, Phone, MessageCircle, Link as LinkIcon, AlertCircle, CheckCircle2 } from "lucide-react";
import { m, AnimatePresence } from "framer-motion";
import { getApiUrl } from "@/lib/api";

interface SettingsData {
    heroHeadline: string | null;
    heroSubheadline: string | null;
    aboutText: string | null;
    calendlyUrl: string | null;
    emailAddress: string | null;
    phoneNumber: string | null;
    linkedinUrl: string | null;
    twitterUrl: string | null;
    githubUrl: string | null;
    googleAnalyticsId: string | null;
    resendApiKey: string | null;
}

export default function AdminSettings() {
    const [settings, setSettings] = useState<SettingsData>({
        heroHeadline: "",
        heroSubheadline: "",
        aboutText: "",
        calendlyUrl: "",
        emailAddress: "",
        phoneNumber: "",
        linkedinUrl: "",
        twitterUrl: "",
        githubUrl: "",
        googleAnalyticsId: "",
        resendApiKey: ""
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        try {
            const res = await fetch(getApiUrl("/api/admin/settings"));
            const data = await res.json();
            if (data.success) {
                setSettings(data.data);
            }
        } catch (err) {
            console.error("Failed to fetch settings:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        setMessage(null);

        try {
            const res = await fetch(getApiUrl("/api/admin/settings"), {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(settings)
            });
            const data = await res.json();
            if (data.success) {
                setMessage({ type: 'success', text: "Global configuration updated successfully." });
            } else {
                setMessage({ type: 'error', text: data.error || "Failed to update settings." });
            }
        } catch (err) {
            setMessage({ type: 'error', text: "Network error. Please try again." });
        } finally {
            setSaving(false);
            setTimeout(() => setMessage(null), 5000);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <Loader2 className="w-8 h-8 animate-spin text-blue-500/30" />
            </div>
        );
    }

    const sections = [
        {
            title: "Project Identity & Socials",
            description: "Manage your professional social reach and identity nodes.",
            fields: [
                { key: "emailAddress", label: "Primary Email", icon: Mail, type: "email", placeholder: "engineering@example.com" },
                { key: "phoneNumber", label: "WhatsApp Number", icon: MessageCircle, type: "text", placeholder: "+971XXXXXXXXX" },
                { key: "linkedinUrl", label: "LinkedIn URL", icon: Linkedin, type: "url", placeholder: "https://linkedin.com/in/..." },
                { key: "githubUrl", label: "GitHub Profile", icon: Github, type: "url", placeholder: "https://github.com/..." },
                { key: "twitterUrl", label: "X / Twitter URL", icon: Twitter, type: "url", placeholder: "https://x.com/..." },
            ]
        },
        {
            title: "External Integration Hub",
            description: "Synchronize external services and scheduling systems.",
            fields: [
                { key: "calendlyUrl", label: "Calendly Link", icon: LinkIcon, type: "url", placeholder: "https://calendly.com/..." },
                { key: "googleAnalyticsId", label: "Measurement ID", icon: Globe, type: "text", placeholder: "G-XXXXXXXXXX" },
                { key: "resendApiKey", label: "Resend API Key", icon: CheckCircle2, type: "password", placeholder: "re_xxxxxxxxxxx" },
            ]
        }
    ];

    return (
        <div className="space-y-12 max-w-4xl">
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-3xl font-black text-white italic tracking-tighter uppercase">Kernel_Config</h2>
                        <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest mt-1">Configure global synchronization parameters</p>
                    </div>
                </div>

                <AnimatePresence>
                    {message && (
                        <m.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className={`p-4 rounded-2xl flex items-center gap-3 border ${
                                message.type === 'success' ? 'bg-emerald-500/5 border-emerald-500/20 text-emerald-400' : 'bg-red-500/5 border-red-500/20 text-red-400'
                            }`}
                        >
                            {message.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
                            <span className="text-[10px] font-black uppercase tracking-widest">{message.text}</span>
                        </m.div>
                    )}
                </AnimatePresence>
            </div>

            <form onSubmit={handleSave} className="space-y-12">
                {sections.map((section, idx) => (
                    <div key={idx} className="space-y-8">
                        <div className="border-b border-white/5 pb-6">
                            <h3 className="text-sm font-black text-white uppercase tracking-widest italic">{section.title}</h3>
                            <p className="text-[10px] text-gray-700 font-bold uppercase tracking-widest mt-1">{section.description}</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {section.fields.map((field) => (
                                <div key={field.key} className="group space-y-2">
                                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest pl-1 group-focus-within:text-blue-500 transition-colors flex items-center gap-2">
                                        <field.icon size={12} />
                                        {field.label}
                                    </label>
                                    <input
                                        type={field.type}
                                        value={(settings as any)[field.key] || ""}
                                        onChange={(e) => setSettings({ ...settings, [field.key]: e.target.value })}
                                        placeholder={field.placeholder}
                                        className="w-full bg-white/[0.02] border border-white/5 rounded-2xl px-6 py-4 text-xs text-white placeholder:text-gray-800 focus:outline-none focus:border-blue-500/50 focus:bg-white/[0.01] transition-all font-medium"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                ))}

                <div className="pt-12 border-t border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse shadow-[0_0_10px_#3b82f6]" />
                        <span className="text-[9px] font-black text-gray-700 uppercase tracking-widest italic">Node_Sync_Protocol: Ready</span>
                    </div>
                    <button
                        type="submit"
                        disabled={saving}
                        className="flex items-center gap-4 px-12 py-5 bg-blue-600 rounded-3xl text-[11px] font-black text-white uppercase tracking-[0.2em] shadow-2xl shadow-blue-600/20 hover:bg-blue-500 transition-all active:scale-95 disabled:opacity-50 group relative overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                        {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save size={16} />}
                        COMMIT_GLOBAL_SYNC
                    </button>
                </div>
            </form>
        </div>
    );
}
