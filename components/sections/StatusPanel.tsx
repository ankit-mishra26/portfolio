import type { ReactNode } from "react";
import { profile } from "@/data/profile";
import { formatMonthYear } from "@/lib/tenure";
import { StatusIndicator } from "@/components/ui/StatusIndicator";
import { Tenure } from "@/components/ui/Tenure";

/** Replaces {since} and {tenure} placeholders in a status value. */
function renderValue(value: string): ReactNode[] {
  const resolved = value.replace("{since}", formatMonthYear(profile.careerStart));
  const parts = resolved.split("{tenure}");
  return parts.flatMap((part, index) =>
    index < parts.length - 1
      ? [part, <Tenure key={index} since={profile.careerStart} format="years-months" />]
      : [part],
  );
}

export function StatusPanel() {
  return (
    <aside
      aria-label="Profile summary"
      className="rounded-xl border border-line bg-surface/60 p-5 sm:p-6"
    >
      <div className="flex items-center justify-between gap-3 border-b border-line pb-4">
        <h2 className="font-mono text-sm text-muted">status</h2>
        <StatusIndicator label={profile.availability} />
      </div>
      <dl className="mt-4 space-y-3">
        {profile.status.map((row) => (
          <div key={row.label} className="grid grid-cols-[6rem_1fr] gap-3 text-sm">
            <dt className="font-mono text-muted">{row.label}</dt>
            <dd>{renderValue(row.value)}</dd>
          </div>
        ))}
      </dl>
    </aside>
  );
}
