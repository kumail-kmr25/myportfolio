import { Metadata } from "next";
import ResumeContent from "@/components/specialized/ResumeContent";

export const metadata: Metadata = {
    title: "Resume & Engineering Credentials | Kumale Ali Bhat",
    description: "Professional background, technical skill matrix, and engineering impact logs of Kumale Ali Bhat. Elite Full-Stack Engineer & Strategic Technical Consultant.",
};

export default function ResumePage() {
    return <ResumeContent />;
}
