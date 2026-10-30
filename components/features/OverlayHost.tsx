"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { OVERLAY_EVENT, type OverlayName } from "@/lib/overlay";

// Loaded only when first opened, so they add nothing to the initial bundle.
const CommandPalette = dynamic(
  () => import("@/components/features/CommandPalette").then((m) => m.CommandPalette),
  { ssr: false },
);
const Terminal = dynamic(() => import("@/components/features/Terminal").then((m) => m.Terminal), {
  ssr: false,
});

/** Listens for Ctrl/Cmd+K and open events, and renders the active overlay. */
export function OverlayHost() {
  const [open, setOpen] = useState<OverlayName | null>(null);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen((current) => (current === "palette" ? null : "palette"));
      }
    };
    const onOpen = (event: Event) => {
      const name = (event as CustomEvent<OverlayName>).detail;
      setOpen(name);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener(OVERLAY_EVENT, onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener(OVERLAY_EVENT, onOpen);
    };
  }, []);

  const close = () => setOpen(null);

  if (open === "palette") return <CommandPalette onClose={close} />;
  if (open === "terminal") return <Terminal onClose={close} />;
  return null;
}
