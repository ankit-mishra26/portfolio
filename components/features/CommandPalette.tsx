"use client";

import { useEffect, useMemo, useRef, useState, type KeyboardEvent } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { Modal } from "@/components/ui/Modal";
import { projects } from "@/data/projects";
import { socials } from "@/data/socials";
import { downloadResume, openExternal } from "@/lib/actions";
import { openOverlay } from "@/lib/overlay";
import { toggleTheme } from "@/lib/theme";
import { cn } from "@/lib/utils";

interface Command {
  id: string;
  group: "Navigate" | "Projects" | "Links" | "Actions";
  label: string;
  keywords?: string;
  run: () => void;
}

const GROUP_ORDER: Command["group"][] = ["Navigate", "Projects", "Links", "Actions"];

export function CommandPalette({ onClose }: { onClose: () => void }) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const listRef = useRef<HTMLUListElement>(null);

  const commands = useMemo<Command[]>(() => {
    const go = (href: string) => () => router.push(href);
    return [
      { id: "projects", group: "Navigate", label: "Go to Projects", keywords: "work systems", run: go("/#work") },
      { id: "experience", group: "Navigate", label: "Go to Experience", keywords: "career jobs", run: go("/#experience") },
      { id: "skills", group: "Navigate", label: "Go to Skills", keywords: "stack tech tools", run: go("/#stack") },
      { id: "github-activity", group: "Navigate", label: "Go to GitHub activity", keywords: "repos", run: go("/#github") },
      { id: "ask", group: "Navigate", label: "Ask Ankit", keywords: "assistant questions chat", run: go("/#ask") },
      { id: "contact", group: "Navigate", label: "Contact Ankit", keywords: "email message hire", run: go("/#contact") },
      { id: "all-projects", group: "Projects", label: "All projects", keywords: "case studies", run: go("/projects") },
      ...projects.map<Command>((project) => ({
        id: `project-${project.slug}`,
        group: "Projects",
        label: project.title,
        keywords: `case study ${project.category} ${project.stack.join(" ")}`,
        run: go(`/projects/${project.slug}`),
      })),
      { id: "resume", group: "Links", label: "Download résumé", keywords: "cv pdf", run: downloadResume },
      { id: "github", group: "Links", label: "Open GitHub", keywords: "code repositories", run: () => openExternal(socials.github.href) },
      { id: "linkedin", group: "Links", label: "Open LinkedIn", keywords: "profile", run: () => openExternal(socials.linkedin.href) },
      { id: "email", group: "Links", label: "Send an email", keywords: "mail", run: () => openExternal(socials.email.href) },
      { id: "theme", group: "Actions", label: "Switch theme", keywords: "dark light mode", run: toggleTheme },
      { id: "terminal", group: "Actions", label: "Open terminal", keywords: "console commands", run: () => openOverlay("terminal") },
    ];
  }, [router]);

  const filtered = useMemo(() => {
    const words = query.toLowerCase().split(/\s+/).filter(Boolean);
    const matches = commands.filter((command) => {
      const haystack = `${command.label} ${command.keywords ?? ""}`.toLowerCase();
      return words.every((word) => haystack.includes(word));
    });
    return GROUP_ORDER.flatMap((group) => matches.filter((command) => command.group === group));
  }, [commands, query]);

  useEffect(() => setActive(0), [query]);

  useEffect(() => {
    const id = filtered[active]?.id;
    if (id) listRef.current?.querySelector(`#cmd-${id}`)?.scrollIntoView({ block: "nearest" });
  }, [active, filtered]);

  function execute(command: Command | undefined) {
    if (!command) return;
    onClose();
    command.run();
  }

  function onKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActive((current) => (filtered.length === 0 ? 0 : (current + 1) % filtered.length));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActive((current) => (filtered.length === 0 ? 0 : (current - 1 + filtered.length) % filtered.length));
    } else if (event.key === "Enter") {
      event.preventDefault();
      execute(filtered[active]);
    }
  }

  const activeCommand = filtered[active];
  const activeId = activeCommand ? `cmd-${activeCommand.id}` : undefined;
  let lastGroup = "";

  return (
    <Modal label="Command menu" onClose={onClose}>
      <div className="flex items-center gap-3 border-b border-line px-4">
        <Search className="h-4 w-4 shrink-0 text-muted" aria-hidden="true" />
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onKeyDown={onKeyDown}
          data-autofocus
          role="combobox"
          aria-expanded="true"
          aria-controls="palette-list"
          aria-activedescendant={activeId}
          aria-label="Search commands"
          placeholder="Type a command or search…"
          autoComplete="off"
          spellCheck={false}
          className="h-12 min-w-0 flex-1 bg-transparent text-sm text-fg placeholder:text-muted"
        />
        <kbd className="hidden rounded border border-line px-1.5 py-0.5 font-mono text-[11px] text-muted sm:block">esc</kbd>
      </div>

      <ul id="palette-list" ref={listRef} role="listbox" aria-label="Commands" className="flex-1 overflow-y-auto p-2">
        {filtered.length === 0 ? (
          <li role="presentation" className="px-3 py-6 text-center text-sm text-muted">
            No matching commands.
          </li>
        ) : null}
        {filtered.map((command, index) => {
          const showGroup = command.group !== lastGroup;
          lastGroup = command.group;
          return (
            <li key={command.id} role="presentation">
              {showGroup ? (
                <p className="px-3 pb-1 pt-3 font-mono text-[11px] text-muted">{command.group}</p>
              ) : null}
              <div
                id={`cmd-${command.id}`}
                role="option"
                aria-selected={index === active}
                onMouseMove={() => setActive(index)}
                onClick={() => execute(command)}
                className={cn(
                  "cursor-pointer rounded-md px-3 py-2 text-sm",
                  index === active ? "bg-raised text-fg" : "text-muted",
                )}
              >
                {command.label}
              </div>
            </li>
          );
        })}
      </ul>
    </Modal>
  );
}
