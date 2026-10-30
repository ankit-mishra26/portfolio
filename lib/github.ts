import { socials } from "@/data/socials";
import { isRecord } from "@/lib/utils";

export interface GitHubRepo {
  name: string;
  description: string | null;
  url: string;
  language: string | null;
  stars: number;
  pushedAt: string;
}

export interface GitHubSummary {
  username: string;
  publicRepos: number;
  totalStars: number;
  languages: Array<{ name: string; count: number }>;
  recent: GitHubRepo[];
}

const API = "https://api.github.com";
const REVALIDATE_SECONDS = 3600;

async function fetchJson(path: string): Promise<unknown> {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "User-Agent": "portfolio-site",
  };
  // Optional, server-only. Raises the rate limit; never sent to the browser.
  if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;

  const response = await fetch(`${API}${path}`, {
    headers,
    next: { revalidate: REVALIDATE_SECONDS },
    signal: AbortSignal.timeout(5000),
  });
  if (!response.ok) throw new Error(`GitHub responded with ${response.status}`);
  return response.json();
}

function toRepo(value: unknown): GitHubRepo | null {
  if (!isRecord(value)) return null;
  const { name, html_url, description, language, stargazers_count, pushed_at, fork } = value;
  if (fork === true) return null;
  if (typeof name !== "string" || typeof html_url !== "string" || typeof pushed_at !== "string") return null;
  return {
    name,
    url: html_url,
    description: typeof description === "string" ? description : null,
    language: typeof language === "string" ? language : null,
    stars: typeof stargazers_count === "number" ? stargazers_count : 0,
    pushedAt: pushed_at,
  };
}

/** Cached for an hour. Returns null on any failure so the page never breaks. */
export async function getGitHubSummary(): Promise<GitHubSummary | null> {
  const username = socials.github.handle;
  try {
    const [user, repoList] = await Promise.all([
      fetchJson(`/users/${username}`),
      fetchJson(`/users/${username}/repos?sort=pushed&per_page=100`),
    ]);
    if (!isRecord(user) || !Array.isArray(repoList)) return null;

    const repos = repoList.map(toRepo).filter((repo): repo is GitHubRepo => repo !== null);
    const languageCounts = new Map<string, number>();
    for (const repo of repos) {
      if (repo.language) languageCounts.set(repo.language, (languageCounts.get(repo.language) ?? 0) + 1);
    }

    return {
      username,
      publicRepos: typeof user.public_repos === "number" ? user.public_repos : repos.length,
      totalStars: repos.reduce((sum, repo) => sum + repo.stars, 0),
      languages: Array.from(languageCounts, ([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 5),
      recent: repos.slice(0, 4),
    };
  } catch {
    return null;
  }
}
