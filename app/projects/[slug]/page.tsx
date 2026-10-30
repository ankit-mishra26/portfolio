import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projects } from "@/data/projects";
import { siteConfig } from "@/config/site";
import { CaseStudyView } from "@/components/sections/CaseStudyView";
import { JsonLd } from "@/components/ui/JsonLd";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.summary,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      type: "article",
      title: project.title,
      description: project.summary,
      url: `/projects/${project.slug}`,
    },
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const index = projects.findIndex((item) => item.slug === slug);
  const project = projects[index];
  if (!project) notFound();

  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
      { "@type": "ListItem", position: 2, name: "Projects", item: `${siteConfig.url}/projects` },
      { "@type": "ListItem", position: 3, name: project.title, item: `${siteConfig.url}/projects/${project.slug}` },
    ],
  };

  return (
    <>
      <JsonLd data={breadcrumbs} />
      <CaseStudyView project={project} previous={projects[index - 1]} next={projects[index + 1]} />
    </>
  );
}
