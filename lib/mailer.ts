import { socials } from "@/data/socials";
import type { ContactData } from "@/lib/validation";

export type MailResult = "sent" | "not_configured" | "failed";

/**
 * Sends the contact message through Resend's REST API (no SDK needed).
 *
 * Only RESEND_API_KEY is required. Messages go to the email in data/socials.ts
 * unless CONTACT_TO_EMAIL overrides it. To use another provider, replace this function only.
 */
export async function sendContactEmail(data: ContactData): Promise<MailResult> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return "not_configured";

  const to = process.env.CONTACT_TO_EMAIL || socials.email.handle;
  const from = process.env.CONTACT_FROM_EMAIL || "Portfolio <onboarding@resend.dev>";
  const subjectName = data.name.replace(/[\r\n]+/g, " ");

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: data.email,
        subject: `Portfolio message from ${subjectName}`,
        text: `Name: ${data.name}\nEmail: ${data.email}\n\n${data.message}`,
      }),
      signal: AbortSignal.timeout(10_000),
    });

    if (!response.ok) {
      // Visible in Netlify's function logs. Never includes the API key.
      console.error("[contact] Resend rejected the message:", response.status, await response.text().catch(() => ""));
      return "failed";
    }
    return "sent";
  } catch (error) {
    console.error("[contact] Could not reach Resend:", error);
    return "failed";
  }
}
