import { buildContext } from "@/lib/knowledge";
import { isRecord } from "@/lib/utils";

/**
 * Optional model-backed answers. Active only when ANTHROPIC_API_KEY is set (server-side).
 * Returns null on any problem so the caller falls back to the deterministic answerer.
 * Only public portfolio facts (lib/knowledge.ts) are ever sent.
 */
export async function askLlm(question: string): Promise<string | null> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return null;

  const system = [
    "You answer visitor questions about Ankit Mishra, a data engineer, using only the facts below.",
    "If the facts do not cover the question, say you do not know and suggest the contact form.",
    "Be concise (under 120 words). Never invent employers, metrics, projects or technologies.",
    "",
    "FACTS:",
    buildContext(),
  ].join("\n");

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: process.env.ASK_MODEL ?? "claude-haiku-5-5",
        max_tokens: 400,
        system,
        messages: [{ role: "user", content: question }],
      }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!response.ok) return null;

    const data: unknown = await response.json();
    if (!isRecord(data) || !Array.isArray(data.content)) return null;
    const first: unknown = data.content[0];
    return isRecord(first) && typeof first.text === "string" && first.text.trim() ? first.text.trim() : null;
  } catch {
    return null;
  }
}
