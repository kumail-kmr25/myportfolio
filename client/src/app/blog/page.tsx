import { Metadata } from "next";
import BlogContent from "@/components/specialized/BlogContent";

export const metadata: Metadata = {
    title: "Insights & Engineering Blog | Kumale Ali Bhat",
    description: "Deep-dives into software architecture, AI agents, and modern web development. Technical articles and engineering insights.",
};

export default function BlogPage() {
    return <BlogContent />;
}
