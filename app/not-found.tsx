import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] w-full max-w-6xl flex-col items-start justify-center px-5 sm:px-8">
      <p className="font-mono text-sm text-muted">404</p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight">This page doesn&apos;t exist.</h1>
      <p className="mt-3 max-w-md text-muted">
        The link may be outdated, or the page may not be built yet.
      </p>
      <div className="mt-6">
        <Button href="/">Back to home</Button>
      </div>
    </div>
  );
}
