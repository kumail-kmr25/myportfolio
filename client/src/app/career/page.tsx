import { Metadata } from "next";
import CareerContent from "@/components/specialized/CareerContent";

export const metadata: Metadata = {
    title: "Career & Talent Acquisition | Kumail KMR",
    description: "Explore the professional journey, core competencies, and engineering standards of Kumail KMR for high-level placement and cultural alignment.",
};

export default function CareerPage() {
    return <CareerContent />;
}
