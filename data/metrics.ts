import type { Metric } from "@/types";

/**
 * Every figure here comes from the résumé's work-experience section.
 * Do not add numbers that are not in the résumé.
 * roleId must match an id in data/experience.ts; metrics are grouped under that role.
 */
export const metrics: Metric[] = [
  {
    value: "45+ TB",
    label: "data processed",
    note: "Plus millions of records, through ingestion and validation pipelines on GCP.",
    roleId: "data-engineer",
  },
  {
    value: "8+",
    label: "ML models supported",
    note: "Feature pipelines for bounce prediction, collections (write-off, BKTX) and propensity models.",
    roleId: "data-engineer",
  },
  {
    value: "30%",
    label: "less processing time",
    note: "From redesigning and maintaining Python/SQL ETL pipelines.",
    roleId: "data-engineer",
  },
  {
    value: "25%",
    label: "fewer downstream issues",
    note: "From validation and quality checks inside production pipelines.",
    roleId: "data-engineer",
  },
  {
    value: "35%",
    label: "less repetitive dev work",
    note: "From reusable feature-engineering pipelines shared across models.",
    roleId: "data-engineer",
  },
  {
    value: "18.2% → 16.8%",
    label: "bounce rate",
    note: "A metric I owned, improved through pipeline, data quality and process work.",
    roleId: "data-engineer",
  },
];
