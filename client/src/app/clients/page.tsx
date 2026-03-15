import { Metadata } from "next";
import ClientsContent from "@/components/specialized/ClientsContent";

export const metadata: Metadata = {
    title: "Business Growth & ROI | High-Fidelity Systems",
    description: "Scale your revenue with high-performance digital systems and conversion-focused architectures designed for strategic business growth.",
};

export default function ClientsPage() {
    return <ClientsContent />;
}
