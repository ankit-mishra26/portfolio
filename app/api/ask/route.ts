import { answerFromKnowledge } from "@/lib/ask";
import { askLlm } from "@/lib/llm";
import { rateLimit } from "@/lib/rate-limit";
import { getClientIp, isSameOrigin, readJson } from "@/lib/request";
import { sanitizeText } from "@/lib/validation";
import { isRecord } from "@/lib/utils";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_QUESTION_LENGTH = 300;

export async function POST(request: Request) {
  if (!isSameOrigin(request)) {
    return Response.json({ error: "Forbidden." }, { status: 403 });
  }
  if (!rateLimit(`ask:${getClientIp(request)}`, 20, 10 * 60 * 1000)) {
    return Response.json({ error: "Too many questions. Please try again in a few minutes." }, { status: 429 });
  }

  const body = await readJson(request, 2_000);
  const question = isRecord(body) ? sanitizeText(body.question, MAX_QUESTION_LENGTH) : "";
  if (!question) {
    return Response.json({ error: "Please type a question." }, { status: 422 });
  }

  const modelAnswer = await askLlm(question);
  if (modelAnswer) return Response.json({ answer: modelAnswer, source: "model" });

  const { answer } = answerFromKnowledge(question);
  return Response.json({ answer, source: "knowledge-base" });
}
