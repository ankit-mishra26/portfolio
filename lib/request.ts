export function getClientIp(request: Request): string {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
}

/** Rejects cross-site browser requests. Requests without an Origin header (curl) pass and rely on rate limiting. */
export function isSameOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return true;
  try {
    return new URL(origin).host === request.headers.get("host");
  } catch {
    return false;
  }
}

/** Reads a JSON body with a size cap. Returns undefined when it is missing, too large or invalid. */
export async function readJson(request: Request, maxBytes = 10_000): Promise<unknown> {
  try {
    const raw = await request.text();
    if (raw.length > maxBytes) return undefined;
    return JSON.parse(raw) as unknown;
  } catch {
    return undefined;
  }
}
