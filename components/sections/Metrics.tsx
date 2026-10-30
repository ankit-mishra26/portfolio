import { experience } from "@/data/experience";
import { metrics } from "@/data/metrics";
import { formatPeriod } from "@/lib/tenure";

export function Metrics() {
  const groups = experience
    .map((role) => ({ role, items: metrics.filter((metric) => metric.roleId === role.id) }))
    .filter((group) => group.items.length > 0);

  return (
    <section aria-labelledby="metrics-heading" className="border-y border-line bg-surface/40">
      <div className="mx-auto w-full max-w-6xl px-5 py-12 sm:px-8 sm:py-16">
        <h2 id="metrics-heading" className="text-lg font-semibold tracking-tight">
          Results from production work
        </h2>

        <div className="mt-8 space-y-12">
          {groups.map(({ role, items }) => (
            <div key={role.id}>
              <h3 className="text-sm text-muted">
                {role.role}, {role.organization}
                <span className="ml-2 font-mono text-xs">
                  {formatPeriod(role)}
                </span>
              </h3>
              <dl className="mt-6 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((metric) => (
                  <div key={metric.label} className="border-l border-line pl-4">
                    <dt className="text-sm text-muted">{metric.label}</dt>
                    <dd className="mt-1">
                      <span className="block font-mono text-2xl font-medium tracking-tight">
                        {metric.value}
                      </span>
                      <span className="mt-1 block text-sm text-muted">{metric.note}</span>
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          ))}
        </div>

        <p className="mt-10 max-w-2xl text-xs text-muted">
          Figures describe my work on specific pipelines and projects, not company-wide results.
        </p>
      </div>
    </section>
  );
}
