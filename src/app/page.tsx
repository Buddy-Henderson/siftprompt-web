
import SiftSandbox from '../components/SiftSandbox';

export const metadata = {
  title: 'SiftPrompt | AI Token Optimization & Prompt Minification Engine',
  description: 'Slash LLM API costs by up to 40% with SiftPrompt. A native token optimization engine that strips semantic boilerplate and compresses prompts for RAG, Agents, and Chat.',
  keywords: 'LLM optimization, prompt compression, RAG token reduction, AI API cost savings, SiftPrompt, LLM context window management',
  openGraph: {
    title: 'SiftPrompt: The Token Optimization Engine for LLMs',
    description: 'Reduce context bloat and improve LLM latency.',
    url: 'https://siftprompt.com',
    siteName: 'SiftPrompt',
    type: 'website',
  },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "SiftPrompt",
            "url": "https://siftprompt.com",
            "description": "Professional-grade LLM token optimization engine.",
            "applicationCategory": "DeveloperTool",
            "operatingSystem": "Web"
          })
        }}
      />
      <SiftSandbox />
    </>
  );
}