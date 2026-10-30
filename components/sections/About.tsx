import { profile } from "@/data/profile";
import { Section } from "@/components/ui/Section";

export function About() {
  // Entries still marked TODO stay hidden until you fill them in.
  const education = profile.education.filter((item) => !item.school.startsWith("TODO"));

  return (
    <Section id="about" title="About">
      <div className="grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <h3 className="text-sm font-medium">Who I am</h3>
          <p className="mt-3 leading-relaxed text-muted">{profile.about}</p>
          <h3 className="mt-8 text-sm font-medium">What I am looking for</h3>
          <p className="mt-3 leading-relaxed text-muted">{profile.lookingFor}</p>
        </div>

        <div className="lg:col-span-6">
          <h3 className="text-sm font-medium">Current focus</h3>
          <ul className="mt-3 space-y-2">
            {profile.focus.map((item) => (
              <li key={item} className="relative pl-5 text-sm text-muted">
                <span aria-hidden="true" className="absolute left-0 top-[0.6rem] h-px w-3 bg-flow" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-12 grid gap-10 border-t border-line pt-10 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <h3 className="text-sm font-medium">Education</h3>
          <ul className="mt-3 space-y-4">
            {education.map((item) => (
              <li key={item.degree}>
                <p className="text-sm">
                  {item.degree}
                  {item.field ? <span className="text-muted">, {item.field}</span> : null}
                </p>
                <p className="mt-0.5 text-sm text-muted">{item.school}</p>
                {item.period ? <p className="mt-0.5 font-mono text-xs text-muted">{item.period}</p> : null}
              </li>
            ))}
          </ul>
        </div>
        <div className="lg:col-span-6">
          <h3 className="text-sm font-medium">Certifications</h3>
          <ul className="mt-3 space-y-2">
            {profile.certifications.map((item) => (
              <li key={item} className="text-sm text-muted">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
