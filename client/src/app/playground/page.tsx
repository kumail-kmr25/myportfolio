import { Metadata } from "next";
import PlaygroundContent from "@/components/specialized/PlaygroundContent";

export const metadata: Metadata = {
    title: "Interactive Playground | Kumail KMR",
    description: "Hands-on engineering challenges, live code environments, and architectural deep-dives. Break, fix, and build with real-world tech stacks.",
};

export default function PlaygroundPage() {
    return <PlaygroundContent />;
}
