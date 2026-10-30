import type { PipelineNode } from "@/types";

/**
 * The general data lifecycle, plus one real example per stage.
 * `description` stays the same for any job. Change only `inPractice` when you move companies.
 * Keep examples free of internal system names.
 */
export const pipelineNodes: PipelineNode[] = [
  {
    id: "source",
    label: "Source",
    description: "Data starts in files, databases, APIs or feeds owned by other teams or vendors.",
    inPractice: "Third-party and enterprise data files.",
  },
  {
    id: "ingest",
    label: "Ingest",
    description: "Pipelines pull the data in, on a schedule or as it arrives, and land it safely.",
    inPractice: "Python jobs picking up SFTP feeds and staging them in Cloud Storage.",
  },
  {
    id: "validate",
    label: "Validate",
    description: "Checks on structure, completeness and quality run before the data moves on.",
    inPractice: "Validation checks in production pipelines, which cut downstream issues by 25%.",
  },
  {
    id: "transform",
    label: "Transform",
    description: "Cleaning, joining and reshaping turn raw records into consistent, usable data.",
    inPractice: "Python and SQL transformations, tuned to cut processing time by 30%.",
  },
  {
    id: "store",
    label: "Store",
    description: "Curated data lands in a warehouse or lake that other people can rely on.",
    inPractice: "BigQuery tables, with Cloud Storage as the staging layer.",
  },
  {
    id: "model",
    label: "Model",
    description: "Feature pipelines prepare model-ready data, and models run on top of it.",
    inPractice: "Feature pipelines and scoring support for 8+ ML models.",
  },
  {
    id: "decide",
    label: "Decide",
    description: "Reports and predictions feed the decisions people actually make.",
    inPractice: "Reporting in Looker Studio and Power BI.",
  },
];
