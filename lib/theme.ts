export function toggleTheme(): void {
  const next = !document.documentElement.classList.contains("dark");
  document.documentElement.classList.toggle("dark", next);
  try {
    localStorage.setItem("theme", next ? "dark" : "light");
  } catch {
    /* storage can be unavailable; the theme still changes for this visit */
  }
}
