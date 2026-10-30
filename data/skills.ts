import type { SkillDetail, SkillGroup } from "@/types";

export const skillGroups: SkillGroup[] = [
  {
    id: "languages",
    title: "Languages",
    items: ["Python", "Pandas", "NumPy", "SQL"],
  },
  {
    id: "data-engineering",
    title: "Data engineering",
    items: [
      "ETL / ELT pipelines",
      "Multi-source ingestion",
      "SFTP feeds",
      "Batch processing",
      "Workflow automation",
    ],
  },
  {
    id: "cloud",
    title: "Cloud",
    items: ["Google Cloud Platform", "BigQuery", "Cloud Storage", "Vertex AI"],
  },
  {
    id: "quality",
    title: "Data quality & operations",
    items: ["Data validation", "Quality monitoring", "Pipeline troubleshooting", "Optimization"],
  },
  {
    id: "ml",
    title: "ML data pipelines",
    items: ["Feature engineering", "Model-ready data preparation", "Scikit-learn", "TensorFlow"],
    note: "Scikit-learn and TensorFlow come from academic projects.",
  },
  {
    id: "credit-analytics",
    title: "Credit & collections analytics",
    items: [
      "Bounce prediction models",
      "Collections models",
      "Propensity models",
      "DPD calculation",
      "Age analysis",
    ],
    note: "Feature pipelines and scoring support for these model families.",
  },
  {
    id: "reporting",
    title: "Reporting",
    items: ["Looker Studio", "Power BI"],
  },
  {
    id: "exploring",
    title: "Exploring next",
    items: ["Databricks", "Apache Spark", "Delta Lake"],
    note: "Learning, not yet used in production.",
  },
];

/**
 * What each skill was used for, shown in the stack explorer.
 * projects = slugs from data/projects.ts, roles = ids from data/experience.ts.
 * Only list a project or role if the skill was actually used there.
 */
export const skillDetails: Record<string, SkillDetail> = {
  Python: {
    usedFor: "ETL pipelines, validation checks, workflow automation and feature engineering.",
    projects: ["pre-delinquency-management", "model-scoring", "stock-price-forecasting", "customer-churn"],
    roles: ["data-engineer", "internship"],
  },
  Pandas: {
    usedFor: "Cleaning, reshaping and preparing data for analysis and models.",
    projects: ["model-scoring", "stock-price-forecasting", "customer-churn"],
    roles: ["data-engineer", "internship"],
  },
  NumPy: {
    usedFor: "Numeric preprocessing inside feature pipelines.",
    projects: ["model-scoring"],
    roles: ["data-engineer"],
  },
  SQL: {
    usedFor: "Extracting, aggregating and transforming data across tables, including in BigQuery.",
    projects: ["pre-delinquency-management", "model-scoring"],
    roles: ["data-engineer", "internship"],
  },
  "ETL / ELT pipelines": {
    usedFor: "Designing and maintaining the pipelines that ingest, transform and load enterprise data.",
    projects: ["pre-delinquency-management", "model-scoring"],
    roles: ["data-engineer"],
  },
  "Multi-source ingestion": {
    usedFor: "Bringing SFTP feeds and third-party files into one consistent pipeline.",
    projects: ["pre-delinquency-management"],
    roles: ["data-engineer"],
  },
  "SFTP feeds": {
    usedFor: "Receiving recurring data files from external sources and automating their pickup.",
    projects: ["pre-delinquency-management"],
    roles: ["data-engineer"],
  },
  "Batch processing": {
    usedFor: "Scheduled processing of large datasets and recurring file loads.",
    projects: [],
    roles: ["data-engineer"],
  },
  "Workflow automation": {
    usedFor: "Replacing manual data preparation and processing steps with automated jobs.",
    projects: [],
    roles: ["data-engineer", "internship"],
  },
  "Google Cloud Platform": {
    usedFor: "Running data workflows on GCP, with Cloud Storage and BigQuery as the core services.",
    projects: ["pre-delinquency-management", "model-scoring"],
    roles: ["data-engineer"],
  },
  BigQuery: {
    usedFor: "Warehouse for curated tables, large-scale querying and analytics workflows.",
    projects: ["pre-delinquency-management", "model-scoring"],
    roles: ["data-engineer"],
  },
  "Cloud Storage": {
    usedFor: "Staging layer for incoming files before they are loaded and transformed.",
    projects: ["pre-delinquency-management"],
    roles: ["data-engineer"],
  },
  "Vertex AI": {
    usedFor: "Working knowledge of GCP's ML platform, alongside BigQuery and Cloud Storage.",
    projects: [],
    roles: [],
  },
  "Data validation": {
    usedFor: "Checks inside production pipelines that catch bad data before it spreads.",
    projects: ["pre-delinquency-management", "model-scoring"],
    roles: ["data-engineer", "internship"],
  },
  "Quality monitoring": {
    usedFor: "Keeping an eye on data quality so problems surface early.",
    projects: [],
    roles: ["data-engineer"],
  },
  "Pipeline troubleshooting": {
    usedFor: "Diagnosing production pipeline failures and data issues.",
    projects: [],
    roles: ["data-engineer"],
  },
  Optimization: {
    usedFor: "Improving pipeline speed and reliability, which cut processing time by 30%.",
    projects: [],
    roles: ["data-engineer"],
  },
  "Feature engineering": {
    usedFor: "Reusable feature pipelines that prepare data for ML models.",
    projects: ["pre-delinquency-management", "model-scoring", "customer-churn"],
    roles: ["data-engineer"],
  },
  "Model-ready data preparation": {
    usedFor: "Preprocessing and transformation so models receive consistent inputs.",
    projects: ["model-scoring"],
    roles: ["data-engineer"],
  },
  "Scikit-learn": {
    usedFor: "Training and comparing classifiers in an academic churn project.",
    projects: ["customer-churn"],
    roles: [],
  },
  TensorFlow: {
    usedFor: "Building an LSTM forecasting model in an academic project.",
    projects: ["stock-price-forecasting"],
    roles: [],
  },
  "Looker Studio": {
    usedFor: "Reporting and dashboards on top of prepared data.",
    projects: [],
    roles: [],
  },
  "Power BI": {
    usedFor: "Reporting and dashboards, backed by the Amazon Power BI Bootcamp.",
    projects: [],
    roles: [],
  },
  Databricks: {
    usedFor: "Learning it next, to apply my pipeline foundation to lakehouse development.",
    projects: [],
    roles: [],
  },
  "Apache Spark": {
    usedFor: "Learning it next, for distributed data processing. Not yet used in production.",
    projects: [],
    roles: [],
  },
  "Delta Lake": {
    usedFor: "Learning it next, as part of lakehouse development. Not yet used in production.",
    projects: [],
    roles: [],
  },
  "Bounce prediction models": {
    usedFor: "Feature pipelines and scoring for models that predict which customers may miss their next EMI.",
    projects: ["pre-delinquency-management", "model-scoring"],
    roles: ["data-engineer"],
  },
  "Collections models": {
    usedFor: "Feature pipelines and scoring support for the write-off and BKTX collections models. BKTX models estimate whether past-due customers roll into the next delinquency bucket or return to regular payment.",
    projects: ["model-scoring"],
    roles: ["data-engineer"],
  },
  "Propensity models": {
    usedFor: "Feature preparation and scoring support for a propensity model.",
    projects: ["model-scoring"],
    roles: ["data-engineer"],
  },
  "DPD calculation": {
    usedFor: "Calculating how many days past due each personal loan account is. Currently in progress.",
    projects: ["pl-dpd-age-analysis"],
    roles: ["data-engineer"],
  },
  "Age analysis": {
    usedFor: "Grouping overdue personal loan accounts by how long they have been overdue. Currently in progress.",
    projects: ["pl-dpd-age-analysis"],
    roles: ["data-engineer"],
  },
};
