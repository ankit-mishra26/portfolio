"use client";

import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { openOverlay } from "@/lib/overlay";

/** Navbar button that opens the command palette and shows the right shortcut. */
export function PaletteButton() {
  const [shortcut, setShortcut] = useState("Ctrl K");

  useEffect(() => {
    if (/Mac|iPhone|iPad/.test(navigator.platform)) setShortcut("⌘ K");
  }, []);

  return (
    <button
      type="button"
      onClick={() => openOverlay("palette")}
      aria-label="Open command menu"
      className="hidden h-9 items-center gap-2 rounded-md border border-line px-2.5 text-xs text-muted transition-colors hover:border-muted/70 hover:text-fg sm:inline-flex"
    >
      <Search className="h-3.5 w-3.5" aria-hidden="true" />
      <kbd className="font-mono">{shortcut}</kbd>
    </button>
  );
}

/** Footer button for the optional terminal. */
export function TerminalButton() {
  return (
    <button
      type="button"
      onClick={() => openOverlay("terminal")}
      className="font-mono text-sm text-muted transition-colors hover:text-fg"
    >
      &gt;_ terminal
    </button>
  );
}
