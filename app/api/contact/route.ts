import { sendContactEmail } from "@/lib/mailer";
import { rateLimit } from "@/lib/rate-limit";
import { getClientIp, isSameOrigin, readJson } from "@/lib/request";
import { validateContact } from "@/lib/validation";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  if (!isSameOrigin(request)) {
    return Response.json({ error: "Forbidden." }, { status: 403 });
  }

  if (!rateLimit(`contact:${getClientIp(request)}`, 5, 10 * 60 * 1000)) {
    return Response.json({ error: "Too many messages. Please try again in a few minutes." }, { status: 429 });
  }

  const body = await readJson(request);
  if (body === undefined) {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  const result = validateContact(body);
  if (!result.ok) {
    // Bots get a fake success so they do not learn the honeypot exists.
    if (result.spam) return Response.json({ ok: true });
    return Response.json({ error: "Please check the highlighted fields.", errors: result.errors }, { status: 422 });
  }

  const status = await sendContactEmail(result.data);
  if (status === "sent") return Response.json({ ok: true });

  if (status === "not_configured") {
    if (process.env.NODE_ENV !== "production") {
      // Lets you test the form locally without email credentials.
      console.info("[contact] Email is not configured. Message received:", result.data);
      return Response.json({ ok: true });
    }
    return Response.json({ error: "The contact form is not set up yet.", code: "not_configured" }, { status: 503 });
  }

  return Response.json({ error: "Your message could not be sent right now.", code: "failed" }, { status: 502 });
}
