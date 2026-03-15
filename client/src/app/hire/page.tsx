import { Metadata } from "next";
import HireContent from "@/components/specialized/HireContent";

export const metadata: Metadata = {
    title: "Hire for Elite Engineering | Project Initiation",
    description: "Start your project with high-performance engineering standards. Professional portal for project briefing and strategic collaboration.",
};

export default function HirePage() {
    return <HireContent />;
}
