import { Github, Linkedin } from "lucide-react";
import { profile } from "@/data/profile";
import { socials } from "@/data/socials";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/Button";
import { PipelineVisualizer } from "@/components/diagrams/PipelineVisualizer";
import { StatusPanel } from "@/components/sections/StatusPanel";
import { Tenure } from "@/components/ui/Tenure";

export function Hero() {
  return (
    <section aria-labelledby="hero-heading" className="relative overflow-hidden">
      <div aria-hidden="true" className="bg-grid pointer-events-none absolute inset-0" />
      <div className="relative mx-auto w-full max-w-6xl px-5 pb-16 pt-14 sm:px-8 sm:pb-24 sm:pt-20">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <p className="font-mono text-sm text-muted">
              {profile.name}, {profile.role} · <Tenure since={profile.careerStart} /> experience
            </p>
            <h1
              id="hero-heading"
              className="mt-4 text-balance text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl"
            >
              {profile.headline}
            </h1>
            <p className="mt-6 max-w-xl text-pretty text-base text-muted sm:text-lg">
              {profile.intro}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button href="/#work">View projects</Button>
              <Button href={siteConfig.resumePath} download variant="secondary">
                Download résumé
              </Button>
              <Button href={socials.github.href} variant="ghost" size="md">
                <Github className="h-4 w-4" aria-hidden="true" />
                GitHub
              </Button>
              <Button href={socials.linkedin.href} variant="ghost" size="md">
                <Linkedin className="h-4 w-4" aria-hidden="true" />
                LinkedIn
              </Button>
            </div>
          </div>

          <div className="lg:col-span-5">
            <StatusPanel />
          </div>
        </div>

        <div className="mt-12">
          <PipelineVisualizer />
        </div>
      </div>
    </section>
  );
}
