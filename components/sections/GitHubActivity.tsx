import { ArrowUpRight, Star } from "lucide-react";
import { socials } from "@/data/socials";
import { getGitHubSummary } from "@/lib/github";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";

function formatUpdated(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", { month: "short", year: "numeric", timeZone: "UTC" });
}

export async function GitHubActivity() {
  const summary = await getGitHubSummary();

  return (
    <Section id="github" title="GitHub activity" description="Public repositories, refreshed hourly.">
      {!summary ? (
        <div className="rounded-xl border border-line bg-surface/60 p-6">
          <p className="text-sm text-muted">GitHub activity is temporarily unavailable.</p>
          <div className="mt-4">
            <Button href={socials.github.href} variant="secondary">
              Visit GitHub
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Button>
          </div>
        </div>
      ) : summary.publicRepos === 0 ? (
        <div className="rounded-xl border border-line bg-surface/60 p-6">
          <p className="text-sm text-muted">No public repositories yet. Projects will appear here as they are published.</p>
          <div className="mt-4">
            <Button href={socials.github.href} variant="secondary">
              Visit GitHub
            </Button>
          </div>
        </div>
      ) : (
        <div className="grid gap-10 lg:grid-cols-12">
          <dl className="grid grid-cols-2 gap-6 lg:col-span-4 lg:grid-cols-1">
            <div className="border-l border-line pl-4">
              <dt className="text-sm text-muted">public repositories</dt>
              <dd className="mt-1 font-mono text-2xl">{summary.publicRepos}</dd>
            </div>
            <div className="border-l border-line pl-4">
              <dt className="text-sm text-muted">stars received</dt>
              <dd className="mt-1 font-mono text-2xl">{summary.totalStars}</dd>
            </div>
            {summary.languages.length > 0 ? (
              <div className="col-span-2 border-l border-line pl-4 lg:col-span-1">
                <dt className="text-sm text-muted">main languages</dt>
                <dd className="mt-2 flex flex-wrap gap-2">
                  {summary.languages.map((language) => (
                    <Badge key={language.name}>{language.name}</Badge>
                  ))}
                </dd>
              </div>
            ) : null}
          </dl>

          <div className="lg:col-span-8">
            <h3 className="text-sm font-medium">Recently updated</h3>
            <ul className="mt-4 divide-y divide-line border-y border-line">
              {summary.recent.map((repo) => (
                <li key={repo.name} className="py-4">
                  <a
                    href={repo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-1 font-medium transition-colors hover:text-flow"
                  >
                    {repo.name}
                    <ArrowUpRight className="h-4 w-4 text-muted group-hover:text-flow" aria-hidden="true" />
                  </a>
                  {repo.description ? <p className="mt-1 text-sm text-muted">{repo.description}</p> : null}
                  <p className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-xs text-muted">
                    {repo.language ? <span>{repo.language}</span> : null}
                    <span className="inline-flex items-center gap-1">
                      <Star className="h-3 w-3" aria-hidden="true" />
                      {repo.stars}
                    </span>
                    <span>Updated {formatUpdated(repo.pushedAt)}</span>
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </Section>
  );
}
