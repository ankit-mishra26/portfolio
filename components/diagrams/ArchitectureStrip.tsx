import { ChevronRight } from "lucide-react";

/** Compact, static architecture summary for project rows. */
export function ArchitectureStrip({ steps, label }: { steps: string[]; label: string }) {
  return (
    <ol aria-label={label} className="flex flex-wrap items-center gap-y-2 text-xs">
      {steps.map((step, index) => (
        <li key={step} className="flex items-center">
          <span className="rounded border border-line bg-bg px-2 py-1 font-mono text-muted">
            {step}
          </span>
          {index < steps.length - 1 ? (
            <ChevronRight className="mx-0.5 h-3.5 w-3.5 text-flow" aria-hidden="true" />
          ) : null}
        </li>
      ))}
    </ol>
  );
}
