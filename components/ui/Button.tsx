import Link from "next/link";
import type { ReactNode } from "react";
import { cn, isExternalHref } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md";

interface ButtonProps {
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  download?: boolean;
  className?: string;
}

const base =
  "inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors whitespace-nowrap";

const variants: Record<Variant, string> = {
  primary: "bg-fg text-bg hover:bg-fg/85",
  secondary: "border border-line bg-surface text-fg hover:border-muted/70",
  ghost: "text-muted hover:text-fg",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-3 text-sm",
  md: "h-11 px-5 text-sm",
};

export function Button({
  href,
  children,
  variant = "primary",
  size = "md",
  download = false,
  className,
}: ButtonProps) {
  const classes = cn(base, variants[variant], sizes[size], className);

  if (download) {
    return (
      <a href={href} download className={classes}>
        {children}
      </a>
    );
  }

  if (isExternalHref(href)) {
    const isMail = href.startsWith("mailto:");
    return (
      <a
        href={href}
        className={classes}
        {...(isMail ? {} : { target: "_blank", rel: "noopener noreferrer" })}
      >
        {children}
        {isMail ? null : <span className="sr-only"> (opens in a new tab)</span>}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
