import { Metadata } from "next";
import WebsiteAuditContent from "@/components/specialized/WebsiteAuditContent";

export const metadata: Metadata = {
    title: "Technical Audit | High-Performance Performance Scan",
    description: "Identify performance bottlenecks, SEO gaps, and UX friction with our deep-core technical audit engine.",
};

export default function AuditPage() {
    return <WebsiteAuditContent />;
}

export const dynamic = "force-dynamic";
export const runtime = "nodejs";
