const MONTH_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export type TenureFormat = "decimal" | "years-months";

function parseYearMonth(value: string): { year: number; month: number } {
  const [year, month] = value.split("-").map(Number);
  return { year: year ?? 0, month: month ?? 1 };
}

/** "2025-10" becomes "Oct 2025". */
export function formatMonthYear(value: string): string {
  const { year, month } = parseYearMonth(value);
  return `${MONTH_NAMES[month - 1] ?? ""} ${year}`.trim();
}

/** Whole calendar months from start to end (or to today when end is omitted). */
export function monthsBetween(start: string, end?: string, now: Date = new Date()): number {
  const from = parseYearMonth(start);
  const to = end ? parseYearMonth(end) : { year: now.getFullYear(), month: now.getMonth() + 1 };
  return Math.max(0, (to.year - from.year) * 12 + (to.month - from.month));
}

/**
 * "decimal":      13 months -> "1.1 yrs", 12 -> "1 yr", 8 -> "8 mo"
 * "years-months": 13 months -> "1 yr 1 mo", 12 -> "1 yr", 8 -> "8 mo"
 */
export function formatTenure(months: number, format: TenureFormat): string {
  if (months < 1) return "<1 mo";
  if (months < 12) return `${months} mo`;

  if (format === "decimal") {
    const years = Math.round((months / 12) * 10) / 10;
    return Number.isInteger(years)
      ? `${years} ${years === 1 ? "yr" : "yrs"}`
      : `${years.toFixed(1)} yrs`;
  }

  const years = Math.floor(months / 12);
  const rest = months % 12;
  const yearText = `${years} ${years === 1 ? "yr" : "yrs"}`;
  return rest === 0 ? yearText : `${yearText} ${rest} mo`;
}

/** "Oct 2025 – Present" or "Feb 2025 – Sep 2025". */
export function formatPeriod(item: { startDate: string; endDate?: string }): string {
  const end = item.endDate ? formatMonthYear(item.endDate) : "Present";
  return `${formatMonthYear(item.startDate)} – ${end}`;
}
