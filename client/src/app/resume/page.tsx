import { Metadata } from "next";
import ResumeContent from "@/components/specialized/ResumeContent";

export const metadata: Metadata = {
    title: "Resume & Engineering Credentials | Kumail KMR",
    description: "Professional background, technical skill matrix, and engineering impact logs of Kumail KMR. Elite Full-Stack Engineer & Strategic Technical Consultant.",
};

export default function ResumePage() {
    return <ResumeContent />;
}
