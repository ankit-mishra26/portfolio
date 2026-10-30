import type { ReactNode } from "react";

interface SectionProps {
  id: string;
  title: string;
  description?: string;
  children: ReactNode;
}

export function Section({ id, title, description, children }: SectionProps) {
  const headingId = `${id}-heading`;
  return (
    <section id={id} aria-labelledby={headingId} className="scroll-mt-16 py-16 sm:py-24">
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <header className="mb-10 max-w-2xl">
          <h2 id={headingId} className="text-2xl font-semibold tracking-tight sm:text-3xl">
            {title}
          </h2>
          {description ? <p className="mt-3 text-muted">{description}</p> : null}
        </header>
        {children}
      </div>
    </section>
  );
}
