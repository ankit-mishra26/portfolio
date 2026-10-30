"use client";

import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from "react";
import { useRouter } from "next/navigation";
import { Modal } from "@/components/ui/Modal";
import { downloadResume } from "@/lib/actions";
import { runCommand, type TerminalLine } from "@/lib/terminal";
import { toggleTheme } from "@/lib/theme";
import { cn } from "@/lib/utils";

const WELCOME: TerminalLine[] = [{ text: 'Welcome. Type "help" to list commands.' }];

export function Terminal({ onClose }: { onClose: () => void }) {
  const router = useRouter();
  const [lines, setLines] = useState<TerminalLine[]>(WELCOME);
  const [value, setValue] = useState("");
  const history = useRef<string[]>([]);
  const cursor = useRef(0);
  const logRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = logRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines]);

  function submit(event: FormEvent) {
    event.preventDefault();
    const command = value.trim();
    setValue("");
    if (!command) return;

    history.current.push(command);
    cursor.current = history.current.length;

    const result = runCommand(command);
    if (result.action === "clear") {
      setLines([]);
      return;
    }
    setLines((current) => [...current, { text: command, input: true }, ...result.lines]);

    if (result.action === "exit") onClose();
    if (result.action === "resume") downloadResume();
    if (result.action === "theme") toggleTheme();
  }

  function onKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "ArrowUp") {
      event.preventDefault();
      cursor.current = Math.max(0, cursor.current - 1);
      setValue(history.current[cursor.current] ?? "");
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      cursor.current = Math.min(history.current.length, cursor.current + 1);
      setValue(history.current[cursor.current] ?? "");
    }
  }

  function openLink(href: string) {
    if (href.startsWith("/")) {
      onClose();
      router.push(href);
    } else if (href.startsWith("mailto:")) {
      window.location.href = href;
    } else {
      window.open(href, "_blank", "noopener,noreferrer");
    }
  }

  return (
    <Modal label="Terminal" onClose={onClose} className="max-w-2xl">
      <div className="flex items-center justify-between border-b border-line px-4 py-2.5">
        <span className="font-mono text-xs text-muted">terminal</span>
        <button
          type="button"
          onClick={onClose}
          className="rounded px-2 py-1 font-mono text-xs text-muted transition-colors hover:text-fg"
        >
          esc
        </button>
      </div>

      <div
        ref={logRef}
        role="log"
        aria-label="Terminal output"
        aria-live="polite"
        tabIndex={0}
        className="min-h-[14rem] flex-1 overflow-y-auto px-4 py-3 font-mono text-sm"
      >
        {lines.map((line, index) => (
          <div key={index} className={cn("whitespace-pre-wrap break-words py-0.5", line.input ? "text-flow" : "text-muted")}>
            {line.input ? "> " : null}
            {line.href ? (
              <button
                type="button"
                onClick={() => openLink(line.href as string)}
                className="text-left text-fg underline decoration-line underline-offset-4 transition-colors hover:text-flow"
              >
                {line.text}
              </button>
            ) : (
              line.text
            )}
          </div>
        ))}
      </div>

      <form onSubmit={submit} className="flex items-center gap-2 border-t border-line px-4 py-3">
        <label htmlFor="terminal-input" className="font-mono text-sm text-flow">
          &gt;
        </label>
        <input
          id="terminal-input"
          data-autofocus
          value={value}
          onChange={(event) => setValue(event.target.value)}
          onKeyDown={onKeyDown}
          autoComplete="off"
          autoCapitalize="off"
          spellCheck={false}
          aria-label="Type a command"
          className="min-w-0 flex-1 bg-transparent font-mono text-sm text-fg placeholder:text-muted"
          placeholder="help"
        />
      </form>
    </Modal>
  );
}
