import { siteConfig } from "@/config/site";

/** Short, shareable link: yoursite.com/resume */
export function GET() {
  return new Response(null, { status: 307, headers: { Location: siteConfig.resumePath } });
}
