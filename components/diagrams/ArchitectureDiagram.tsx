"use client";

import { useEffect, useRef, useState } from "react";
import type { PipelineNode } from "@/types";
import { cn } from "@/lib/utils";

interface ArchitectureDiagramProps {
  nodes: PipelineNode[];
  /** Accessible name for the list of stages. */
  label: string;
  caption?: string;
}

/**
 * Responsive architecture diagram built from real HTML, not canvas.
 * Vertical on mobile, a horizontally scrollable row on large screens.
 * Hover, focus or tap a stage to read what it does.
 */
export function ArchitectureDiagram({ nodes, label, caption }: ArchitectureDiagramProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setRevealed(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const last = nodes.length - 1;
  const current = nodes[selected] ?? nodes[0];

  return (
    <div ref={rootRef}>
      <ol aria-label={label} className="flex flex-col lg:flex-row lg:items-center lg:overflow-x-auto lg:pb-3">
        {nodes.map((node, index) => {
          const isSelected = index === selected;
          return (
            <li key={node.id} className="flex flex-col lg:shrink-0 lg:flex-row lg:items-center">
              <button
                type="button"
                aria-pressed={isSelected}
                onClick={() => setSelected(index)}
                onMouseEnter={() => setSelected(index)}
                onFocus={() => setSelected(index)}
                style={{ transitionDelay: revealed ? `${index * 70}ms` : "0ms" }}
                className={cn(
                  "w-full rounded-md border px-3 py-2.5 text-left text-sm transition-all duration-300 lg:w-32",
                  revealed ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0",
                  isSelected
                    ? "border-flow/60 bg-flow/5 text-fg"
                    : "border-line bg-bg text-muted hover:text-fg",
                )}
              >
                {node.label}
              </button>
              {index < last ? (
                <span
                  aria-hidden="true"
                  className="ml-6 block h-4 w-px bg-line lg:ml-0 lg:h-px lg:w-5"
                />
              ) : null}
            </li>
          );
        })}
      </ol>

      <p
        aria-live="polite"
        className="mt-4 min-h-[3rem] border-t border-line pt-4 text-sm text-muted"
      >
        <span className="mr-2 font-mono text-fg">{current?.label}</span>
        {current?.description}
      </p>
      {caption ? <p className="mt-2 font-mono text-xs text-muted">{caption}</p> : null}
    </div>
  );
}
