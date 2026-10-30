import { Hero } from "@/components/sections/Hero";
import { Metrics } from "@/components/sections/Metrics";
import { ProjectGrid } from "@/components/sections/ProjectGrid";
import { ExperienceTimeline } from "@/components/sections/ExperienceTimeline";
import { DataFlowExplorer } from "@/components/sections/DataFlowExplorer";
import { TechStack } from "@/components/sections/TechStack";
import { GitHubActivity } from "@/components/sections/GitHubActivity";
import { About } from "@/components/sections/About";
import { ContactLinks } from "@/components/sections/ContactLinks";
import { AskAnkitLazy } from "@/components/features/AskAnkitLazy";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Metrics />
      <ProjectGrid />
      <ExperienceTimeline />
      <DataFlowExplorer />
      <TechStack />
      <GitHubActivity />
      <AskAnkitLazy />
      <About />
      <ContactLinks />
    </>
  );
}
