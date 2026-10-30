import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { projects } from "@/data/projects";
import { Section } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Badge";
import { ArchitectureStrip } from "@/components/diagrams/ArchitectureStrip";

const NUMBER_WORDS = ["No", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine"];

function countWord(count: number): string {
  return NUMBER_WORDS[count] ?? String(count);
}

/** Builds the section blurb from the project list so it never goes stale. */
function describeProjects(): string {
  const work = projects.filter((project) => project.kind === "work").length;
  const academic = projects.length - work;
  const parts: string[] = [];
  if (work > 0) parts.push(`${countWord(work)} from my professional work, shown as sanitized overviews`);
  if (academic > 0)
    parts.push(`${countWord(academic)} ${academic === 1 ? "is a college project" : "are college projects"}`);
  return `${parts.join(". ")}.`;
}

export function ProjectList() {
  return (
    <ul>
      {projects.map((project) => (
        <li
          key={project.slug}
          className="group relative -mx-4 grid gap-4 border-t border-line px-4 py-8 transition-colors last:border-b hover:bg-surface/60 lg:grid-cols-12 lg:gap-10"
        >
          <span
            aria-hidden="true"
            className="absolute inset-x-4 top-0 h-px overflow-hidden opacity-0 transition-opacity group-hover:opacity-100"
          >
            <span className="flow-dot-x" />
          </span>

          <div className="lg:col-span-4">
            <h3 className="text-lg font-medium tracking-tight">{project.title}</h3>
            <p className="mt-1 text-sm text-muted">{project.category}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <Badge tone={project.kind}>
                {project.kind === "work" ? "Work · sanitized" : "Academic"}
              </Badge>
              {project.status === "in-progress" ? <Badge>In progress</Badge> : null}
            </div>
          </div>

          <div className="lg:col-span-8">
            <p>{project.summary}</p>
            <p className="mt-3 text-sm text-muted">
              <span className="font-medium text-fg">My part: </span>
              {project.role}
            </p>

            <div className="mt-5">
              <ArchitectureStrip
                steps={project.stages.map((stage) => stage.label)}
                label={`${project.title} architecture`}
              />
              {project.kind === "work" ? (
                <p className="mt-2 font-mono text-xs text-muted">Conceptual, sanitized architecture</p>
              ) : null}
            </div>

            <ul className="mt-5 flex flex-wrap gap-2" aria-label="Technologies">
              {project.stack.map((tech) => (
                <li key={tech}>
                  <Badge>{tech}</Badge>
                </li>
              ))}
            </ul>

            <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
              <Link
                href={`/projects/${project.slug}`}
                className="inline-flex items-center gap-1 font-medium text-fg transition-colors hover:text-flow"
              >
                Read the case study
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
                <span className="sr-only"> for {project.title}</span>
              </Link>
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-muted transition-colors hover:text-fg"
              >
                GitHub
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                <span className="sr-only"> ({project.title})</span>
              </a>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}

export function ProjectGrid() {
  return (
    <Section id="work" title="Selected systems" description={describeProjects()}>
      <ProjectList />
    </Section>
  );
}
