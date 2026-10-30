export interface NavItem {
  label: string;
  href: string;
}

export interface SocialLink {
  id: "github" | "linkedin" | "email";
  label: string;
  href: string;
  handle: string;
}

export interface StatusRow {
  label: string;
  /** May contain {tenure} (live experience timer) and {since} (career start month). */
  value: string;
}

export interface EducationItem {
  degree: string;
  field?: string;
  school: string;
  period?: string;
}

export interface Profile {
  name: string;
  /** Current job title. Also used in structured data. */
  role: string;
  /** First full-time month, as "YYYY-MM". Drives the live experience timer. */
  careerStart: string;
  /** Used in the page title, e.g. "Data Engineer | ML Engineer". */
  titleRoles: string;
  headline: string;
  intro: string;
  /** Short human paragraph for the About section. */
  about: string;
  /** Current focus areas, shown in the About section. */
  focus: string[];
  /** Meta description for search engines and link previews. */
  seoDescription: string;
  /** One-line summary shown in the footer. */
  footerLine: string;
  /** What you are looking for next. Shown in Ask Ankit. */
  lookingFor: string;
  location: string;
  availability: string;
  status: StatusRow[];
  education: EducationItem[];
  certifications: string[];
}

export interface Metric {
  value: string;
  label: string;
  note: string;
  /** Must match an ExperienceItem id. Metrics are grouped under their role. */
  roleId: string;
}

export interface PipelineNode {
  id: string;
  label: string;
  description: string;
  /** An example from my own work. Swap these when you change jobs. */
  inPractice?: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  organization: string;
  location: string;
  /** "YYYY-MM". */
  startDate: string;
  /** "YYYY-MM". Leave out for the role you hold now: it is shown as "Present". */
  endDate?: string;
  bullets: string[];
  /** Optional sanitized pipeline shown in an expandable panel. */
  pipeline?: PipelineNode[];
}

export type ProjectKind = "work" | "academic";

export interface CaseStudyItem {
  title: string;
  body: string;
}

export interface GlossaryTerm {
  term: string;
  meaning: string;
}

export interface CaseStudy {
  overview: string;
  /** Optional plain-language explanations of domain terms for non-specialists. */
  glossary?: GlossaryTerm[];
  /** One paragraph per entry. */
  problem: string[];
  dataFlow: string;
  /** Bullet points describing what I personally did. */
  role: string[];
  /** Optional sections are hidden when empty. */
  decisions: CaseStudyItem[];
  challenges: CaseStudyItem[];
  outcome: string[];
  lessons: string[];
}

export type ProjectStatus = "in-progress";

export interface Project {
  slug: string;
  /** Leave out once the project is complete. */
  status?: ProjectStatus;
  title: string;
  category: string;
  kind: ProjectKind;
  summary: string;
  /** One-line version of my part, shown on the project list. */
  role: string;
  stack: string[];
  /** Architecture stages, in order. Labels also drive the compact strip. */
  stages: PipelineNode[];
  caseStudy: CaseStudy;
  repoUrl: string;
}

export interface SkillGroup {
  id: string;
  title: string;
  items: string[];
  note?: string;
}

export interface SkillDetail {
  usedFor: string;
  /** Project slugs. */
  projects: string[];
  /** ExperienceItem ids. */
  roles: string[];
}

export interface FlowStage {
  label: string;
  text: string;
}

export interface FlowScenario {
  id: string;
  label: string;
  prompt: string;
  stages: FlowStage[];
}
