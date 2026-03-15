import { Metadata } from "next";
import CareerContent from "@/components/specialized/CareerContent";

export const metadata: Metadata = {
    title: "Career & Talent Acquisition | Kumale Ali Bhat",
    description: "Explore the professional journey, core competencies, and engineering standards of Kumale Ali Bhat for high-level placement and cultural alignment.",
};

export default function CareerPage() {
    return <CareerContent />;
}
