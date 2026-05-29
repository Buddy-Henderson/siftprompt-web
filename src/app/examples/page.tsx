'use client';

import React, { useState, useEffect } from 'react';
import { RECIPES_DATA } from '@/app/data/recipes';

export default function ExamplesPage() {
  const [activeTab, setActiveTab] = useState('node');
  const [copied, setCopied] = useState(false);

  // Synchronize dynamic parameters state with incoming query params
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const recipeParam = params.get('recipe');
      if (recipeParam && RECIPES_DATA.some(r => r.id === recipeParam)) {
        setActiveTab(recipeParam);
      }
    }
  }, []);

  const currentRecipe = RECIPES_DATA.find((r) => r.id === activeTab) || RECIPES_DATA[3];

  const handleCopy = () => {
    navigator.clipboard.writeText(currentRecipe.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Programmatic Search Engine Structural Metadata Map
  const baseUrl = 'https://siftprompt.com';
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Examples",
        "item": `${baseUrl}/examples`
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": currentRecipe.title,
        "item": `${baseUrl}/examples?recipe=${activeTab}`
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

      <div className="w-full min-h-[calc(100vh-64px)] bg-[#09090b] text-zinc-100 font-sans">
        <div className="max-w-5xl mx-auto px-6 py-16">
          
          {/* HEADER BLOCK */}
          <div className="mb-12">
            <div className="text-xs font-mono text-emerald-400 uppercase tracking-widest mb-3">
              // Integration Environment Recipes
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight text-white mb-4">
              Plug-and-Play Integrations.
            </h1>
            <p className="text-zinc-400 max-w-2xl text-base leading-relaxed">
              Intercept and compress token sequences seamlessly within your backend controllers before executing generation requests on OpenAI, Anthropic, or custom private endpoint clusters.
            </p>
          </div>

          {/* ECOSYSTEM SWITCHER TABS */}
          <div className="flex space-x-2 border-b border-zinc-800 mb-6 overflow-x-auto scrollbar-none">
            {RECIPES_DATA.map((recipe) => (
              <button
                key={recipe.id}
                onClick={() => {
                  setActiveTab(recipe.id);
                  window.history.pushState(null, '', `/examples?recipe=${recipe.id}`);
                }}
                className={`text-xs font-mono px-4 py-3 border-b-2 transition -mb-[2px] whitespace-nowrap ${
                  activeTab === recipe.id
                    ? 'border-emerald-500 text-emerald-400 font-bold bg-emerald-500/5'
                    : 'border-transparent text-zinc-500 hover:text-zinc-300'
                }`}
              >
                {recipe.title}
              </button>
            ))}
          </div>

          {/* OPTIMIZED CONTEXT DESCRIPTION FOR CRAWLERS */}
          <div className="mb-4 text-xs font-mono text-zinc-400 max-w-3xl leading-relaxed">
            <span className="text-zinc-600">// Context Blueprint:</span> {currentRecipe.description}
          </div>

          {/* IDE SIMULATOR FRAME */}
          <div className="border border-zinc-800 rounded-xl bg-[#000000] overflow-hidden shadow-2xl">
            {/* Header/Tab Control Strip */}
            <div className="bg-zinc-900/40 border-b border-zinc-800 px-4 py-3 flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-zinc-800" />
                <span className="w-2 h-2 rounded-full bg-zinc-800" />
                <span className="w-2 h-2 rounded-full bg-zinc-800" />
                <span className="text-xs font-mono text-zinc-500 ml-2">{currentRecipe.filename}</span>
              </div>
              <button 
                onClick={handleCopy}
                className={`text-xs font-mono border px-3 py-1 rounded-md transition ${
                  copied 
                    ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' 
                    : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-800'
                }`}
              >
                {copied ? '✓ Copied' : '📋 Copy Snippet'}
              </button>
            </div>

            {/* Code Render Area */}
            <pre className="p-6 overflow-x-auto text-xs sm:text-sm font-mono leading-relaxed text-zinc-300 bg-zinc-950/40 selection:bg-zinc-800">
              <code>{currentRecipe.code}</code>
            </pre>
          </div>

          {/* SECURITY & DEPLOYMENT NOTICE CARD */}
          <div className="mt-8 border border-zinc-800/60 rounded-xl p-4 bg-zinc-900/10 flex items-start gap-3 max-w-3xl">
            <span className="text-emerald-400 text-sm mt-0.5">💡</span>
            <p className="text-xs font-mono text-zinc-500 leading-normal">
              <span className="text-zinc-400 font-bold">Production Security Architecture:</span> Keep your application keys completely private. Always ingest your <code className="text-zinc-400 bg-zinc-900 px-1 py-0.5 rounded">x-rapidapi-key</code> credential strings securely using server-side environment configurations (<code className="text-zinc-400 bg-zinc-900 px-1 py-0.5 rounded">process.env</code>). Never route public edge traffic through unshielded browser-side components.
            </p>
          </div>

          {/* INTEGRATION LOGIC ARCHITECTURE */}
          <div className="mt-16 border-t border-zinc-800 pt-12">
            <h2 className="text-xl font-bold text-white mb-6">Integration Logic Architecture</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="space-y-2">
                <div className="text-emerald-500 font-mono text-xs">// 01. Ingestion</div>
                <p className="text-sm text-zinc-400">Capture your raw prompt strings or retrieved vector chunks from your database.</p>
              </div>
              <div className="space-y-2">
                <div className="text-emerald-500 font-mono text-xs">// 02. Compression</div>
                <p className="text-sm text-zinc-400">Route payload through Sift middleware to strip redundant tokens and conversational boilerplate.</p>
              </div>
              <div className="space-y-2">
                <div className="text-emerald-500 font-mono text-xs">// 03. Generation</div>
                <p className="text-sm text-zinc-400">Inject the high-density optimized payload directly into your LLM completion request.</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}