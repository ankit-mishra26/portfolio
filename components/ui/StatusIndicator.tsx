export function StatusIndicator({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-2 text-sm text-fg">
      <span className="relative flex h-2 w-2" aria-hidden="true">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ok opacity-60" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-ok" />
      </span>
      {label}
    </span>
  );
}
