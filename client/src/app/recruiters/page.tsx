import { Metadata } from "next";
import RecruitersContent from "@/components/specialized/RecruitersContent";

export const metadata: Metadata = {
    title: "Technical Expertise | Recruiter Briefing",
    description: "ATS-optimized technical briefing for recruiters and engineering managers. Highlighting performance, scalability, and architecture expertise.",
};

export default function RecruitersPage() {
    return <RecruitersContent />;
}
