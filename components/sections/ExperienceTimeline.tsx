import { experience } from "@/data/experience";
import { formatPeriod } from "@/lib/tenure";
import { Section } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Badge";
import { Tenure } from "@/components/ui/Tenure";
import { ExperiencePipeline } from "@/components/sections/ExperiencePipeline";

export function ExperienceTimeline() {
  return (
    <Section id="experience" title="Experience">
      <ol className="space-y-14">
        {experience.map((item) => {
          const bullets = (
            <ul className="space-y-3">
              {item.bullets.map((bullet) => (
                <li key={bullet} className="relative pl-5 text-sm leading-relaxed text-muted">
                  <span
                    aria-hidden="true"
                    className="absolute left-0 top-[0.55rem] h-px w-3 bg-flow"
                  />
                  {bullet}
                </li>
              ))}
            </ul>
          );

          return (
            <li key={item.id} className="grid gap-4 lg:grid-cols-12 lg:gap-x-10 lg:gap-y-6">
              <div className="lg:col-span-4">
                <h3 className="text-lg font-medium tracking-tight">{item.role}</h3>
                <p className="mt-1 text-sm text-muted">{item.organization}</p>
                <p className="mt-1 font-mono text-xs text-muted">
                  {formatPeriod(item)} ·{" "}
                  <Tenure since={item.startDate} until={item.endDate} format="years-months" />
                  {" "}· {item.location}
                </p>
                {!item.endDate ? (
                  <div className="mt-3">
                    <Badge tone="work">Current role</Badge>
                  </div>
                ) : null}
              </div>

              {item.pipeline ? (
                <ExperiencePipeline id={item.id} role={item.role} pipeline={item.pipeline}>
                  {bullets}
                </ExperiencePipeline>
              ) : (
                <div className="lg:col-span-8">{bullets}</div>
              )}
            </li>
          );
        })}
      </ol>
    </Section>
  );
}
