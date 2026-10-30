import type { Metadata } from "next";
import { projects } from "@/data/projects";
import { ProjectList } from "@/components/sections/ProjectGrid";

export const metadata: Metadata = {
  title: "Projects",
  description: "Case studies covering data pipelines, ML feature engineering and college ML projects.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-12 sm:px-8 sm:py-16">
      <header className="mb-10 max-w-2xl">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Projects</h1>
        <p className="mt-3 text-muted">
          {projects.length} case studies. Work projects are sanitized overviews, and college
          projects are marked as such.
        </p>
      </header>
      <ProjectList />
    </div>
  );
}
