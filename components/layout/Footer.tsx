import { siteConfig } from "@/config/site";
import { socials } from "@/data/socials";
import { profile } from "@/data/profile";
import { TerminalButton } from "@/components/features/OverlayTriggers";

export function Footer() {
  const links = [
    { label: "Projects", href: "/projects", external: false },
    { label: "GitHub", href: socials.github.href, external: true },
    { label: "LinkedIn", href: socials.linkedin.href, external: true },
    { label: "Email", href: socials.email.href, external: false },
    { label: "Résumé", href: siteConfig.resumePath, external: false },
  ];

  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-5 py-12 sm:flex-row sm:items-end sm:justify-between sm:px-8">
        <div>
          <p className="font-medium">{profile.name}</p>
          <p className="mt-1 text-sm text-muted">{profile.footerLine}</p>
          <p className="mt-6 text-sm text-muted">
            Built with curiosity, data, and a slightly unhealthy interest in pipelines.
          </p>
        </div>
        <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
          {links.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="text-muted transition-colors hover:text-fg"
                {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                {...(link.label === "Résumé" ? { download: true } : {})}
              >
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <TerminalButton />
          </li>
        </ul>
      </div>
    </footer>
  );
}
