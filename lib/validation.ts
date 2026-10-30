import { isRecord } from "@/lib/utils";

export const CONTACT_LIMITS = { name: 80, email: 120, message: 4000 } as const;

export interface ContactData {
  name: string;
  email: string;
  message: string;
}

export type ContactField = keyof ContactData;

export type ContactValidation =
  | { ok: true; data: ContactData }
  | { ok: false; spam: true }
  | { ok: false; spam?: false; errors: Partial<Record<ContactField, string>> };

/** Removes control characters (keeping tabs and newlines), trims and caps length. */
export function sanitizeText(value: unknown, max: number): string {
  if (typeof value !== "string") return "";
  const cleaned = Array.from(value)
    .filter((char) => {
      const code = char.charCodeAt(0);
      return code === 9 || code === 10 || (code >= 32 && code !== 127);
    })
    .join("");
  return cleaned.trim().slice(0, max);
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateContact(input: unknown): ContactValidation {
  if (!isRecord(input)) return { ok: false, errors: { message: "Invalid request." } };

  // Hidden honeypot field: real visitors never fill it in.
  if (typeof input.website === "string" && input.website.trim() !== "") {
    return { ok: false, spam: true };
  }

  const name = sanitizeText(input.name, CONTACT_LIMITS.name).replace(/\s+/g, " ");
  const email = sanitizeText(input.email, CONTACT_LIMITS.email);
  const message = sanitizeText(input.message, CONTACT_LIMITS.message);

  const errors: Partial<Record<ContactField, string>> = {};
  if (name.length < 2) errors.name = "Please enter your name.";
  if (!EMAIL_PATTERN.test(email)) errors.email = "Please enter a valid email address.";
  if (message.length < 10) errors.message = "Please write at least a short sentence.";

  if (Object.keys(errors).length > 0) return { ok: false, errors };
  return { ok: true, data: { name, email, message } };
}
