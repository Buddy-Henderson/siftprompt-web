'use client';

import React, { useState, useEffect } from 'react';
import { DOCS_DATA } from '@/app/data/docs';

export default function DocsPage() {
  const [activeSection, setActiveSection] = useState('getting-started');
  const [activeLang, setActiveLang] = useState('curl');
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const apiKey = "sift_live_9381kdjf923847293847dfjksh";
  const apiUrl = typeof window !== 'undefined' ? `${window.location.origin}/api/v1/analytics` : 'http://siftprompt/api/v1/analytics';

  // Synchronize state with incoming URL crawler query parameters
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const sectionParam = params.get('section');
      if (sectionParam && DOCS_DATA[sectionParam]) {
        setActiveSection(sectionParam);
      }
    }
  }, []);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2000);
  };

  const curlCode = `curl -X GET "${apiUrl}" \\\n  -H "Authorization: Bearer ${apiKey}"`;
  const nodeCode = `const fetchAnalytics = async () => {\n  const response = await fetch('${apiUrl}', {\n    method: 'GET',\n    headers: {\n      'Authorization': 'Bearer ${apiKey}'\n    }\n  });\n  \n  const result = await response.json();\n  console.log("Total Tokens Saved:", result.stats.tokens_saved);\n};`;
  const pythonCode = `import requests\n\nurl = "${apiUrl}"\nheaders = {\n    "Authorization": "Bearer ${apiKey}"\n}\n\nresponse = requests.get(url, headers=headers)\ndata = response.json()\nprint(f"Total Tokens Saved: {data['stats']['tokens_saved']}")`;

  // Fetch meta info from standalone configuration file module
  const currentDocMeta = DOCS_DATA[activeSection] || DOCS_DATA['getting-started'];

  // Programmatic Search Engine Structural Metadata Map
  const baseUrl = 'https://siftprompt.com';
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Docs",
        "item": `${baseUrl}/docs`
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": currentDocMeta.title,
        "item": `${baseUrl}/docs?section=${activeSection}`
      }
    ]
  };

  return (
    <>
      {/* Dynamic SEO JSON-LD Crawl Script Tracking Node */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <div className="w-full min-h-[calc(100vh-64px)] bg-[#09090b] text-zinc-100 selection:bg-emerald-500/30">
        <div className="max-w-7xl mx-auto w-full px-6 py-12 font-sans flex flex-col md:flex-row gap-12 items-start">
          
          {/* LEFT SIDEBAR NAVIGATION */}
          <aside className="w-full md:w-64 sticky top-24 shrink-0 border-b md:border-b-0 md:border-r border-zinc-800 pb-6 md:pb-0 md:pr-6">
            <div className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-4">// Documentation</div>
            <nav className="flex flex-row md:flex-col gap-2 overflow-x-auto md:overflow-x-visible pb-2 md:pb-0 font-mono text-xs">
              {Object.keys(DOCS_DATA).map((key) => (
                <button
                  key={key}
                  onClick={() => {
                    setActiveSection(key);
                    // Push state history to track browser navigation updates cleanly
                    window.history.pushState(null, '', `/docs?section=${key}`);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-md transition whitespace-nowrap ${
                    activeSection === key ? 'bg-zinc-900 text-emerald-400 font-bold border border-zinc-800' : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  {DOCS_DATA[key].title}
                </button>
              ))}
            </nav>
          </aside>

          {/* RIGHT MAIN DOCUMENTATION CANVAS */}
          <main className="flex-1 max-w-3xl w-full space-y-4">
            
            {/* Visual Header Navigation Trail */}
            <div className="font-mono text-[10px] text-zinc-600 mb-2 select-none">
              docs / <span className="text-emerald-500">{activeSection}</span>
            </div>

            {/* Standard Meta Content Render Framework Row */}
            <div className="animate-in fade-in duration-200 mb-6">
              <h1 className="text-3xl font-extrabold text-white tracking-tight mb-2">
                {currentDocMeta.title}
              </h1>
              <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                {currentDocMeta.description}
              </p>
            </div>

            {/* INTERACTIVE CUSTOM DATA SUB-VIEWS MARKUP */}
            {activeSection === 'getting-started' && (
              <div className="animate-in fade-in duration-200">
                <h2 className="text-lg font-bold text-zinc-200 mb-3 font-mono">Authentication</h2>
                <p className="text-zinc-400 text-sm mb-4 leading-relaxed">
                  All processing streams authenticate securely via the RapidAPI edge network. Before initiating a payload request, ensure you have subscribed to a tier on our official hub panel and retrieved your access keys.
                </p>
                <div className="border border-zinc-800 bg-zinc-950 rounded-xl p-4 font-mono text-xs text-zinc-400 leading-relaxed">
                  <span className="text-zinc-500">// Required request headers</span>
                  <br />
                  <span className="text-emerald-400">"x-rapidapi-host"</span>: "sift6.p.rapidapi.com"
                  <br />
                  <span className="text-emerald-400">"x-rapidapi-key"</span>: "YOUR_SUBSCRIBER_KEY"
                </div>
              </div>
            )}

            {activeSection === 'profiles' && (
              <div className="animate-in fade-in duration-200 space-y-4">
                <div className="border border-zinc-900 bg-zinc-950/40 rounded-xl p-4">
                  <h3 className="text-sm font-bold font-mono text-emerald-400 mb-1">CHAT</h3>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    Strips down standard lexical redundancies, duplicate filler articles, and conversational boilerplate formatting. Ideal for conversational agents where prompt memory length grows over time.
                  </p>
                </div>
                <div className="border border-zinc-900 bg-zinc-950/40 rounded-xl p-4">
                  <h3 className="text-sm font-bold font-mono text-emerald-400 mb-1">RAG</h3>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    Tailored explicitly for Retrieval-Augmented Generation context blocks. It aggressively drops overlapping sentence structures and repetitive stop-words from loaded documentation data, ensuring vital system parameters are clearly readable.
                  </p>
                </div>
                <div className="border border-zinc-900 bg-zinc-950/40 rounded-xl p-4">
                  <h3 className="text-sm font-bold font-mono text-emerald-400 mb-1">AGENT</h3>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    Optimized for multi-turn autonomous loops, ReAct chains, and tool-calling runtimes. It targets and condenses verbose step-by-step reasoning scratchpads and redundant system-state logs while ensuring thought parameters, JSON definitions, and tool arguments remain perfectly uncorrupted.
                  </p>
                </div>
                <div className="border border-zinc-900 bg-zinc-950/40 rounded-xl p-4">
                  <h3 className="text-sm font-bold font-mono text-emerald-400 mb-1">CODEGEN</h3>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    Scripting optimization engine. It strips out source code comments, trailing micro-carriage line returns, and multi-whitespace formatting tabs without breaking the functional integrity or execution flow of your code syntax.
                  </p>
                </div>
              </div>
            )}

            {activeSection === 'api-reference' && (
              <div className="animate-in fade-in duration-200">
                <h2 className="text-xs font-mono text-zinc-500 uppercase tracking-wider mb-2">Endpoint URL</h2>
                <div className="bg-zinc-950 border border-zinc-800 p-3 rounded-lg font-mono text-xs text-zinc-200 mb-6 flex items-center gap-2">
                  <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-1.5 py-0.5 rounded font-bold">POST</span>
                  <span>https://sift6.p.rapidapi.com/api/v1/compress</span>
                </div>

                <h2 className="text-sm font-bold text-zinc-200 mb-3 font-mono">JSON Body Parameters</h2>
                <table className="w-full text-left text-xs font-mono border-collapse mb-8">
                  <thead>
                    <tr className="border-b border-zinc-800 text-zinc-500">
                      <th className="pb-2 font-medium">Field</th>
                      <th className="pb-2 font-medium">Type</th>
                      <th className="pb-2 font-medium">Description</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-900 text-zinc-400">
                    <tr>
                      <td className="py-3 font-bold text-zinc-200">text</td>
                      <td className="py-3 text-zinc-500">string</td>
                      <td className="py-3 text-zinc-400">The raw input text or prompt string to be compressed. <span className="text-zinc-600">(Required)</span></td>
                    </tr>
                    <tr>
                      <td className="py-3 font-bold text-zinc-200">mode</td>
                      <td className="py-3 text-zinc-500">string</td>
                      <td className="py-3 text-zinc-400">Optimization strategy. Options: <code className="text-emerald-400">"chat"</code> | <code className="text-emerald-400">"rag"</code> | <code className="text-emerald-400">"agent"</code> | <code className="text-emerald-400">"codegen"</code>. Default is <code className="text-zinc-500">"chat"</code>.</td>
                    </tr>
                    <tr>
                      <td className="py-3 font-bold text-zinc-200">language</td>
                      <td className="py-3 text-zinc-500">string</td>
                      <td className="py-3 text-zinc-400">Two-letter language identifier code structure. Default is <code className="text-zinc-500">"en"</code>.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}

            {activeSection === 'analytics-api' && (
              <div className="animate-in fade-in duration-200 space-y-8">
                <div className="bg-zinc-950 border border-zinc-900 rounded-xl p-5 space-y-4 font-mono text-xs">
                  <div>
                    <span className="text-zinc-500 block mb-1.5">// SECURE GET TARGET GATEWAY</span>
                    <div className="bg-black border border-zinc-850 p-3 rounded-lg text-zinc-200 flex items-center gap-3 break-all">
                      <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded font-bold uppercase">GET</span>
                      <span>{apiUrl}</span>
                    </div>
                  </div>

                  <div>
                    <span className="text-zinc-500 block mb-1.5">// REQUIRED INTEGRATION KEY HEADER</span>
                    <div className="flex gap-2">
                      <div className="bg-black border border-zinc-850 p-3 rounded-lg text-zinc-400 flex-1 flex items-center gap-2">
                        <span className="text-zinc-600">Authorization:</span>
                        <span className="text-zinc-300">Bearer {apiKey.substring(0, 15)}...</span>
                      </div>
                      <button 
                        onClick={() => copyToClipboard(`Authorization: Bearer ${apiKey}`, 'header')}
                        className="bg-zinc-900 border border-zinc-850 px-4 rounded-lg text-xs hover:bg-zinc-800 text-zinc-300 transition shrink-0"
                      >
                        {copiedText === 'header' ? 'Copied Header!' : 'Copy Header'}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between border-b border-zinc-900 pb-2">
                    <h2 className="text-sm font-bold text-zinc-200 font-mono tracking-tight flex items-center gap-2">
                      Client Implementation Snippets
                    </h2>
                    <div className="flex gap-1.5 font-mono text-[10px]">
                      {['curl', 'node', 'python'].map((lang) => (
                        <button
                          key={lang}
                          onClick={() => setActiveLang(lang)}
                          className={`px-2 py-0.5 rounded uppercase border font-bold transition ${
                            activeLang === lang 
                              ? 'bg-zinc-900 text-emerald-400 border-zinc-800' 
                              : 'text-zinc-500 border-transparent hover:text-zinc-300'
                          }`}
                        >
                          {lang === 'node' ? 'Node.js' : lang}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="relative group">
                    <button
                      onClick={() => {
                        const code = activeLang === 'curl' ? curlCode : activeLang === 'node' ? nodeCode : pythonCode;
                        copyToClipboard(code, 'snippet');
                      }}
                      className="absolute top-3 right-3 opacity-60 group-hover:opacity-100 bg-zinc-950/80 border border-zinc-800 px-2.5 py-1 rounded text-[10px] font-mono text-zinc-400 hover:text-white transition"
                    >
                      {copiedText === 'snippet' ? 'Copied!' : 'Copy Code'}
                    </button>

                    {activeLang === 'curl' && (
                      <pre className="bg-black border border-zinc-900 text-emerald-400 p-4 rounded-xl font-mono text-xs overflow-x-auto leading-relaxed">
                        {curlCode}
                      </pre>
                    )}
                    {activeLang === 'node' && (
                      <pre className="bg-black border border-zinc-900 text-zinc-300 p-4 rounded-xl font-mono text-xs overflow-x-auto leading-relaxed">
                        {nodeCode}
                      </pre>
                    )}
                    {activeLang === 'python' && (
                      <pre className="bg-black border border-zinc-900 text-zinc-300 p-4 rounded-xl font-mono text-xs overflow-x-auto leading-relaxed">
                        {pythonCode}
                      </pre>
                    )}
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <h2 className="text-sm font-bold text-zinc-200 font-mono tracking-tight flex items-center gap-2">
                      Expected Response Format Schema
                    </h2>
                  </div>
                  <pre className="bg-black border border-zinc-900 text-amber-500/90 p-4 rounded-xl font-mono text-xs overflow-x-auto leading-relaxed">
{`{
  "object": "analytics_summary",
  "meta": {
    "total_records": 16,
    "retrieved_at": "${new Date().toISOString()}"
  },
  "stats": {
    "tokens_ingested": 48250,
    "tokens_optimized": 31100,
    "tokens_saved": 17150,
    "avg_compression_percentage": 35.54,
    "avg_latency_ms": 1.62
  },
  "data": [
    {
      "mode": "codegen",
      "original_token_count": 84,
      "optimized_token_count": 42,
      "saved_tokens": 42,
      "execution_time_ms": 2,
      "source_language": "en",
      "logged_at": "2026-05-26T20:50:00.000Z"
    }
  ]
}`}
                  </pre>
                </div>
              </div>
            )}

            {activeSection === 'sdks' && (
              <div className="animate-in fade-in duration-200 space-y-8">
                <div className="border border-zinc-900 bg-zinc-950/40 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-white mb-2">sift-core (Python)</h3>
                  <p className="text-xs text-zinc-400 mb-4">Official Python SDK for matrix-based prompt optimization.</p>
                  <div className="bg-black p-3 rounded-lg font-mono text-xs text-emerald-400 mb-4">pip install sift-core</div>
                  <a href="https://pypi.org/project/sift-core/" className="text-emerald-400 text-xs font-mono hover:underline">View on PyPI →</a>
                </div>

                <div className="space-y-3">
                  <h3 className="text-sm font-bold text-zinc-200 font-mono">Python Quick Start</h3>
                  <pre className="bg-black border border-zinc-900 text-zinc-300 p-4 rounded-xl font-mono text-xs overflow-x-auto leading-relaxed">
            {`from sift import SiftClient

            # Initialize the client
            client = SiftClient(api_key="YOUR_API_KEY")

            # Compress a prompt
            compressed = client.compress("Your long prompt text here...", mode="chat")
            print(compressed)`}
                  </pre>
                </div>

                <div className="border border-zinc-900 bg-zinc-950/40 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-white mb-2">sift-node (Node.js)</h3>
                  <p className="text-xs text-zinc-400 mb-4">Official Node.js client for seamless integration with JavaScript/TypeScript runtimes.</p>
                  <div className="bg-black p-3 rounded-lg font-mono text-xs text-emerald-400 mb-4">npm install sift-node</div>
                  <a href="#" className="text-emerald-400 text-xs font-mono hover:underline">View on GitHub →</a>
                </div>

                <div className="space-y-3">
                  <h3 className="text-sm font-bold text-zinc-200 font-mono">Node.js Quick Start</h3>
                  <pre className="bg-black border border-zinc-900 text-zinc-300 p-4 rounded-xl font-mono text-xs overflow-x-auto leading-relaxed">
            {`import { SiftClient } from 'sift-node';

            // Initialize the client
            const client = new SiftClient({ apiKey: 'YOUR_API_KEY' });

            // Compress a prompt
            const compressed = await client.compress('Your long prompt text here...', { mode: 'chat' });
            console.log(compressed);`}
                  </pre>
                </div>
              </div> 
            )}

            {activeSection === 'security' && (
              <div className="animate-in fade-in duration-200 space-y-10">
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-white">API Authentication</h3>
                  <p className="text-sm text-zinc-400 leading-relaxed">
                    All requests to the SiftPrompt API must be authenticated using your API Key.
                  </p>
                  <div className="bg-black border border-zinc-900 rounded-xl p-5 font-mono text-xs text-emerald-400">
                    Authorization: Bearer YOUR_API_KEY
                  </div>
                  <p className="text-xs text-zinc-500 italic">
                    * Never hardcode your API key in client-side code. Use environment variables.
                  </p>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-white">Data Privacy & Retention</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="border border-zinc-900 bg-zinc-950/40 p-5 rounded-xl">
                      <h4 className="text-white font-bold mb-2">Stateless Processing</h4>
                      <p className="text-xs text-zinc-400 leading-relaxed">
                        Your prompts and compressed outputs are processed in-memory. Once the request is complete, the data is discarded.
                      </p>
                    </div>
                    <div className="border border-zinc-900 bg-zinc-950/40 p-5 rounded-xl">
                      <h4 className="text-white font-bold mb-2">No Data Training</h4>
                      <p className="text-xs text-zinc-400 leading-relaxed">
                        We strictly do not use your prompts or outputs to train or improve any underlying models.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border border-zinc-900 rounded-xl p-6 bg-zinc-900/20">
                  <h3 className="text-sm font-bold text-zinc-200 mb-4">Traffic Security Flow</h3>
                  <p className="text-xs text-zinc-400 mb-6">All data transit is secured via TLS 1.3 encryption.</p>
                </div>
              </div>
            )}

            {activeSection === 'errors' && (
              <div className="animate-in fade-in duration-200 space-y-10">
                <div className="overflow-hidden border border-zinc-900 rounded-xl">
                  <table className="w-full text-left text-xs text-zinc-400">
                    <thead className="bg-zinc-950/50 text-zinc-200">
                      <tr>
                        <th className="px-6 py-4 font-bold">Status Code</th>
                        <th className="px-6 py-4 font-bold">Error Type</th>
                        <th className="px-6 py-4 font-bold">Description</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-900">
                      <tr>
                        <td className="px-6 py-4 font-mono text-amber-400">400</td>
                        <td className="px-6 py-4 font-bold text-white">Bad Request</td>
                        <td className="px-6 py-4">The input prompt is empty or exceeds maximum size limits.</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 font-mono text-amber-400">401</td>
                        <td className="px-6 py-4 font-bold text-white">Unauthorized</td>
                        <td className="px-6 py-4">API key is missing, invalid, or has been revoked.</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 font-mono text-amber-400">429</td>
                        <td className="px-6 py-4 font-bold text-white">Rate Limited</td>
                        <td className="px-6 py-4">Too many requests. Please implement exponential backoff.</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 font-mono text-amber-400">500</td>
                        <td className="px-6 py-4 font-bold text-white">Server Error</td>
                        <td className="px-6 py-4">An unexpected issue occurred on our end. Please try again.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-white">Handling 429 Errors</h3>
                  <p className="text-sm text-zinc-400 leading-relaxed">
                    If you receive a <code className="text-emerald-400 font-mono">429 Rate Limited</code> error, wait before retrying. We recommend an <strong>exponential backoff</strong> strategy: wait 1s, then 2s, then 4s, etc.
                  </p>
                  <div className="bg-black border border-zinc-900 rounded-xl p-5 font-mono text-xs text-emerald-400">
            {`# Example backoff logic in Python
            import time

            def request_with_backoff(retries=3):
                for i in range(retries):
                    response = call_sift_api()
                    if response.status_code == 429:
                        time.sleep(2 ** i)
                        continue
                    return response`}
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-white">Error Response Schema</h3>
                  <p className="text-sm text-zinc-400 leading-relaxed">
                    When an API request fails, the response includes a standardized JSON body to help you diagnose the issue programmatically.
                  </p>
                  <pre className="bg-black border border-zinc-900 text-zinc-300 p-4 rounded-xl font-mono text-xs overflow-x-auto leading-relaxed">
            {`{
              "status": 401,
              "error": "unauthorized",
              "message": "The provided API key is missing or invalid.",
              "request_id": "req_882934kfjsd"
            }`}
                  </pre>
                  <p className="text-xs text-zinc-500">
                    * Always log the <code className="text-zinc-300">request_id</code> if you need to contact support for help with a specific failed call.
                  </p>
                </div>
              </div>
            )}

            {activeSection === 'best-practices' && (
              <div className="animate-in fade-in duration-200 space-y-10">
                <div className="space-y-6">
                  <div className="border-l-2 border-emerald-500 pl-4">
                    <h3 className="text-md font-bold text-white mb-2">1. Choose the Right Mode</h3>
                    <p className="text-sm text-zinc-400 leading-relaxed">
                      Don't use <code className="text-emerald-400">CHAT</code> for code. Matching your compression mode to the content type prevents "over-optimization" where essential syntax might be stripped.
                    </p>
                  </div>

                  <div className="border-l-2 border-emerald-500 pl-4">
                    <h3 className="text-md font-bold text-white mb-2">2. Compress Late, Not Early</h3>
                    <p className="text-sm text-zinc-400 leading-relaxed">
                      Compress your context just before it streams to the LLM. If you perform multiple transformations (like RAG retrieval or formatting) before compression, you maintain the highest fidelity possible.
                    </p>
                  </div>

                  <div className="border-l-2 border-emerald-500 pl-4">
                    <h3 className="text-md font-bold text-white mb-2">3. Preserve System Prompts</h3>
                    <p className="text-sm text-zinc-400 leading-relaxed">
                      Avoid compressing your core system instructions. These define the persona and rules of your LLM; instead, compress the dynamic user input and historical context.
                    </p>
                  </div>

                  <div className="border-l-2 border-emerald-500 pl-4">
                    <h3 className="text-md font-bold text-white mb-2">4. Measure and Monitor</h3>
                    <p className="text-sm text-zinc-400 leading-relaxed">
                      Use the <code className="text-zinc-300">Analytics Export API</code> to track the average compression percentage. If your savings drop significantly, it may indicate your input data structure has changed.
                    </p>
                  </div>
                </div>

                <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-6">
                  <h3 className="text-sm font-bold text-zinc-200 mb-4">Recommended Workflow</h3>
                  <div className="flex flex-col md:flex-row items-center gap-4 text-xs font-mono text-zinc-500">
                    <div className="bg-zinc-900 px-3 py-2 rounded">Raw Data</div>
                    <div>→</div>
                    <div className="bg-emerald-900/20 text-emerald-400 px-3 py-2 rounded border border-emerald-500/20">Sift Compression</div>
                    <div>→</div>
                    <div className="bg-zinc-900 px-3 py-2 rounded">LLM Inference</div>
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'change-log' && (
              <div className="animate-in fade-in duration-200 space-y-10 max-w-3xl">
                <div className="relative pl-8 border-l border-zinc-800">
                  <div className="absolute -left-1.5 top-1.5 w-3 h-3 rounded-full bg-emerald-500" />
                  <h3 className="text-lg font-bold text-white mb-2">v1.0.0 <span className="text-xs text-zinc-500 font-normal ml-2">May 2026</span></h3>
                  <ul className="space-y-2 text-sm text-zinc-400 list-disc pl-4">
                    <li>Official public release of <code className="text-emerald-400">sift-core</code> Python SDK.</li>
                    <li>Official public release of <code className="text-emerald-400">sift-node</code> npm SDK.</li>
                    <li>Implemented asynchronous compression support.</li>
                    <li>Added auto-retry middleware for 429 rate-limited requests.</li>
                    <li>Enhanced compression modes for RAG and Chat contexts.</li>
                  </ul>
                </div>

                <div className="relative pl-8 border-l border-zinc-800 pb-10">
                  <div className="absolute -left-1.5 top-1.5 w-3 h-3 rounded-full bg-zinc-700" />
                  <h3 className="text-lg font-bold text-white mb-2">v0.9.0 <span className="text-xs text-zinc-500 font-normal ml-2">April 2026</span></h3>
                  <ul className="space-y-2 text-sm text-zinc-400 list-disc pl-4">
                    <li>Beta testing of matrix-based compression algorithms.</li>
                    <li>Initial integration benchmarks with GPT-4o and Claude 3.5.</li>
                  </ul>
                </div>
              </div>
            )}

            {activeSection === 'glossary' && (
              <div className="animate-in fade-in duration-200 space-y-10">
                <div className="grid gap-6">
                  <div className="border-b border-zinc-900 pb-4">
                    <h3 className="text-emerald-400 font-bold font-mono mb-1">Context Window</h3>
                    <p className="text-sm text-zinc-400 leading-relaxed">
                      The total number of tokens (words/characters) an LLM can consider at once. Exceeding this limit results in data truncation.
                    </p>
                  </div>
                  <div className="border-b border-zinc-900 pb-4">
                    <h3 className="text-emerald-400 font-bold font-mono mb-1">Token</h3>
                    <p className="text-sm text-zinc-400 leading-relaxed">
                      The fundamental unit of text processed by LLMs. Generally, 1,000 tokens are equivalent to about 750 words.
                    </p>
                  </div>
                  <div className="border-b border-zinc-900 pb-4">
                    <h3 className="text-emerald-400 font-bold font-mono mb-1">Latency</h3>
                    <p className="text-sm text-zinc-400 leading-relaxed">
                      The time delay between sending a request and receiving the model's response. Prompt compression significantly lowers this by reducing the computational load.
                    </p>
                  </div>
                  <div className="border-b border-zinc-900 pb-4">
                    <h3 className="text-emerald-400 font-bold font-mono mb-1">Retrieval-Augmented Generation (RAG)</h3>
                    <p className="text-sm text-zinc-400 leading-relaxed">
                      An architectural approach where an LLM is provided with external, relevant data chunks to improve response accuracy.
                    </p>
                  </div>
                  <div className="border-b border-zinc-900 pb-4">
                    <h3 className="text-emerald-400 font-bold font-mono mb-1">Stateless</h3>
                    <p className="text-sm text-zinc-400 leading-relaxed">
                      A system design where each request is handled independently, and no information from previous requests is retained or stored.
                    </p>
                  </div>
                </div>
              </div>
            )}

          </main>
        </div>
      </div>
    </>
  );
}