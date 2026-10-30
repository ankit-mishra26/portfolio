"use client";

import { Button } from "@/components/ui/Button";

export default function ErrorPage({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="mx-auto flex min-h-[60vh] w-full max-w-6xl flex-col items-start justify-center px-5 sm:px-8">
      <p className="font-mono text-sm text-muted">Error</p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight">Something went wrong.</h1>
      <p className="mt-3 max-w-md text-muted">
        The page failed to load. Try again, or go back to the home page.
      </p>
      <div className="mt-6 flex gap-3">
        <button
          type="button"
          onClick={reset}
          className="inline-flex h-11 items-center rounded-md bg-fg px-5 text-sm font-medium text-bg transition-colors hover:bg-fg/85"
        >
          Try again
        </button>
        <Button href="/" variant="secondary">
          Home
        </Button>
      </div>
    </div>
  );
}
