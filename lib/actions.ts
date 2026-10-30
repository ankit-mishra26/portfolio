import { siteConfig } from "@/config/site";

export function downloadResume(): void {
  const link = document.createElement("a");
  link.href = siteConfig.resumePath;
  link.download = "";
  document.body.appendChild(link);
  link.click();
  link.remove();
}

export function openExternal(url: string): void {
  if (url.startsWith("mailto:")) {
    window.location.href = url;
    return;
  }
  window.open(url, "_blank", "noopener,noreferrer");
}
