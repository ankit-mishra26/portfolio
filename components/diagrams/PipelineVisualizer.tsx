"use client";

import { useEffect, useState } from "react";
import { pipelineNodes } from "@/data/pipeline";
import { cn } from "@/lib/utils";

const STEP_MS = 2400;
const LAST_INDEX = pipelineNodes.length - 1;

function Connector({ index, active }: { index: number; active: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "relative ml-6 block h-6 w-px overflow-hidden bg-line transition-colors",
        "lg:ml-0 lg:h-px lg:w-auto lg:min-w-8 lg:flex-1",
        active && "bg-flow/50",
      )}
    >
      <span className="flow-dot" style={{ animationDelay: `${index * 0.35}s` }} />
    </span>
  );
}

export function PipelineVisualizer() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(query.matches);
    const onChange = (event: MediaQueryListEvent) => setReducedMotion(event.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  // Advance one stage at a time; a click or hover resets the timer and pauses it.
  useEffect(() => {
    if (paused || reducedMotion) return;
    const timer = window.setTimeout(
      () => setActive((current) => (current + 1) % pipelineNodes.length),
      STEP_MS,
    );
    return () => window.clearTimeout(timer);
  }, [active, paused, reducedMotion]);

  const current = pipelineNodes[active] ?? pipelineNodes[0];

  return (
    <div
      className="rounded-xl border border-line bg-surface/60 p-5 sm:p-6"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="mb-5 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h2 className="text-sm font-medium">How data moves through my work</h2>
        <p className="font-mono text-xs text-muted">General lifecycle, with examples from my work</p>
      </div>

      <ol className="flex flex-col lg:flex-row lg:items-center" aria-label="Data pipeline stages">
        {pipelineNodes.map((node, index) => {
          const isActive = index === active;
          return (
            <li
              key={node.id}
              className={cn(
                "flex flex-col lg:flex-row lg:items-center",
                index < LAST_INDEX && "lg:flex-1",
              )}
            >
              <button
                type="button"
                aria-pressed={isActive}
                aria-describedby="pipeline-detail"
                onClick={() => setActive(index)}
                className={cn(
                  "flex w-full items-center gap-3 rounded-md border px-3 py-2.5 text-left transition-colors lg:w-auto lg:flex-col lg:items-start lg:gap-1",
                  isActive
                    ? "border-flow/60 bg-flow/5 shadow-glow"
                    : "border-line bg-bg hover:border-muted/60",
                )}
              >
                <span className="font-mono text-[11px] text-muted">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="whitespace-nowrap text-sm font-medium">{node.label}</span>
              </button>
              {index < LAST_INDEX ? <Connector index={index} active={isActive} /> : null}
            </li>
          );
        })}
      </ol>

      <p
        id="pipeline-detail"
        aria-live={paused ? "polite" : "off"}
        className="mt-6 min-h-[7rem] border-t border-line pt-4 text-sm text-muted sm:min-h-[5rem]"
      >
        <span className="mr-2 font-mono text-fg">{current?.label}</span>
        {current?.description}
        {current?.inPractice ? (
          <span className="mt-2 block">
            <span className="mr-2 font-mono text-xs text-flow">In practice</span>
            {current.inPractice}
          </span>
        ) : null}
      </p>
    </div>
  );
}
