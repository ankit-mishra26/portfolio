"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { Section } from "@/components/ui/Section";
import { socials } from "@/data/socials";
import { cn, isRecord } from "@/lib/utils";

interface ChatMessage {
  id: number;
  role: "user" | "assistant";
  text: string;
}

const SUGGESTIONS = [
  "Tell me about his Data Engineering experience",
  "Which cloud technologies does he use?",
  "Show me his ML projects",
  "Does he work with BigQuery?",
  "How can I contact him?",
];

export function AskAnkit() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [value, setValue] = useState("");
  const [pending, setPending] = useState(false);
  const nextId = useRef(1);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messages.length > 0) endRef.current?.scrollIntoView({ block: "nearest" });
  }, [messages, pending]);

  function push(role: ChatMessage["role"], text: string) {
    setMessages((current) => [...current, { id: nextId.current++, role, text }]);
  }

  async function ask(question: string) {
    const trimmed = question.trim();
    if (!trimmed || pending) return;
    push("user", trimmed);
    setValue("");
    setPending(true);

    try {
      const response = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: trimmed }),
      });
      const data: unknown = await response.json().catch(() => null);
      if (response.ok && isRecord(data) && typeof data.answer === "string") {
        push("assistant", data.answer);
      } else if (isRecord(data) && typeof data.error === "string") {
        push("assistant", data.error);
      } else {
        push("assistant", `That did not work. You can email ${socials.email.handle} instead.`);
      }
    } catch {
      push("assistant", `I could not reach the server. You can email ${socials.email.handle} instead.`);
    } finally {
      setPending(false);
    }
  }

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    void ask(value);
  }

  return (
    <Section
      id="ask"
      title="Ask Ankit"
      description="Questions about his experience, projects and stack, answered from the public content on this site."
    >
      <div className="max-w-3xl rounded-xl border border-line bg-surface/60 p-5 sm:p-6">
        <ul className="flex flex-wrap gap-2" aria-label="Suggested questions">
          {SUGGESTIONS.map((suggestion) => (
            <li key={suggestion}>
              <button
                type="button"
                onClick={() => void ask(suggestion)}
                disabled={pending}
                className="rounded-md border border-line px-3 py-1.5 text-left text-xs text-muted transition-colors hover:border-muted/70 hover:text-fg disabled:opacity-60"
              >
                {suggestion}
              </button>
            </li>
          ))}
        </ul>

        <div
          role="log"
          aria-label="Conversation"
          aria-live="polite"
          className={cn("mt-5 space-y-4", messages.length > 0 && "max-h-96 overflow-y-auto pr-1")}
        >
          {messages.map((message) => (
            <div key={message.id} className={message.role === "user" ? "text-right" : undefined}>
              <p className="font-mono text-[11px] text-muted">{message.role === "user" ? "You" : "Ask Ankit"}</p>
              <p
                className={cn(
                  "mt-1 inline-block max-w-full whitespace-pre-wrap break-words rounded-lg px-3 py-2 text-left text-sm",
                  message.role === "user" ? "bg-raised" : "border border-line",
                )}
              >
                {message.text}
              </p>
            </div>
          ))}
          {pending ? <p className="font-mono text-xs text-muted">Thinking…</p> : null}
          <div ref={endRef} />
        </div>

        <form onSubmit={onSubmit} className="mt-5 flex gap-2">
          <label htmlFor="ask-input" className="sr-only">
            Your question
          </label>
          <input
            id="ask-input"
            value={value}
            onChange={(event) => setValue(event.target.value)}
            maxLength={300}
            placeholder="Ask about his experience, projects or tools"
            autoComplete="off"
            className="min-w-0 flex-1 rounded-md border border-line bg-bg px-3 py-2.5 text-sm text-fg placeholder:text-muted focus:border-flow/60"
          />
          <button
            type="submit"
            disabled={pending || value.trim() === ""}
            className="inline-flex h-11 items-center rounded-md bg-fg px-5 text-sm font-medium text-bg transition-colors hover:bg-fg/85 disabled:opacity-50"
          >
            Ask
          </button>
        </form>
        <p className="mt-3 text-xs text-muted">
          Answers come only from the public portfolio content. For anything else, use the contact form.
        </p>
      </div>
    </Section>
  );
}
