"use client";

import { useState, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import type { PipelineNode } from "@/types";
import { ArchitectureDiagram } from "@/components/diagrams/ArchitectureDiagram";
import { cn } from "@/lib/utils";

interface ExperiencePipelineProps {
  id: string;
  role: string;
  pipeline: PipelineNode[];
  /** The role's bullet list, rendered on the server. */
  children: ReactNode;
}

/** Right-hand column of an experience row, plus the full-width expandable pipeline. */
export function ExperiencePipeline({ id, role, pipeline, children }: ExperiencePipelineProps) {
  const [open, setOpen] = useState(false);
  const panelId = `pipeline-${id}`;

  return (
    <>
      <div className="lg:col-span-8">
        {children}
        <button
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((value) => !value)}
          className="mt-6 inline-flex h-10 items-center gap-2 rounded-md border border-line bg-surface px-4 text-sm font-medium transition-colors hover:border-muted/70"
        >
          {open ? "Hide the data pipeline" : "Show the data pipeline"}
          <ChevronDown
            className={cn("h-4 w-4 transition-transform", open && "rotate-180")}
            aria-hidden="true"
          />
        </button>
      </div>

      <div
        id={panelId}
        role="region"
        aria-label={`${role} data pipeline`}
        inert={!open}
        className={cn(
          "grid transition-[grid-template-rows] duration-300 ease-out lg:col-span-12",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        <div className="overflow-hidden">
          <div className="rounded-xl border border-line bg-surface/60 p-5 sm:p-6">
            <ArchitectureDiagram
              nodes={pipeline}
              label={`${role} pipeline stages`}
              caption="Simplified, sanitized view. Hover, focus or tap a stage for details."
            />
          </div>
        </div>
      </div>
    </>
  );
}
