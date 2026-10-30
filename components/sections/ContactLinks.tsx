import { ArrowUpRight } from "lucide-react";
import { socials } from "@/data/socials";
import { Section } from "@/components/ui/Section";
import { ContactForm } from "@/components/features/ContactForm";

export function ContactLinks() {
  const links = [socials.email, socials.linkedin, socials.github];
  return (
    <Section
      id="contact"
      title="Let's build something useful"
      description="Have a data problem, an engineering opportunity, or an interesting system to build?"
    >
      <div className="grid gap-12 lg:grid-cols-12">
        <ul className="h-fit divide-y divide-line border-y border-line lg:col-span-5">
          {links.map((link) => (
            <li key={link.id}>
              <a
                href={link.href}
                className="group flex items-center justify-between gap-4 py-5 transition-colors hover:text-flow"
                {...(link.id === "email" ? {} : { target: "_blank", rel: "noopener noreferrer" })}
              >
                <span className="font-medium">{link.label}</span>
                <span className="flex min-w-0 items-center gap-2 font-mono text-sm text-muted group-hover:text-flow">
                  <span className="break-all text-right">{link.handle}</span>
                  <ArrowUpRight className="h-4 w-4 shrink-0" aria-hidden="true" />
                </span>
              </a>
            </li>
          ))}
        </ul>
        <div className="lg:col-span-7">
          <ContactForm />
        </div>
      </div>
    </Section>
  );
}
