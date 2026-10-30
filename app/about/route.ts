/** Convenience URL that sends visitors to the matching home-page section. */
export function GET() {
  return new Response(null, { status: 307, headers: { Location: "/#about" } });
}
