import { Metadata } from "next";
import ChallengeContent from "@/components/specialized/ChallengeContent";
import { PLAYGROUND_CHALLENGES } from "@/lib/playground-data";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const challenge = PLAYGROUND_CHALLENGES.find((c) => c.slug === slug);

    if (!challenge) return {};

    return {
        title: `${challenge.title} | Interactive Challenge`,
        description: challenge.description.substring(0, 160),
    };
}

export default async function PlaygroundChallengePage({ params }: PageProps) {
  const { slug } = await params;
  const challenge = PLAYGROUND_CHALLENGES.find((c) => c.slug === slug);

  if (!challenge) {
    notFound();
  }

  return <ChallengeContent slug={slug} />;
}
