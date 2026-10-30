"use client";

import { useEffect, useState } from "react";
import { formatTenure, monthsBetween, type TenureFormat } from "@/lib/tenure";

interface LiveTenureProps {
  since: string;
  format: TenureFormat;
  /** Text computed when the page was built. It matches the server HTML, then the browser updates it. */
  initial: string;
}

export function LiveTenure({ since, format, initial }: LiveTenureProps) {
  const [text, setText] = useState(initial);

  useEffect(() => {
    setText(formatTenure(monthsBetween(since), format));
  }, [since, format]);

  return <span>{text}</span>;
}
