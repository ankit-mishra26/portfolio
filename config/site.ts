import type { NavItem } from "@/types";
import { profile } from "@/data/profile";

const nav: NavItem[] = [
  { label: "Work", href: "/#work" },
  { label: "Experience", href: "/#experience" },
  { label: "Stack", href: "/#stack" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
];

/**
 * Single source of truth for site-wide settings.
 * Update the résumé path here (and replace the PDF in /public/resume).
 */
export const siteConfig = {
  name: "Ankit Mishra",
  title: `${profile.name} — ${profile.titleRoles}`,
  description: profile.seoDescription,
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://regal-dolphin-32970b.netlify.app",
  resumePath: "/resume/Ankit_Mishra_Resume.pdf",
  nav,
};
