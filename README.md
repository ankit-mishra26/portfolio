# Ankit Mishra: portfolio

A Next.js (App Router) + TypeScript + Tailwind portfolio styled as a data-engineering "control room".
This repository contains **Phases 1–6**: design system, navbar, animated hero pipeline, grouped metrics, project rows with
architecture strips, an expandable experience pipeline, an interactive data-flow explorer, a clickable stack explorer a case-study page for every project (`/projects/[slug]`), a Ctrl+K command palette, an optional terminal, cached GitHub activity, a contact form and the Ask Ankit assistant.

## Stack

Next.js 15, React 19, TypeScript (strict), Tailwind CSS 3, Framer Motion (LazyMotion), Lucide icons, Geist fonts.
SVG/CSS for diagrams. No database, auth, CMS or state library.

## Docs

- `docs/DEPLOYMENT.md`: step-by-step Netlify deployment, environment variables, verification.
- `docs/QA-CHECKLIST.md`: pre-launch checks for content, accessibility, Lighthouse and security.

## Run locally

```bash
npm install
cp .env.example .env.local
npm run dev          # http://localhost:3000
npm run typecheck    # tsc --noEmit
npm run lint
npm run build && npm start
```

## Deploy

Push to GitHub and import the repo in Vercel (or Netlify with the Next.js runtime).
Set `NEXT_PUBLIC_SITE_URL` to your final domain.

## Update content (no component edits needed)

| What | File |
|---|---|
| Name, headline, intro, status panel, education, certifications | `data/profile.ts` |
| Work history, bullets, expandable pipeline (set `current: true` on the role you hold now) | `data/experience.ts` |
| Résumé metrics (only numbers on your résumé; each has a `roleId`) | `data/metrics.ts` |
| Projects, case-study text, architecture stages, GitHub repo links | `data/projects.ts` (replace each `repoUrl`; case pages are generated automatically) |
| Skills, groups, and per-skill details for the stack explorer | `data/skills.ts` |
| Starting points for the data-flow explorer | `data/flows.ts` |
| Hero pipeline: general stages plus a real "in practice" example each (edit only `inPractice` when you change jobs) | `data/pipeline.ts` |
| GitHub / LinkedIn / email (GitHub activity and Ask Ankit read from here) | `data/socials.ts` |
| What you are looking for next (shown in Ask Ankit) | `lookingFor` in `data/profile.ts` |
| Résumé file | replace `public/resume/Ankit_Mishra_Resume.pdf`, or change `resumePath` in `config/site.ts` |
| Site title, description, nav, URL | `config/site.ts` |

## Content rules baked in

- The current employer is never named; it appears only as "NBFC".
- No academic-project accuracy figures are shown.
- No model-ownership claims; the only owned metric is the bounce rate stated on the résumé.
- Work projects are sanitized overviews with no customer data, schemas or internal URLs.

## Features added in phases 4 and 5

- **Command palette:** press Ctrl+K (⌘K on Mac) or use the search button in the navbar. Commands are built from your data files. Loaded only when first opened.
- **Terminal:** the `>_ terminal` button in the footer, or "Open terminal" in the palette. Commands: help, about, projects, skills, experience, contact, resume, theme, clear, exit.
- **GitHub activity:** server-fetched from the public API and cached for an hour. If GitHub is unreachable the section shows a fallback with a link, and the page still works. `GITHUB_TOKEN` is optional.
- **Contact form:** validated again on the server, with a honeypot field, a same-origin check and a rate limit. Delivery uses Resend: you only need `RESEND_API_KEY` (messages go to the email in `data/socials.ts`; `CONTACT_TO_EMAIL` is an optional override). Without the key, local dev logs messages to the terminal and production shows an "email me directly" fallback.
- **Ask Ankit:** answers come from your public data files (`lib/knowledge.ts`), so updating the site updates the assistant. It works with no API key. Set `ANTHROPIC_API_KEY` to get model-written answers grounded in the same facts. It falls back to the built-in answers on any error.

## Experience timer

Experience shown in the hero and status panel is calculated from `careerStart` in `data/profile.ts`
(your first full-time month, `"YYYY-MM"`). Each role's duration comes from its `startDate` and optional `endDate`.
The number updates in the visitor's browser, so you never need to edit or redeploy as months pass.
Format: Oct 2025 to Oct 2026 shows "1 yr", Nov 2026 shows "1.1 yrs" (hero) or "1 yr 1 mo" (status panel and timeline).

## Changing jobs

1. In `data/experience.ts`, give the old role an `endDate` ("YYYY-MM"), and add the new role at the top with a `startDate` and no `endDate`. The role without an `endDate` is treated as current.
2. Keep `careerStart` unchanged. It marks your first full-time job, so total experience keeps counting.
3. Update `data/profile.ts` (role, headline, intro, status panel, footer line, SEO text).
4. Add new metrics to `data/metrics.ts` using the new role's id as `roleId`.
5. Add projects to `data/projects.ts` (use `status: "in-progress"` for unfinished work), new skills to `data/skills.ts` with a `skillDetails` entry each.
6. Replace the résumé PDF. No component edits needed.
