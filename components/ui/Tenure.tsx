import { formatTenure, monthsBetween, type TenureFormat } from "@/lib/tenure";
import { LiveTenure } from "@/components/ui/LiveTenure";

interface TenureProps {
  /** "YYYY-MM" */
  since: string;
  /** "YYYY-MM". When given, the duration is fixed (a finished role). */
  until?: string;
  format?: TenureFormat;
}

/**
 * Time since a start month. For an ongoing role it recalculates in the visitor's
 * browser, so the site never needs a redeploy for the number to stay correct.
 */
export function Tenure({ since, until, format = "decimal" }: TenureProps) {
  const text = formatTenure(monthsBetween(since, until), format);
  if (until) return <span>{text}</span>;
  return <LiveTenure since={since} format={format} initial={text} />;
}
