import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Tone = "default" | "work" | "academic";

const tones: Record<Tone, string> = {
  default: "border-line text-muted",
  work: "border-accent/40 text-accent",
  academic: "border-warm/40 text-warm",
};

export function Badge({ children, tone = "default" }: { children: ReactNode; tone?: Tone }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded border px-2 py-0.5 font-mono text-xs",
        tones[tone],
      )}
    >
      {children}
    </span>
  );
}
