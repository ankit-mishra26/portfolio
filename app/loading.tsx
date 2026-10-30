export default function Loading() {
  return (
    <div role="status" aria-live="polite" className="mx-auto flex min-h-[50vh] w-full max-w-6xl items-center px-5 sm:px-8">
      <p className="font-mono text-sm text-muted">Loading…</p>
    </div>
  );
}
