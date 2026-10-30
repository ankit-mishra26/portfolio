import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import type { Project } from "@/types";
import { ArchitectureDiagram } from "@/components/diagrams/ArchitectureDiagram";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

interface CaseStudyViewProps {
  project: Project;
  previous?: Project;
  next?: Project;
}

function CaseSection({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-heading`} className="scroll-mt-24">
      <h2 id={`${id}-heading`} className="text-xl font-semibold tracking-tight">
        {title}
      </h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="relative pl-5 leading-relaxed text-muted">
          <span aria-hidden="true" className="absolute left-0 top-[0.7rem] h-px w-3 bg-flow" />
          {item}
        </li>
      ))}
    </ul>
  );
}

function TitledList({ items }: { items: { title: string; body: string }[] }) {
  return (
    <ul className="space-y-6">
      {items.map((item) => (
        <li key={item.title}>
          <h3 className="font-medium">{item.title}</h3>
          <p className="mt-1 leading-relaxed text-muted">{item.body}</p>
        </li>
      ))}
    </ul>
  );
}

export function CaseStudyView({ project, previous, next }: CaseStudyViewProps) {
  const { caseStudy } = project;

  const sections = [
    { id: "overview", title: "Overview" },
    ...(caseStudy.glossary && caseStudy.glossary.length > 0
      ? [{ id: "terms", title: "Terms used" }]
      : []),
    { id: "problem", title: "Problem" },
    { id: "architecture", title: "Architecture" },
    { id: "data-flow", title: "Data flow" },
    { id: "role", title: "My role" },
    { id: "technologies", title: "Technologies" },
    ...(caseStudy.decisions.length > 0 ? [{ id: "decisions", title: "Engineering decisions" }] : []),
    ...(caseStudy.challenges.length > 0 ? [{ id: "challenges", title: "Challenges" }] : []),
    { id: "outcome", title: "Outcome" },
    ...(caseStudy.lessons.length > 0 ? [{ id: "lessons", title: "Lessons learned" }] : []),
    { id: "source", title: "Source" },
  ];

  return (
    <article className="mx-auto w-full max-w-6xl px-5 py-12 sm:px-8 sm:py-16">
      <Link
        href="/projects"
        className="inline-flex items-center gap-1 text-sm text-muted transition-colors hover:text-fg"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        All projects
      </Link>

      <header className="mt-6 max-w-3xl">
        <div className="flex flex-wrap gap-2">
          <Badge tone={project.kind}>
            {project.kind === "work" ? "Work · sanitized" : "Academic"}
          </Badge>
          {project.status === "in-progress" ? <Badge>In progress</Badge> : null}
        </div>
        <h1 className="mt-4 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
          {project.title}
        </h1>
        <p className="mt-2 text-sm text-muted">{project.category}</p>
        <p className="mt-5 text-lg text-muted">{project.summary}</p>
      </header>

      <div className="mt-12 grid gap-12 lg:grid-cols-12">
        <nav aria-label="On this page" className="hidden lg:col-span-3 lg:block">
          <ul className="sticky top-24 space-y-2 border-l border-line pl-4 text-sm">
            {sections.map((section) => (
              <li key={section.id}>
                <a href={`#${section.id}`} className="text-muted transition-colors hover:text-fg">
                  {section.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="max-w-3xl space-y-14 lg:col-span-9">
          <CaseSection id="overview" title="Overview">
            <p className="leading-relaxed text-muted">{caseStudy.overview}</p>
            {project.kind === "work" ? (
              <p className="mt-4 rounded-md border border-line bg-surface/60 p-4 text-sm text-muted">
                This is a conceptual, sanitized overview. It leaves out company, customer and
                system details.
              </p>
            ) : null}
          </CaseSection>

          {caseStudy.glossary && caseStudy.glossary.length > 0 ? (
            <CaseSection id="terms" title="Terms used">
              <dl className="space-y-4">
                {caseStudy.glossary.map((entry) => (
                  <div key={entry.term}>
                    <dt className="font-medium">{entry.term}</dt>
                    <dd className="mt-1 leading-relaxed text-muted">{entry.meaning}</dd>
                  </div>
                ))}
              </dl>
            </CaseSection>
          ) : null}

          <CaseSection id="problem" title="Problem">
            <div className="space-y-4">
              {caseStudy.problem.map((paragraph) => (
                <p key={paragraph} className="leading-relaxed text-muted">
                  {paragraph}
                </p>
              ))}
            </div>
          </CaseSection>

          <CaseSection id="architecture" title="Architecture">
            <div className="rounded-xl border border-line bg-surface/60 p-5 sm:p-6">
              <ArchitectureDiagram
                nodes={project.stages}
                label={`${project.title} architecture stages`}
                caption={
                  project.kind === "work"
                    ? "Conceptual / sanitized architecture. Hover, focus or tap a stage."
                    : "Hover, focus or tap a stage for details."
                }
              />
            </div>
          </CaseSection>

          <CaseSection id="data-flow" title="Data flow">
            <p className="leading-relaxed text-muted">{caseStudy.dataFlow}</p>
          </CaseSection>

          <CaseSection id="role" title="My role">
            <BulletList items={caseStudy.role} />
          </CaseSection>

          <CaseSection id="technologies" title="Technologies">
            <ul className="flex flex-wrap gap-2" aria-label="Technologies used">
              {project.stack.map((tech) => (
                <li key={tech}>
                  <Badge>{tech}</Badge>
                </li>
              ))}
            </ul>
          </CaseSection>

          {caseStudy.decisions.length > 0 ? (
            <CaseSection id="decisions" title="Engineering decisions">
              <TitledList items={caseStudy.decisions} />
            </CaseSection>
          ) : null}

          {caseStudy.challenges.length > 0 ? (
            <CaseSection id="challenges" title="Challenges">
              <TitledList items={caseStudy.challenges} />
            </CaseSection>
          ) : null}

          <CaseSection id="outcome" title="Outcome">
            <BulletList items={caseStudy.outcome} />
          </CaseSection>

          {caseStudy.lessons.length > 0 ? (
            <CaseSection id="lessons" title="Lessons learned">
              <BulletList items={caseStudy.lessons} />
            </CaseSection>
          ) : null}

          <CaseSection id="source" title="Source">
            {project.kind === "work" ? (
              <p className="mb-4 leading-relaxed text-muted">
                The production code belongs to my employer and is not published.
              </p>
            ) : null}
            <Button href={project.repoUrl} variant="secondary">
              GitHub
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Button>
          </CaseSection>

          <nav
            aria-label="More projects"
            className="grid gap-4 border-t border-line pt-8 sm:grid-cols-2"
          >
            {previous ? (
              <Link href={`/projects/${previous.slug}`} className="group block">
                <span className="flex items-center gap-1 text-xs text-muted">
                  <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
                  Previous
                </span>
                <span className="mt-1 block font-medium transition-colors group-hover:text-flow">
                  {previous.title}
                </span>
              </Link>
            ) : (
              <span />
            )}
            {next ? (
              <Link href={`/projects/${next.slug}`} className="group block sm:text-right">
                <span className="flex items-center gap-1 text-xs text-muted sm:justify-end">
                  Next
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </span>
                <span className="mt-1 block font-medium transition-colors group-hover:text-flow">
                  {next.title}
                </span>
              </Link>
            ) : null}
          </nav>
        </div>
      </div>
    </article>
  );
}
