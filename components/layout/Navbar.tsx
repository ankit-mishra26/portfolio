"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, LazyMotion, domAnimation, m } from "framer-motion";
import { Menu, X } from "lucide-react";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { PaletteButton } from "@/components/features/OverlayTriggers";

const SECTION_IDS = siteConfig.nav.map((item) => item.href.replace("/#", ""));

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const elements = SECTION_IDS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => el !== null,
    );
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <LazyMotion features={domAnimation}>
      <header className="sticky top-0 z-50 border-b border-line/70 bg-bg/80 backdrop-blur-md">
        <nav
          aria-label="Primary"
          className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between px-5 sm:px-8"
        >
          <Link
            href="/"
            className="font-mono text-sm font-medium tracking-tight"
            onClick={() => setOpen(false)}
          >
            Ankit / AM
          </Link>

          <ul className="hidden items-center gap-1 md:flex">
            {siteConfig.nav.map((item) => {
              const isActive = active === item.href.replace("/#", "");
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive ? "location" : undefined}
                    className={cn(
                      "relative rounded-md px-3 py-2 text-sm transition-colors",
                      isActive ? "text-fg" : "text-muted hover:text-fg",
                    )}
                  >
                    {item.label}
                    {isActive ? (
                      <span
                        aria-hidden="true"
                        className="absolute inset-x-3 -bottom-[13px] h-px bg-flow"
                      />
                    ) : null}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-1">
            <PaletteButton />
            <ThemeToggle />
            <Button href={siteConfig.resumePath} download variant="secondary" size="sm">
              Résumé
            </Button>
            <button
              type="button"
              className="ml-1 inline-flex h-9 w-9 items-center justify-center rounded-md text-muted transition-colors hover:text-fg md:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? (
                <X className="h-5 w-5" aria-hidden="true" />
              ) : (
                <Menu className="h-5 w-5" aria-hidden="true" />
              )}
            </button>
          </div>
        </nav>

        <AnimatePresence initial={false}>
          {open ? (
            <m.div
              id="mobile-menu"
              key="mobile-menu"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="overflow-hidden border-t border-line/70 md:hidden"
            >
              <ul className="mx-auto flex max-w-6xl flex-col px-5 py-2 sm:px-8">
                {siteConfig.nav.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="flex h-12 items-center text-base text-fg"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </m.div>
          ) : null}
        </AnimatePresence>
      </header>
    </LazyMotion>
  );
}
