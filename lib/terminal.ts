import { experience } from "@/data/experience";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import { skillGroups } from "@/data/skills";
import { socials } from "@/data/socials";
import { formatPeriod, formatTenure, monthsBetween } from "@/lib/tenure";

export interface TerminalLine {
  text: string;
  href?: string;
  /** True for the echoed command the visitor typed. */
  input?: boolean;
}

export type TerminalAction = "clear" | "exit" | "resume" | "theme";

export interface TerminalResult {
  lines: TerminalLine[];
  action?: TerminalAction;
}

const HELP: Array<[string, string]> = [
  ["help", "list commands"],
  ["about", "who I am"],
  ["projects", "list projects"],
  ["skills", "tools by category"],
  ["experience", "work history"],
  ["contact", "ways to reach me"],
  ["resume", "download my résumé"],
  ["theme", "switch dark / light"],
  ["clear", "clear the screen"],
  ["exit", "close the terminal"],
];

export function runCommand(raw: string): TerminalResult {
  const command = raw.trim().toLowerCase();
  if (!command) return { lines: [] };

  switch (command) {
    case "help":
      return { lines: HELP.map(([name, text]) => ({ text: `${name.padEnd(11)}${text}` })) };

    case "about":
      return {
        lines: [
          { text: `${profile.name}, ${profile.role}` },
          { text: profile.intro },
          { text: profile.location },
        ],
      };

    case "projects":
      return {
        lines: [
          ...projects.map((project) => ({
            text: `${project.title}${project.status === "in-progress" ? " (in progress)" : ""}`,
            href: `/projects/${project.slug}`,
          })),
          { text: "Select a project to open its case study." },
        ],
      };

    case "skills":
      return {
        lines: skillGroups
          .filter((group) => group.id !== "exploring")
          .map((group) => ({ text: `${group.title}: ${group.items.join(", ")}` })),
      };

    case "experience":
      return {
        lines: experience.flatMap((item) => [
          { text: `${item.role}, ${item.organization}` },
          {
            text: `  ${formatPeriod(item)} (${formatTenure(
              monthsBetween(item.startDate, item.endDate),
              "years-months",
            )})`,
          },
        ]),
      };

    case "contact":
      return {
        lines: [socials.email, socials.linkedin, socials.github].map((link) => ({
          text: `${link.label.padEnd(9)}${link.handle}`,
          href: link.href,
        })),
      };

    case "resume":
      return { lines: [{ text: "Downloading résumé…" }], action: "resume" };

    case "theme":
      return { lines: [{ text: "Theme switched." }], action: "theme" };

    case "clear":
      return { lines: [], action: "clear" };

    case "exit":
      return { lines: [], action: "exit" };

    default:
      return { lines: [{ text: `command not found: ${command}. Type "help" for a list.` }] };
  }
}
