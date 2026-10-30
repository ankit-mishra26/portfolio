import { buildTopics } from "@/lib/knowledge";

const STOP_WORDS = new Set([
  "a", "an", "the", "is", "are", "does", "do", "did", "he", "his", "him", "ankit", "has", "have",
  "what", "which", "who", "how", "can", "i", "me", "you", "to", "of", "in", "on", "with", "and",
  "or", "tell", "show", "any", "kind", "of", "for", "it", "this", "that", "get", "use", "uses",
]);

function stem(word: string): string {
  return word.length > 3 && word.endsWith("s") && !word.endsWith("ss") ? word.slice(0, -1) : word;
}

/** Lowercases, strips accents and punctuation, drops filler words and plurals. */
export function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((word) => word && !STOP_WORDS.has(word))
    .map(stem)
    .join(" ");
}

export const FALLBACK_ANSWER =
  "I can answer questions about Ankit's experience, data engineering and ML work, projects, tools, education and how to contact him. Try one of the suggested questions, or use the contact form for anything else.";

export interface AnswerResult {
  answer: string;
  matched: boolean;
}

/**
 * Deterministic answerer: scores every topic by keyword hits and returns the best one.
 * Works with no API key. See lib/llm.ts for the optional model-backed path.
 */
export function answerFromKnowledge(question: string, now: Date = new Date()): AnswerResult {
  const padded = ` ${normalize(question)} `;
  if (padded.trim() === "") return { answer: FALLBACK_ANSWER, matched: false };

  let best: { score: number; answer: string } | null = null;
  for (const topic of buildTopics(now)) {
    let score = 0;
    for (const keyword of topic.keywords) {
      const normalized = normalize(keyword);
      if (normalized && padded.includes(` ${normalized} `)) {
        score += normalized.split(" ").length + 1;
      }
    }
    if (score > 0 && (!best || score > best.score)) best = { score, answer: topic.answer };
  }

  return best && best.answer.trim() ? { answer: best.answer, matched: true } : { answer: FALLBACK_ANSWER, matched: false };
}
