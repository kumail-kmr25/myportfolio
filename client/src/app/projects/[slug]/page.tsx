import { Metadata } from "next";
import ProjectDetailContent from "@/components/specialized/ProjectDetailContent";
import { MOCK_PROJECTS } from "@/lib/mock-data";
import { highConversionProjects } from "@/lib/projects-data";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const allResources = [...MOCK_PROJECTS, ...highConversionProjects];
    const project = allResources.find(p => p.id === slug || p.id === `mock-${slug}`);

    if (!project) return {};

    return {
        title: `${project.title} | Case Study`,
        description: (project.summary || project.description).substring(0, 160),
        openGraph: {
            images: [project.image],
        }
    };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const allResources = [...MOCK_PROJECTS, ...highConversionProjects];
  const project = allResources.find(p => p.id === slug || p.id === `mock-${slug}`);

  if (!project) {
    notFound();
  }

  return <ProjectDetailContent slug={slug} />;
}
