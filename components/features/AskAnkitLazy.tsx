"use client";

import dynamic from "next/dynamic";
import { Section } from "@/components/ui/Section";

/** Loads the assistant after the main content. The placeholder keeps the #ask anchor and layout stable. */
const AskAnkit = dynamic(() => import("@/components/features/AskAnkit").then((m) => m.AskAnkit), {
  ssr: false,
  loading: () => (
    <Section id="ask" title="Ask Ankit">
      <div className="min-h-[18rem]" aria-busy="true" />
    </Section>
  ),
});

export function AskAnkitLazy() {
  return <AskAnkit />;
}
