import type { Project } from "@/types";
import { socials } from "@/data/socials";

/**
 * TODO: replace each repoUrl with the specific repository once it is public.
 * Work projects are sanitized overviews: no company, customer, column or schema details.
 * Anything listed under "lessons" is reflection, not a metric: edit it freely.
 */
export const projects: Project[] = [
  {
    slug: "pre-delinquency-management",
    title: "Pre-delinquency management",
    category: "Data engineering · ML · Financial analytics",
    kind: "work",
    summary:
      "A data and ML workflow that scores customers by their risk of bouncing on the next EMI, so teams can reach out early.",
    role: "Built the orchestration that runs the whole pipeline as one process, and owned the project's bounce-rate metric (18.2% to 16.8%).",
    stack: ["Python", "SQL", "BigQuery", "Cloud Storage"],
    stages: [
      {
        id: "bureau-data",
        label: "Bureau data",
        description: "Customer repayment history arrives as third-party bureau files.",
      },
      {
        id: "data-scrub",
        label: "Data scrub",
        description:
          "Files are cleaned and checked before anything else runs. Validation was missing here before.",
      },
      {
        id: "feature-processing",
        label: "Feature processing",
        description: "Cleaned data is transformed into model-ready features.",
      },
      {
        id: "bounce-models",
        label: "Bounce prediction models",
        description: "Models score each customer on their chance of missing the next EMI.",
      },
      {
        id: "deciles",
        label: "Decile segmentation",
        description:
          "Customers are ranked into deciles from 1 to 10. Higher deciles carry a higher predicted bounce risk.",
      },
      {
        id: "intervention",
        label: "Intervention",
        description: "Teams can reach out through channels such as call centre, WhatsApp and bots.",
      },
      {
        id: "outcome-tracking",
        label: "Outcome tracking",
        description: "Actual bounces are compared with predicted risk to see what worked.",
      },
    ],
    caseStudy: {
      overview:
        "Pre-delinquency management identifies customers who are more likely to miss their next EMI payment, so teams can contact them before it happens. It combines bureau data processing, feature preparation, ML scoring and outcome tracking. My part was the data side: making the pipeline reliable, repeatable and runnable by one person.",
      glossary: [
        { term: "EMI", meaning: "Equated monthly instalment: the fixed amount a borrower pays each month." },
        { term: "Bounce", meaning: "A missed or failed EMI payment." },
        {
          term: "Decile",
          meaning: "One of ten equal groups customers are ranked into, from lowest to highest predicted risk.",
        },
      ],
      problem: [
        "The pipeline existed as a set of separate scripts, each written differently. Nothing validated the data between steps, and every run needed manual intervention.",
        "Running it took three senior colleagues, and each run depended on someone being there to step in.",
      ],
      dataFlow:
        "Bureau files are validated and cleaned, turned into features, scored by the models, grouped into deciles and handed to the teams who contact customers. Actual outcomes then flow back, so predicted and real bounces can be compared.",
      role: [
        "Wrote an orchestration script that stitched the separate scripts into one pipeline.",
        "Wrapped it with email notifications and logs, so problems are reported and traceable.",
        "Added data validation and quality checks inside the pipeline.",
        "Run it end to end myself, where it previously took three senior colleagues.",
        "Owned the project's bounce-rate metric, taking it from 18.2% to 16.8% through pipeline improvements, data quality enhancements and process optimization.",
      ],
      decisions: [
        {
          title: "One orchestrated run instead of separate scripts",
          body: "Each script worked on its own, but nothing connected them. Combining them into a single run removed the manual hand-offs between steps.",
        },
        {
          title: "Email notifications and logs around every run",
          body: "A pipeline that fails quietly costs more than one that fails loudly. The wrapper adds email notifications and logs, so problems are reported and the logs show where to look.",
        },
        {
          title: "Validate before processing",
          body: "With no checks between steps, bad input travelled all the way to the output. Validation catches it early, where it is cheapest to fix.",
        },
      ],
      challenges: [
        {
          title: "Every script was written differently",
          body: "There was no common structure to build on, so connecting the scripts meant understanding each one first.",
        },
        {
          title: "No validation anywhere",
          body: "Problems only showed up in the output, far from where they started.",
        },
        {
          title: "Manual intervention on every run",
          body: "Steps that needed a person had to be found and automated before the pipeline could run as one process.",
        },
      ],
      outcome: [
        "The pipeline runs as one process that I operate alone. It previously took three senior colleagues.",
        "The bounce-rate metric I owned improved from 18.2% to 16.8%.",
        "Failures are reported by email and traceable through logs.",
      ],
      lessons: [
        "Logging and notifications deserve as much design time as the transformation code. They decide how quickly a problem is found.",
        "Consistent scripts are what make a process easy to hand over.",
      ],
    },
    repoUrl: socials.github.href,
  },
  {
    slug: "model-scoring",
    title: "ML model scoring & feature pipelines",
    category: "ML engineering",
    kind: "work",
    summary:
      "Reusable preprocessing and feature-engineering pipelines that prepare model-ready data, so 8+ ML models can be scored reliably.",
    role: "Built the reusable pipelines and tracked down the failure that used to drop customers, cutting repetitive development effort by 35%.",
    stack: ["Python", "Pandas", "NumPy", "SQL", "BigQuery"],
    stages: [
      {
        id: "raw-data",
        label: "Raw data",
        description: "Source tables and files that the models depend on.",
      },
      {
        id: "dependencies",
        label: "Feature dependencies",
        description: "Each model declares which features it needs, so the pipeline builds only what is required.",
      },
      {
        id: "preprocessing",
        label: "Preprocessing",
        description: "Cleaning, type handling and consistent formats, including date formats.",
      },
      {
        id: "transformation",
        label: "Transformation",
        description: "Aggregations and derived features computed per customer.",
      },
      {
        id: "validation",
        label: "Validation",
        description: "Checks that the feature set is complete before a model sees it.",
      },
      {
        id: "model-input",
        label: "Model input",
        description: "Features are arranged in the exact shape each model expects.",
      },
      {
        id: "scoring",
        label: "Model scoring",
        description: "The trained model runs over the customer population and produces a score for each.",
      },
      {
        id: "output",
        label: "Output",
        description: "Scores are stored for the teams and workflows that use them.",
      },
    ],
    caseStudy: {
      overview:
        "Model scoring means running a trained model over a population of customers to give each one a score. This project is the data layer underneath it: the pipelines that turn raw data into the features each model expects, then feed them in. It supports 8+ models, covering bounce prediction, collections models (write-off and BKTX) and a propensity model.",
      glossary: [
        {
          term: "Bounce prediction",
          meaning: "Estimates how likely a customer is to miss their next EMI payment.",
        },
        {
          term: "BKTX model",
          meaning:
            "A collections model for customers who are already past due. It estimates whether they will roll into the next delinquency bucket, BKT1 (30 to 59 days past due), or return to regular payment, using signals such as past repayment behaviour, salary timing and customer communication data.",
        },
        {
          term: "Propensity model",
          meaning: "Estimates how likely a customer is to take a particular action.",
        },
      ],
      problem: [
        "Scoring itself was the easy part. Feature engineering was where runs broke: it could fail halfway through, or drop thousands of customers during the aggregation stage.",
        "Each failure meant investigating and rerunning, so getting a correct feature set typically took two iterations.",
      ],
      dataFlow:
        "Raw data is checked against each model's feature dependencies, preprocessed and transformed, validated, and passed to the model as input. The model produces scores, which go to downstream consumers.",
      role: [
        "Built reusable preprocessing and feature-engineering pipelines supporting 8+ ML models.",
        "Worked across model families: bounce prediction, collections (write-off and BKTX) and propensity.",
        "Traced the customers going missing in the aggregation stage back to their cause and fixed it.",
        "Reduced repetitive development effort by 35% through reuse.",
      ],
      decisions: [
        {
          title: "Fix the data, not the filter",
          body: "A date-comparison filter appeared to be dropping customers. The filter's logic was correct. The real problem was inconsistent date formats in one column of the source data. Correcting the format with a single line fixed it, and the intended filter logic stayed untouched.",
        },
        {
          title: "Build feature logic once and reuse it",
          body: "Shared pipelines replace per-model scripts, which is where the 35% reduction in repetitive development effort came from.",
        },
      ],
      challenges: [
        {
          title: "Runs failing halfway through",
          body: "A failure partway through wasted the time already spent and forced a rerun.",
        },
        {
          title: "Thousands of customers disappearing at aggregation",
          body: "Records were missing after the aggregation stage. The filter looked like the culprit at first, but its logic was fine. The real cause was the data.",
        },
      ],
      outcome: [
        "A full feature-engineering run now takes around an hour. Before the fix it typically needed two iterations to get right.",
        "The same pipelines support 8+ ML models across bounce prediction, collections and propensity.",
        "Repetitive development effort fell by 35%.",
      ],
      lessons: [
        "When rows disappear, check the data before blaming the logic. The filter was correct. The date column wasn't.",
        "Row counts between stages are the quickest way to see where records go missing.",
      ],
    },
    repoUrl: socials.github.href,
  },
  {
    slug: "pl-dpd-age-analysis",
    status: "in-progress",
    title: "DPD and age analysis for personal loans",
    category: "Data engineering · Credit risk analytics",
    kind: "work",
    summary:
      "Calculating days past due and analysing how long accounts have been overdue for personal loan customers, an unsecured product.",
    role: "Working on the DPD calculation and the age analysis.",
    stack: ["Python", "SQL"],
    stages: [
      {
        id: "accounts",
        label: "Personal loan accounts",
        description: "Repayment records for unsecured personal loan customers.",
      },
      {
        id: "dpd",
        label: "DPD calculation",
        description: "Days past due worked out for each account.",
      },
      {
        id: "age-analysis",
        label: "Age analysis",
        description: "Overdue accounts grouped by how long they have been overdue.",
      },
    ],
    caseStudy: {
      overview:
        "Personal loans are unsecured, so there is no collateral to fall back on when a customer stops paying, which makes close tracking of delinquency important. This analysis calculates DPD (days past due) for personal loan customers and groups overdue accounts by how long they have been overdue. It is separate from the revolver project and still in progress, so this page describes the work rather than results.",
      glossary: [
        { term: "DPD", meaning: "Days past due: how many days a payment is overdue." },
        {
          term: "Age analysis",
          meaning: "Grouping overdue accounts by how long they have been overdue.",
        },
      ],
      problem: [
        "Understanding delinquency on an unsecured product starts with knowing, for every account, how many days past due it is and how long it has been overdue.",
      ],
      dataFlow:
        "Repayment records for personal loan accounts are used to work out days past due, and accounts are then grouped by how long they have been overdue.",
      role: ["Working on the DPD calculation.", "Working on the age analysis."],
      decisions: [],
      challenges: [],
      outcome: ["In progress. No results are claimed yet."],
      lessons: [],
    },
    repoUrl: socials.github.href,
  },
  {
    slug: "revolver-project",
    status: "in-progress",
    title: "Credit card revolver project",
    category: "Data engineering · Financial analytics",
    kind: "work",
    summary:
      "A new project that looks at customers who pay only the minimum due on credit cards from other lenders, so they can be offered a personal loan to pay off that card debt.",
    role: "Working on the project's data and analysis.",
    stack: ["Python", "SQL"],
    stages: [
      {
        id: "off-us-customers",
        label: "Off-us card customers",
        description: "Customers whose credit cards are with other lenders.",
      },
      {
        id: "revolvers",
        label: "Revolver identification",
        description: "Customers who pay only the minimum due and carry the balance forward.",
      },
      {
        id: "targeting",
        label: "Offer targeting",
        description: "Customers who fit the criteria become candidates for an offer.",
      },
      {
        id: "pl-offer",
        label: "Personal loan offer",
        description: "Eligible customers are offered a personal loan to pay off their card debt.",
      },
    ],
    caseStudy: {
      overview:
        "Many credit card customers pay only the minimum due each month and carry the rest forward, usually at a high interest rate. This project looks at customers like that, whose cards are with other lenders, with the aim of offering them a personal loan to pay off the card debt. It is still in progress, so this page describes the goal and my part rather than results.",
      problem: [
        "Customers who only pay the minimum keep paying high interest while the balance falls slowly.",
        "The business wants to find these customers and make them a relevant personal loan offer.",
      ],
      dataFlow:
        "Customers who revolve their card balance are identified, and the ones who fit are shortlisted for a personal loan offer.",
      role: ["Working on the project's data and analysis."],
      decisions: [],
      challenges: [],
      outcome: ["In progress. No results are claimed yet."],
      lessons: [],
    },
    repoUrl: socials.github.href,
  },
  {
    slug: "stock-price-forecasting",
    title: "Stock price forecasting",
    category: "Machine learning · College project",
    kind: "academic",
    summary:
      "An LSTM model that predicts stock prices from historical data, built while exploring a career as a quant analyst.",
    role: "Individual college project: data preparation, sequence generation, model training and evaluation.",
    stack: ["Python", "TensorFlow", "LSTM", "Pandas"],
    stages: [
      {
        id: "historical-data",
        label: "Historical data",
        description: "A stock price dataset downloaded from Kaggle.",
      },
      {
        id: "preprocessing",
        label: "Preprocessing",
        description: "Cleaning and scaling the price history.",
      },
      {
        id: "sequences",
        label: "Sequence generation",
        description: "Cutting the history into fixed-length windows the LSTM can learn from.",
      },
      {
        id: "lstm",
        label: "LSTM",
        description: "A recurrent neural network trained on the sequences, built with TensorFlow.",
      },
      {
        id: "prediction",
        label: "Prediction",
        description: "The trained model predicts what comes next.",
      },
      {
        id: "evaluation",
        label: "Evaluation",
        description: "Results checked with ROC-AUC and Gini.",
      },
    ],
    caseStudy: {
      overview:
        "A personal project to test whether an LSTM can predict stock prices, built from a Kaggle dataset while I was considering a career as a quant analyst.",
      problem: [
        "The goal was to find out whether historical prices alone give an LSTM enough signal to predict what happens next.",
      ],
      dataFlow:
        "Historical prices are cleaned, cut into fixed-length sequences, fed to an LSTM, and the predictions are evaluated.",
      role: [
        "Sourced the dataset from Kaggle.",
        "Prepared the data and generated the sequences.",
        "Trained the LSTM and evaluated it with ROC-AUC and Gini.",
      ],
      decisions: [
        {
          title: "Evaluate with more than one metric",
          body: "ROC-AUC looked acceptable, but Gini showed that the model's ability to separate outcomes was weak. Checking both is what exposed the problem.",
        },
      ],
      challenges: [
        {
          title: "Weak real performance",
          body: "Despite a reasonable-looking AUC, the model did not perform well once tested properly.",
        },
      ],
      outcome: [
        "The model did not perform well enough to rely on, so I treat this as a learning project rather than a trading model.",
        "No accuracy claim is made for it.",
      ],
      lessons: [
        "A single headline metric can flatter a model. Gini made its weakness visible.",
        "With financial time series, honest evaluation matters more than a good-looking number.",
      ],
    },
    repoUrl: socials.github.href,
  },
  {
    slug: "customer-churn",
    title: "Customer churn prediction",
    category: "Machine learning · College project",
    kind: "academic",
    summary:
      "Compares Logistic Regression and Random Forest for estimating the probability that a customer leaves a service.",
    role: "Individual college project: data preparation, model training and comparison.",
    stack: ["Python", "Pandas", "Scikit-learn", "Logistic Regression", "Random Forest"],
    stages: [
      {
        id: "customer-data",
        label: "Customer data",
        description: "Customer records with a label for whether they left the service.",
      },
      {
        id: "cleaning",
        label: "Cleaning",
        description: "Handling missing values and inconsistent entries.",
      },
      {
        id: "features",
        label: "Feature preparation",
        description: "Encoding and preparing inputs for the models.",
      },
      {
        id: "training",
        label: "Model training",
        description: "Training Logistic Regression and Random Forest models.",
      },
      {
        id: "comparison",
        label: "Model comparison",
        description: "Comparing how well each model estimates churn.",
      },
      {
        id: "prediction",
        label: "Prediction",
        description: "Producing the probability that each customer leaves.",
      },
    ],
    caseStudy: {
      overview:
        "Churn was a new term for me, so I built this to understand it: estimating how likely a customer is to stop using a service.",
      problem: [
        "Businesses want to know which customers are likely to leave, so they can respond before it happens.",
      ],
      dataFlow:
        "Customer data is cleaned and prepared, two models are trained on it, and their churn probabilities are compared.",
      role: [
        "Cleaned and prepared the data.",
        "Trained Logistic Regression and Random Forest models.",
        "Compared the two to see which estimated churn probability better.",
      ],
      decisions: [],
      challenges: [
        {
          title: "Learning an unfamiliar concept",
          body: "Churn was new to me, so the first step was understanding what it measures: the probability that a customer leaves.",
        },
      ],
      outcome: [
        "A working comparison of two models, built as a learning exercise.",
        "No performance figures are claimed.",
      ],
      lessons: ["Understand what the target means in business terms before choosing a model."],
    },
    repoUrl: socials.github.href,
  },
];
