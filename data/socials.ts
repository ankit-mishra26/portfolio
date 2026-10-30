import type { SocialLink } from "@/types";

export const socials: Record<SocialLink["id"], SocialLink> = {
  github: {
    id: "github",
    label: "GitHub",
    href: "https://github.com/ankit-mishra26",
    handle: "ankit-mishra26",
  },
  linkedin: {
    id: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/ankit-mishra-a2627625b",
    handle: "ankit-mishra-a2627625b",
  },
  email: {
    id: "email",
    label: "Email",
    href: "mailto:ankitmishra.wrk@gmail.com",
    handle: "ankitmishra.wrk@gmail.com",
  },
};
