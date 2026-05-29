export interface DocsSectionContent {
  title: string;
  description: string;
  // Allows text blocks or key headers to be rendered explicitly
  contentHtml?: React.ReactNode; 
}

export const DOCS_DATA: Record<string, DocsSectionContent> = {
  'getting-started': {
    title: "Getting Started",
    description: "Welcome to SiftPrompt. Our core processing cluster optimizes large linguistic structures natively, reducing context windows down by up to 40% before they stream to your target LLM models.",
  },
  'profiles': {
    title: "Compression Modes",
    description: "SiftPrompt optimizes character strings according to the architectural intentions of your prompt setup. Use the mode property in your request body to change behavior:",
  },
  'api-reference': {
    title: "Ingestion API Reference",
    description: "Submit raw character string payloads directly to our global optimization endpoint via a standard securely structured JSON POST request.",
  },
  'analytics-api': {
    title: "Analytics Export API Reference",
    description: "Export compiled log counts, calculate systematic storage bandwidth metrics, and compile real-time telemetry datasets directly into your external user tools or custom admin interfaces using our standard secure JSON data gateway.",
  },
  'sdks': {
    title: "SDKs & Libraries",
    description: "Integrate SiftPrompt directly into your codebase using our official language-specific packages.",
  },
  'security': {
    title: "Authentication & Security",
    description: "Understand how SiftPrompt protects your data and manages access.",
  },
  'errors': {
    title: "Error Handling",
    description: "How to interpret and handle API responses when requests fail.",
  },
  'best-practices': {
    title: "Best Practices",
    description: "Strategies for maximizing compression performance and maintaining LLM context integrity.",
  },
  'change-log': {
    title: "Changelog",
    description: "Tracking all updates, improvements, and fixes for the SiftCore SDK.",
  },
  'glossary': {
    title: "Glossary",
    description: "Key terminology used throughout SiftPrompt and the wider LLM ecosystem.",
  }
};