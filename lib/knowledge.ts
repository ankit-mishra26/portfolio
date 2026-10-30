import { experience } from "@/data/experience";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import { skillDetails, skillGroups } from "@/data/skills";
import { socials } from "@/data/socials";
import { formatTenure, monthsBetween } from "@/lib/tenure";

export interface Topic {
  id: string;
  /** Matched against the visitor's question. Multi-word phrases score higher. */
  keywords: string[];
  answer: string;
}

function groupItems(id: string): string {
  return skillGroups.find((group) => group.id === id)?.items.join(", ") ?? "";
}

/**
 * Builds the assistant's knowledge from the same public data files the site renders,
 * so updating the portfolio updates Ask Ankit too. Nothing private belongs here.
 */
export function buildTopics(now: Date = new Date()): Topic[] {
  const role = experience.find((item) => !item.endDate) ?? experience[0];
  const tenure = formatTenure(monthsBetween(profile.careerStart, undefined, now), "years-months");
  const mlBullet = role?.bullets.find((bullet) => bullet.includes("ML models")) ?? "";

  const education = profile.education
    .filter((item) => !item.school.startsWith("TODO"))
    .map(
      (item) =>
        `${item.degree}${item.field ? ` (${item.field})` : ""}, ${item.school}${item.period ? `, ${item.period}` : ""}`,
    )
    .join(". ");

  const GENERIC_TITLE_WORDS = new Set(["and", "for", "the", "age", "analysis", "prediction", "project", "management", "personal", "pipelines", "feature", "price"]);
  const projectTopics = projects.map<Topic>((project) => ({
    id: `project-${project.slug}`,
    keywords: [
      ...project.title
        .toLowerCase()
        .split(/[^a-z0-9]+/)
        .filter((word) => word.length > 2 && !GENERIC_TITLE_WORDS.has(word)),
      project.slug.replace(/-/g, " "),
    ],
    answer: `${project.title}${project.status === "in-progress" ? " (in progress)" : ""}: ${project.summary} His part: ${project.role} Case study: /projects/${project.slug}.`,
  }));

  // Plain-language definitions from the case studies (EMI, BKTX, DPD, ...), one per term.
  const seenTerms = new Set<string>();
  const glossaryTopics: Topic[] = [];
  for (const project of projects) {
    for (const entry of project.caseStudy.glossary ?? []) {
      const key = entry.term.toLowerCase();
      if (seenTerms.has(key)) continue;
      seenTerms.add(key);
      const first = key.split(" ")[0] ?? key;
      glossaryTopics.push({
        id: `term-${key.replace(/\s+/g, "-")}`,
        keywords: [key, first],
        answer: `${entry.term}: ${entry.meaning}`,
      });
    }
  }

  return [
    ...projectTopics,
    ...glossaryTopics,
    {
      id: "experience",
      keywords: ["data engineering", "data engineer", "etl", "elt", "pipeline", "experience", "work experience", "worked on", "how long", "years", "current role"],
      answer: role
        ? `${profile.name} is a ${role.role} (${role.organization}) with ${tenure} of full-time experience so far. ${role.bullets.slice(0, 3).join(" ")}`
        : profile.intro,
    },
    {
      id: "projects",
      keywords: ["projects", "case studies", "ml project", "built", "portfolio"],
      answer: `Projects: ${projects
        .map((project) => `${project.title}${project.status === "in-progress" ? " (in progress)" : ""}`)
        .join("; ")}. Full case studies are at /projects.`,
    },
    {
      id: "ml",
      keywords: ["machine learning", "ml", "model", "feature engineering", "scoring", "bounce", "collections", "propensity", "ml engineer"],
      answer: `${mlBullet} ${profile.lookingFor}`.trim(),
    },
    {
      id: "cloud",
      keywords: ["cloud technologies", "cloud", "gcp", "google cloud", "vertex", "storage"],
      answer: `Cloud work is on Google Cloud Platform: ${groupItems("cloud")}. ${skillDetails["Google Cloud Platform"]?.usedFor ?? ""}`.trim(),
    },
    {
      id: "bigquery",
      keywords: ["bigquery", "big query", "warehouse", "data warehouse"],
      answer: `Yes. ${skillDetails.BigQuery?.usedFor ?? ""} It is used in: ${projects
        .filter((project) => skillDetails.BigQuery?.projects.includes(project.slug))
        .map((project) => project.title)
        .join("; ")}.`,
    },
    {
      id: "python-sql",
      keywords: ["python", "sql", "pandas", "numpy", "programming", "languages"],
      answer: `Python (${groupItems("languages")}). ${skillDetails.Python?.usedFor ?? ""} SQL: ${skillDetails.SQL?.usedFor ?? ""}`.trim(),
    },
    {
      id: "skills",
      keywords: ["skills", "stack", "technologies", "tools", "tech", "technology"],
      answer: skillGroups
        .filter((group) => group.id !== "exploring")
        .map((group) => `${group.title}: ${group.items.join(", ")}`)
        .join(". "),
    },
    {
      id: "learning",
      keywords: ["learning", "exploring", "next", "databricks", "spark", "delta lake", "lakehouse"],
      answer: `He is exploring ${groupItems("exploring")}. These are learning goals, not yet used in production.`,
    },
    {
      id: "education",
      keywords: ["education", "degree", "college", "university", "btech", "study", "studied", "school", "qualification"],
      answer: education,
    },
    {
      id: "certifications",
      keywords: ["certification", "certificate", "certified", "course"],
      answer: `Certifications: ${profile.certifications.join("; ")}.`,
    },
    {
      id: "goal",
      keywords: ["looking for", "opportunity", "opportunities", "available", "availability", "goal", "next role", "hiring", "open to", "interested"],
      answer: `${profile.availability}. ${profile.lookingFor}`,
    },
    {
      id: "contact",
      keywords: ["contact", "email", "reach", "linkedin", "github", "message", "hire"],
      answer: `Email: ${socials.email.handle}. LinkedIn: ${socials.linkedin.href}. GitHub: ${socials.github.href}. The contact form on this page also works.`,
    },
    {
      id: "resume",
      keywords: ["resume", "cv", "download"],
      answer: "The résumé can be downloaded from the Résumé button in the navigation bar.",
    },
    {
      id: "location",
      keywords: ["location", "based", "where", "city", "bengaluru", "bangalore"],
      answer: `Based in ${profile.location}.`,
    },
    {
      id: "about",
      keywords: ["who", "about", "introduce", "background", "summary", "yourself"],
      answer: `${profile.name} is a ${profile.role}. ${profile.intro}`,
    },
  ];
}

/** Plain-text facts for an optional LLM, built from the same public data. */
export function buildContext(now: Date = new Date()): string {
  return buildTopics(now)
    .map((topic) => topic.answer)
    .join("\n");
}
