import type { FlowScenario } from "@/types";

/** A simplified view of how I work through common data problems. */
export const flowScenarios: FlowScenario[] = [
  {
    id: "new-feed",
    label: "A new data feed arrives",
    prompt: "A partner or vendor starts sending files over SFTP.",
    stages: [
      { label: "Ingest", text: "Pick up the files over SFTP and land them in Cloud Storage." },
      { label: "Validate", text: "Check structure, types and completeness before anything is loaded." },
      { label: "Transform", text: "Clean and standardise the data with Python and SQL." },
      { label: "Store", text: "Load curated tables into BigQuery." },
      { label: "Model", text: "Prepare model-ready features wherever a model needs this data." },
      { label: "Analyze", text: "Make the data available for reporting in Looker Studio or Power BI." },
    ],
  },
  {
    id: "pipeline-failure",
    label: "A pipeline fails in production",
    prompt: "A scheduled run breaks, or the numbers stop looking right.",
    stages: [
      { label: "Ingest", text: "Find which feed or run is affected and what changed in the input." },
      { label: "Validate", text: "Compare the data against expected structure and values to isolate bad records." },
      { label: "Transform", text: "Fix the logic or handle the edge case in the Python or SQL step." },
      { label: "Store", text: "Re-run the affected load so the tables are correct again." },
      { label: "Model", text: "Confirm downstream feature pipelines and models received clean data." },
      { label: "Analyze", text: "Add a check so the same issue is caught earlier next time." },
    ],
  },
  {
    id: "model-data",
    label: "A model needs model-ready data",
    prompt: "A data science workflow needs consistent, repeatable features.",
    stages: [
      { label: "Ingest", text: "Identify the source tables and the features each model depends on." },
      { label: "Validate", text: "Check the inputs for gaps, outliers and type problems." },
      { label: "Transform", text: "Build reusable preprocessing and feature logic instead of one-off scripts." },
      { label: "Store", text: "Keep the prepared features where models can read them, such as BigQuery." },
      { label: "Model", text: "Feed the prepared data into the model run." },
      { label: "Analyze", text: "Review the outputs and how the data behaved, then refine the features." },
    ],
  },
];
