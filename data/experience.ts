import type { ExperienceItem } from "@/types";

export const experience: ExperienceItem[] = [
  {
    id: "data-engineer",
    role: "Data Engineer",
    organization: "NBFC · Advanced Analytics",
    location: "Bengaluru, India",
    startDate: "2025-10",
    pipeline: [
      {
        id: "files",
        label: "Source files",
        description: "Third-party and enterprise data files are where every run starts.",
      },
      {
        id: "sftp",
        label: "SFTP",
        description: "Feeds are picked up over SFTP and handed to the pipeline.",
      },
      {
        id: "validation",
        label: "Validation",
        description:
          "Structure and quality checks run before data moves on. This work reduced downstream issues by 25%.",
      },
      {
        id: "transformation",
        label: "Transformation",
        description:
          "Python and SQL pipelines clean and reshape the data. Pipeline work reduced processing time by 30%.",
      },
      {
        id: "storage",
        label: "Cloud Storage",
        description: "Google Cloud Storage acts as the staging layer on GCP.",
      },
      {
        id: "bigquery",
        label: "BigQuery",
        description: "Curated tables in BigQuery serve analytics and modelling.",
      },
      {
        id: "features",
        label: "Feature engineering",
        description:
          "Reusable preprocessing and feature pipelines prepare model-ready data, cutting repetitive effort by 35%.",
      },
      {
        id: "models",
        label: "ML models",
        description:
          "The prepared data supports 8+ ML models across bounce prediction, collections and propensity.",
      },
      {
        id: "analytics",
        label: "Analytics",
        description: "Reporting and analysis built on the same trusted data.",
      },
    ],
    bullets: [
      "Designed and maintained scalable Python/SQL ETL pipelines for ingestion, transformation and processing of enterprise datasets, reducing processing time by 30%.",
      "Built and automated workflows across SFTP feeds, third-party data files, BigQuery and Cloud Storage, processing 45+ TB of data and millions of records.",
      "Added data validation and quality checks to production pipelines, reducing downstream processing issues by 25%.",
      "Troubleshot production pipeline failures and data issues, improving pipeline performance and reliability.",
      "Built preprocessing and reusable feature-engineering pipelines supporting 8+ ML models across bounce prediction, collections (write-off, BKTX) and propensity, cutting repetitive development effort by 35%.",
      "Working on DPD (days past due) calculation and age analysis for personal loan customers, and on a new project for credit card revolvers who pay only the minimum due.",
      "Took ownership of the project's bounce-rate metric, driving it from 18.2% to 16.8%.",
    ],
  },
  {
    id: "internship",
    role: "Data Intern",
    organization: "Hari Krishna Solutions",
    location: "Surat, India",
    startDate: "2025-02",
    endDate: "2025-09",
    bullets: [
      "Cleaned, validated and transformed datasets with SQL and Python to support business reporting.",
      "Wrote SQL queries to extract and aggregate data across tables so stakeholders could track key metrics.",
      "Automated routine data preparation in Python, reducing manual effort.",
    ],
  },
];
