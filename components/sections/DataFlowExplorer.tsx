"use client";

import { useEffect, useState } from "react";
import { Pause, Play } from "lucide-react";
import { flowScenarios } from "@/data/flows";
import { Section } from "@/components/ui/Section";
import { cn } from "@/lib/utils";

const STEP_MS = 1100;

export function DataFlowExplorer() {
  const [scenarioIndex, setScenarioIndex] = useState(0);
  const [stage, setStage] = useState(0);
  const [playing, setPlaying] = useState(false);

  const scenario = flowScenarios[scenarioIndex] ?? flowScenarios[0];
  const lastStage = (scenario?.stages.length ?? 1) - 1;

  useEffect(() => {
    if (!playing) return;
    if (stage >= lastStage) {
      setPlaying(false);
      return;
    }
    const timer = window.setTimeout(() => setStage((current) => current + 1), STEP_MS);
    return () => window.clearTimeout(timer);
  }, [playing, stage, lastStage]);

  if (!scenario) return null;
  const activeStage = scenario.stages[stage] ?? scenario.stages[0];

  function selectScenario(index: number) {
    setScenarioIndex(index);
    setStage(0);
    setPlaying(false);
  }

  function togglePlay() {
    if (playing) {
      setPlaying(false);
      return;
    }
    if (stage >= lastStage) setStage(0);
    setPlaying(true);
  }

  return (
    <Section
      id="approach"
      title="How I approach a data problem"
      description="Pick a starting point and step through what I do at each stage."
    >
      <div role="tablist" aria-label="Starting point" className="flex flex-wrap gap-2">
        {flowScenarios.map((item, index) => {
          const selected = index === scenarioIndex;
          return (
            <button
              key={item.id}
              role="tab"
              type="button"
              id={`flow-tab-${item.id}`}
              aria-selected={selected}
              aria-controls="flow-panel"
              onClick={() => selectScenario(index)}
              className={cn(
                "h-10 rounded-md border px-4 text-sm transition-colors",
                selected
                  ? "border-flow/60 bg-flow/5 text-fg"
                  : "border-line text-muted hover:border-muted/60 hover:text-fg",
              )}
            >
              {item.label}
            </button>
          );
        })}
      </div>

      <div
        id="flow-panel"
        role="tabpanel"
        aria-labelledby={`flow-tab-${scenario.id}`}
        className="mt-6 rounded-xl border border-line bg-surface/60 p-5 sm:p-6"
      >
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-muted">{scenario.prompt}</p>
          <button
            type="button"
            onClick={togglePlay}
            className="inline-flex h-9 items-center gap-2 rounded-md border border-line px-3 text-sm transition-colors hover:border-muted/70"
          >
            {playing ? (
              <Pause className="h-4 w-4" aria-hidden="true" />
            ) : (
              <Play className="h-4 w-4" aria-hidden="true" />
            )}
            {playing ? "Pause" : "Play through"}
          </button>
        </div>

        <ol aria-label="Stages" className="mt-6 grid gap-2 sm:grid-cols-3 lg:grid-cols-6">
          {scenario.stages.map((item, index) => {
            const active = index === stage;
            const visited = index <= stage;
            return (
              <li key={item.label}>
                <button
                  type="button"
                  aria-pressed={active}
                  onClick={() => {
                    setPlaying(false);
                    setStage(index);
                  }}
                  className={cn(
                    "flex w-full items-center gap-2 rounded-md border px-3 py-2.5 text-left text-sm transition-colors",
                    active
                      ? "border-flow/60 bg-flow/5 text-fg shadow-glow"
                      : visited
                        ? "border-flow/30 text-fg"
                        : "border-line text-muted hover:text-fg",
                  )}
                >
                  <span className="font-mono text-[11px] text-muted">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {item.label}
                </button>
              </li>
            );
          })}
        </ol>

        <p
          aria-live="polite"
          className="mt-6 min-h-[3rem] border-t border-line pt-4 text-sm sm:min-h-[2.5rem]"
        >
          <span className="mr-2 font-mono text-flow">{activeStage?.label}</span>
          {activeStage?.text}
        </p>
      </div>
    </Section>
  );
}
