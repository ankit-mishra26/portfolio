# Final QA checklist

Run through this before sharing the link with recruiters.

## Content and confidentiality
- [ ] Search the whole project for your employer's name, any internal system or table names, and customer details. Nothing should appear. (VS Code: Ctrl+Shift+F.)
- [ ] Every number on the site is on your résumé or confirmed by you (`data/metrics.ts`, `data/experience.ts`).
- [ ] No accuracy or performance figures are claimed for the college projects.
- [ ] In-progress projects are marked "In progress" and claim no results.
- [ ] Read "Lessons learned" on each case study. Keep only what you would say in an interview.
- [ ] Replace each project's `repoUrl` with the real repo once public (`data/projects.ts`).
- [ ] Fill in the diploma institution in `data/profile.ts` (hidden until then).
- [ ] The résumé PDF in `public/resume/` matches the website.

## Functionality
- [ ] Nav links, buttons and footer links all work; no dead links
- [ ] Mobile menu opens, closes with Escape and after choosing a link
- [ ] Theme toggle persists; no flash of the wrong theme on refresh
- [ ] Pipeline in the hero: click and hover work; pauses on hover
- [ ] Experience "Show the data pipeline" expands and collapses
- [ ] Data-flow explorer and stack explorer respond to clicks and keyboard
- [ ] Command palette (Ctrl+K), terminal, Ask Ankit, contact form all work
- [ ] Contact form: empty submit shows field errors; valid submit shows success
- [ ] Experience timer shows the expected value (hero, status panel, timeline)

## Layout
- [ ] No horizontal scrolling at 360px, 768px, 1280px and 1920px widths
- [ ] Nothing overlaps; text is readable in both themes
- [ ] Long email address does not overflow on mobile (Contact section)

## Accessibility
- [ ] Tab through the whole page: focus is always visible and order is logical
- [ ] The "Skip to content" link appears on first Tab press
- [ ] Open the command palette and terminal with the keyboard only; Escape closes them and focus returns
- [ ] With the OS "reduce motion" setting on, particles and auto-advance stop but everything still works
- [ ] Run Lighthouse Accessibility and fix anything flagged
- [ ] Optional: try a screen reader (NVDA on Windows) on the hero and a case study page

## Performance and SEO (Lighthouse)
Run in Chrome Incognito, on the deployed site, mobile mode: DevTools, then Lighthouse.
Targets: Performance 90+, Accessibility 95+, Best Practices 95+, SEO 95+.
- [ ] Performance on mobile meets target (re-run 2 or 3 times; scores vary)
- [ ] Page title and description look right in the SEO audit
- [ ] Link preview image appears in LinkedIn Post Inspector
- [ ] Structured data validates in Google's Rich Results Test (Person and Breadcrumb)
- [ ] `/sitemap.xml` lists the home page, `/projects` and each case study

## Security
- [ ] `.env.local` is not in the repository
- [ ] API keys exist only in Netlify environment variables
- [ ] Contact form rejects an empty or malformed submission server-side
