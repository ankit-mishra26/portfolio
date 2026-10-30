"use client";

import { useState } from "react";
import { experience } from "@/data/experience";
import { projects } from "@/data/projects";
import { skillDetails, skillGroups } from "@/data/skills";
import { Section } from "@/components/ui/Section";
import { cn } from "@/lib/utils";

const DEFAULT_SKILL = "Python";

export function TechStack() {
  const [selected, setSelected] = useState(DEFAULT_SKILL);

  const detail = skillDetails[selected];
  const relatedProjects = detail ? projects.filter((p) => detail.projects.includes(p.slug)) : [];
  const relatedRoles = detail ? experience.filter((e) => detail.roles.includes(e.id)) : [];

  return (
    <Section
      id="stack"
      title="Engineering stack"
      description="Grouped by what each tool is for. Select one to see how I've used it."
    >
      <div className="grid gap-10 lg:grid-cols-12">
        <div className="space-y-8 lg:col-span-7">
          {skillGroups.map((group) => (
            <div key={group.id}>
              <h3 className="text-sm font-medium">{group.title}</h3>
              <ul className="mt-3 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li key={item}>
                    <button
                      type="button"
                      aria-pressed={selected === item}
                      onClick={() => setSelected(item)}
                      className={cn(
                        "rounded border px-2.5 py-1 font-mono text-xs transition-colors",
                        selected === item
                          ? "border-flow/60 bg-flow/5 text-fg"
                          : "border-line text-muted hover:border-muted/60 hover:text-fg",
                      )}
                    >
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
              {group.note ? <p className="mt-2 text-xs text-muted">{group.note}</p> : null}
            </div>
          ))}
        </div>

        <aside
          aria-label="Selected technology details"
          aria-live="polite"
          className="h-fit rounded-xl border border-line bg-surface/60 p-5 sm:p-6 lg:sticky lg:top-24 lg:col-span-5"
        >
          <h3 className="font-mono text-lg">{selected}</h3>
          {detail ? (
            <>
              <p className="mt-4 text-xs text-muted">What I use it for</p>
              <p className="mt-1 text-sm">{detail.usedFor}</p>

              {relatedProjects.length > 0 ? (
                <>
                  <p className="mt-5 text-xs text-muted">Projects</p>
                  <ul className="mt-1 space-y-1 text-sm">
                    {relatedProjects.map((project) => (
                      <li key={project.slug}>{project.title}</li>
                    ))}
                  </ul>
                </>
              ) : null}

              {relatedRoles.length > 0 ? (
                <>
                  <p className="mt-5 text-xs text-muted">Experience</p>
                  <ul className="mt-1 space-y-1 text-sm">
                    {relatedRoles.map((role) => (
                      <li key={role.id}>
                        {role.role}, {role.organization}
                      </li>
                    ))}
                  </ul>
                </>
              ) : null}
            </>
          ) : null}
        </aside>
      </div>
    </Section>
  );
}
