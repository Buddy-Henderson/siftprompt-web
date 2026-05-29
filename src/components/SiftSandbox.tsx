"use client";

import React, { useState, useEffect } from 'react';
// Import your proven local processing engines directly
import { compressTextLocally, estimateTokens } from '../app/utils/optimizer';


export default function Home() {
  const [inputText, setInputText] = useState('');
  const [optimizedText, setOptimizedText] = useState('');
  const [mode, setMode] = useState<'chat' | 'rag' | 'agent' | 'codegen'>('chat');
  
  // New Interactive Content Copying and Exporting States
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [fileName, setFileName] = useState('optimized-prompt');

  const [metrics, setMetrics] = useState({
    originalTokens: 0,
    optimizedTokens: 0,
    savings: 0
  });

  useEffect(() => {
    // Update the title dynamically based on the active mode
    const modeTitles = {
      chat: 'Optimizing Chat Context | SiftPrompt',
      rag: 'Optimizing RAG Context | SiftPrompt',
      agent: 'Optimizing Agent Scratchpads | SiftPrompt',
      codegen: 'Optimizing Codebase Tokens | SiftPrompt'
    };

    document.title = modeTitles[mode];
    
    // Update the meta description dynamically
    const descTag = document.querySelector('meta[name="description"]');
    if (descTag) {
      descTag.setAttribute('content', `Evaluating compression efficiency for ${mode} mode using SiftPrompt's native client-side optimizer.`);
    }
  }, [mode]);

  // Automatically recalculate values on user input transitions
  useEffect(() => {
    if (!inputText.trim()) {
      setOptimizedText('');
      setMetrics({ originalTokens: 0, optimizedTokens: 0, savings: 0 });
      return;
    }

    // 1. Calculate original profile metrics
    const origCount = estimateTokens(inputText);

    // 2. Process text completely inside the browser client engine
    const compressed = compressTextLocally(inputText, { mode, language: 'en' });
    const optCount = estimateTokens(compressed);

    // 3. Compute efficiency percentages
    const savingsPercent = origCount > 0 
      ? Math.round(((origCount - optCount) / origCount) * 100) 
      : 0;

    setOptimizedText(compressed);
    setMetrics({
      originalTokens: origCount,
      optimizedTokens: optCount,
      savings: Math.max(0, savingsPercent)
    });
  }, [inputText, mode]);

  // Handle local system file drag-and-drop operations safely
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      if (text) setInputText(text);
    };
    reader.readAsText(file);
  };

  // ACTION UTILITY A: SYSTEM CLIPBOARD CONTROLLER
  const handleCopyOutput = () => {
    if (!optimizedText) return;
    navigator.clipboard.writeText(optimizedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // ACTION UTILITY B: BINARY DATA STREAM EXPORTER (.TXT DOWNLOAD)
  const handleDownloadOutput = () => {
    if (!optimizedText) return;
    setDownloading(true);

    // Sanitize user inputs to omit dangerous operating system characters
    const safeName = fileName.trim() ? fileName.replace(/[/\\?%*:|"<>\s]/g, '_') : 'sifted-prompt';
    const finalFileName = safeName.endsWith('.txt') ? safeName : `${safeName}.txt`;

    setTimeout(() => {
      const blob = new Blob([optimizedText], { type: 'text/plain;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', finalFileName);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      setDownloading(false);
    }, 700);
  };

  return (
    <main className="min-h-[calc(100vh-64px)] bg-[#09090b] text-zinc-100 flex flex-col font-sans selection:bg-emerald-500/30">

        
      {/* CORE HERO WRAPPER */}
      <section className="pt-32 pb-12 max-w-7xl mx-auto px-6 text-center flex flex-col items-center">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white max-w-3xl leading-tight">
          Slash Your LLM API Bills by up-to <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">40%+</span> Natively.
        </h1>
        <p className="mt-4 text-zinc-400 max-w-2xl text-base md:text-lg">
          A drop-in client proxy and token optimization engine. Strip semantic boilerplate fluff, protect vital schema parameters, and maximize context visibility in real-time.
        </p>
      </section>

      {/* SANDBOX WORKSPACE INTERFACE */}
      <section className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-6 pb-24 flex-grow">
        
        {/* PANEL LEFT: INPUT CONTROL */}
        <div className="flex flex-col bg-[#000000] border border-zinc-800 rounded-xl overflow-hidden focus-within:border-zinc-700 transition">
          <div className="bg-zinc-900/60 border-b border-zinc-800 px-4 py-3 flex flex-wrap justify-between items-center gap-3">
            {/* Context Profile Selectors */}
            <div className="flex space-x-1 bg-zinc-950 p-1 rounded-lg border border-zinc-800">
              {(['chat', 'rag', 'agent', 'codegen'] as const).map((p) => (
                <button
                  key={p}
                  onClick={() => setMode(p)}
                  className={`text-xs uppercase tracking-wider font-mono px-3 py-1.5 rounded-md font-medium transition ${
                    mode === p 
                      ? 'bg-zinc-800 text-emerald-400 border border-zinc-700 shadow-sm' 
                      : 'text-zinc-500 hover:text-zinc-300'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>

            {/* Native File Upload Hooks */}
            <label className="flex items-center space-x-1.5 px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-zinc-300 rounded-lg text-xs font-medium cursor-pointer transition">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"/></svg>
              <span>Upload Document</span>
              <input 
                type="file" 
                accept=".txt,.md,.json,.csv,.js,.jsx,.ts,.tsx,.py,.html,.css,.go,.rs,.cpp,.java" 
                onChange={handleFileUpload} 
                className="hidden" 
              />
            </label>

            {/* UPGRADED TRUST BADGE: REINFORCING ORGANIC PRIVACY KEYWORDS */}
            <div className="text-[11px] font-mono text-zinc-500 bg-zinc-950/80 border border-zinc-800/60 px-2.5 py-1 rounded-md flex items-center gap-1.5 selection:bg-transparent">
              <span className="text-emerald-400 font-bold">🔒 Client-Side Privacy Layer</span>
              <span className="text-zinc-700">·</span>
              <span className="text-zinc-400">100% Confidential In-Browser Execution</span>
            </div>
          </div>

          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Paste your verbose RAG contexts, nested data system strings, or raw conversational prompts here to evaluate compression efficiency metrics instantly..."
            className="w-full h-80 lg:h-96 p-5 bg-transparent text-zinc-300 placeholder-zinc-600 focus:outline-none resize-none font-mono text-sm leading-relaxed"
          />
          
          <div className="border-t border-zinc-900 bg-zinc-950/40 px-5 py-3 text-xs font-mono text-zinc-500 flex justify-between">
            <span>Original Evaluation Size</span>
            <span className="text-zinc-400">{metrics.originalTokens} Tokens</span>
          </div>
        </div>

        {/* PANEL RIGHT: UPGRADED OPTIMIZED OUTPUT MIRROR */}
        <div className="flex flex-col bg-[#000000] border border-zinc-800 rounded-xl overflow-hidden justify-between">
          <div>
            <div className="bg-zinc-900/60 border-b border-zinc-800 px-4 py-3 flex justify-between items-center h-[53px]">
              <span className="text-xs font-mono font-medium tracking-wide uppercase text-zinc-400 flex items-center space-x-1.5">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                <span>Optimized Context Delivery Target</span>
              </span>
              
              <div className="flex items-center space-x-3">
                {metrics.savings > 0 && (
                  <span className="text-xs bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-2.5 py-1 rounded-md font-mono font-bold">
                    -{metrics.savings}% Reduced
                  </span>
                )}
                <button
                  onClick={handleCopyOutput}
                  disabled={!optimizedText}
                  className={`text-xs font-mono border px-3 py-1 rounded-md transition ${
                    copied
                      ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                      : 'bg-zinc-950 border-zinc-850 text-zinc-400 hover:text-white hover:bg-zinc-900 disabled:opacity-30'
                  }`}
                >
                  {copied ? '✓ Copied' : '📋 Copy Text'}
                </button>
              </div>
            </div>

            <div className="w-full h-80 lg:h-96 p-5 overflow-y-auto font-mono text-sm leading-relaxed text-zinc-400 bg-zinc-950/20 whitespace-pre-wrap selection:bg-zinc-800">
              {optimizedText || <span className="text-zinc-700 italic">Waiting for text payload input variables...</span>}
            </div>
          </div>

          <div>
            {/* INTEGRATED FILE EXPORTER CONTROLS CONTAINER */}
            {optimizedText && (
              <div className="border-t border-zinc-900/60 bg-zinc-950/40 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center space-x-2 flex-grow max-w-xs">
                  <span className="text-xs font-mono text-zinc-600">Export:</span>
                  <div className="relative flex items-center w-full">
                    <input
                      type="text"
                      value={fileName}
                      onChange={(e) => setFileName(e.target.value)}
                      placeholder="optimized-prompt"
                      className="w-full bg-black border border-zinc-850 rounded-lg pl-3 pr-10 py-1 font-mono text-xs text-zinc-300 focus:outline-none focus:border-emerald-500/50 transition placeholder-zinc-800"
                    />
                    <span className="absolute right-3 font-mono text-[10px] text-zinc-600 pointer-events-none">.txt</span>
                  </div>
                </div>

                <button
                  onClick={handleDownloadOutput}
                  disabled={downloading}
                  className="text-xs font-mono font-bold bg-zinc-100 hover:bg-white text-zinc-950 px-3 py-1.5 rounded-lg transition flex items-center justify-center gap-1.5 disabled:bg-zinc-900 disabled:text-zinc-600"
                >
                  {downloading ? 'Exporting...' : '↓ Download'}
                </button>
              </div>
            )}

            <div className="border-t border-zinc-900 bg-zinc-950/40 px-5 py-3 text-xs font-mono text-zinc-500 flex justify-between">
              <span>Optimized Compute Weight</span>
              <span className={metrics.savings > 0 ? "text-emerald-400 font-bold" : "text-zinc-400"}>
                {metrics.optimizedTokens} Tokens
              </span>
            </div>           
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────────────────────
          UPGRADED HOW-TO GUIDE & ARCHITECTURE SYSTEM INFORMATION
          ────────────────────────────────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 w-full pb-32 border-t border-zinc-900 pt-16 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* LEFT 5 COLUMNS: REWRITTEN OPERATIONAL SYSTEM PROTOCOL */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="text-xs font-mono text-emerald-400 uppercase tracking-widest mb-2">
                // System Execution Protocol
              </div>
              <h2 className="text-2xl font-bold tracking-tight text-white">
                How to Evaluate Your Prompts
              </h2>
            </div>

            <div className="space-y-4 font-mono text-xs text-zinc-400">
              <div className="flex items-start gap-3 bg-zinc-950/40 border border-zinc-900 rounded-xl p-4">
                <span className="text-emerald-400 font-bold bg-zinc-900 border border-zinc-850 w-6 h-6 rounded-md flex items-center justify-center shrink-0">1</span>
                <div>
                  <h4 className="text-zinc-200 font-bold mb-1">Select Compression Strategy</h4>
                  <p className="leading-relaxed">Toggle between four custom lexer parameters at the top of the interface. This sets the target array behavior to match your specific task profile logic.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-zinc-950/40 border border-zinc-900 rounded-xl p-4">
                <span className="text-emerald-400 font-bold bg-zinc-900 border border-zinc-850 w-6 h-6 rounded-md flex items-center justify-center shrink-0">2</span>
                <div>
                  <h4 className="text-zinc-200 font-bold mb-1">Isolate Context in Memory</h4>
                  <p className="leading-relaxed">Paste your text directly into the dashboard console window, or pull source lines from local components by selecting <span className="text-zinc-300">Upload Document</span>.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-zinc-950/40 border border-zinc-900 rounded-xl p-4">
                <span className="text-emerald-400 font-bold bg-zinc-900 border border-zinc-850 w-6 h-6 rounded-md flex items-center justify-center shrink-0">3</span>
                <div>
                  <h4 className="text-zinc-200 font-bold mb-1">Export Optimized Output Assets</h4>
                  <p className="leading-relaxed">Track your dynamic savings indexes immediately. Use the action triggers to copy compressed configurations or download local files directly into your workspace mapping loops.</p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT 7 COLUMNS: UNDERSTANDING THE STRATEGY MATRIX */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <div className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-2">
                // Algorithmic Profile Configurations
              </div>
              <h2 className="text-2xl font-bold tracking-tight text-white">
                Understanding Optimization Profiles
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* CHAT PROFILE CARD */}
              <div className="border border-zinc-850/60 bg-black p-5 rounded-xl hover:border-zinc-800 transition">
                <div className="text-xs font-mono font-bold text-emerald-400 tracking-wider uppercase mb-1">CHAT MODE</div>
                <h4 className="text-sm font-bold text-zinc-200 mb-2">Conversational Trimming</h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Identifies and strips out conversational fluff, pleasantries, and filler syntax (*"surely", "please note that"*) while preserving user questions and context targets.
                </p>
              </div>

              {/* RAG PROFILE CARD */}
              <div className="border border-zinc-850/60 bg-black p-5 rounded-xl hover:border-zinc-800 transition">
                <div className="text-xs font-mono font-bold text-emerald-400 tracking-wider uppercase mb-1">RAG MODE</div>
                <h4 className="text-sm font-bold text-zinc-200 mb-2">Knowledge-Chunk Sifting</h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Scans vector text chunks to isolate repeated definitions and stop-words. Includes real-time multi-language translation, instantly normalizing foreign data fragments into optimized English tokens to maximize model performance.
                </p>
              </div>

              {/* AGENT PROFILE CARD */}
              <div className="border border-zinc-850/60 bg-black p-5 rounded-xl hover:border-zinc-800 transition">
                <div className="text-xs font-mono font-bold text-emerald-400 tracking-wider uppercase mb-1">AGENT MODE</div>
                <h4 className="text-sm font-bold text-zinc-200 mb-2">Loop Scratchpad Minification</h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Targets heavy, multi-turn reasoning traces and tool-call descriptions. Drops redundant formatting while keeping state tracking variables and tool parameter data intact.
                </p>
              </div>

              {/* CODEGEN PROFILE CARD */}
              <div className="border border-zinc-850/60 bg-black p-5 rounded-xl hover:border-zinc-800 transition">
                <div className="text-xs font-mono font-bold text-emerald-400 tracking-wider uppercase mb-1">CODEGEN MODE</div>
                <h4 className="text-sm font-bold text-zinc-200 mb-2">Source Token Packing</h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Optimizes source scripts by aggressively compressing spacing columns, stripping dead code strings, and clearing inline comments without changing script syntax logic.
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* ──────────────────────────────────────────────────────────────────────────────
            CENTERED SYSTEM ARCHITECTURE FEATURE SEO GRID
            ────────────────────────────────────────────────────────────────────────────── */}
        <div className="mt-20 pt-16 border-t border-zinc-900 max-w-5xl mx-auto w-full text-center">
          <div className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-2">
            // Core Topology Metrics
          </div>
          <h3 className="text-2xl font-bold tracking-tight text-white mb-10">
            System Architecture Specifications
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left max-w-4xl mx-auto">
            {/* CARD A: THE LIGHTWEIGHT STATIC BUILD */}
            <div className="border border-zinc-850/80 bg-zinc-950/30 p-6 rounded-2xl relative overflow-hidden group hover:border-zinc-700 transition">
              <div className="absolute top-0 right-0 p-4 font-mono text-[10px] text-zinc-800 group-hover:text-zinc-700 transition-colors">SYS_ENG_01</div>
              <h4 className="text-sm font-mono font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span></span> Lightweight Static Build
              </h4>
              <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                Our platform is compiled entirely as an optimized, lightweight static build asset payload. By completely eliminating server-side rendering round-trips and removing heavy middleware tracking layers, core compilation modules complete calculations instantly with near-zero UI interaction latency.
              </p>
            </div>

            {/* CARD B: THE CLIENT-SIDE PRIVACY LAYER */}
            <div className="border border-zinc-850/80 bg-zinc-950/30 p-6 rounded-2xl relative overflow-hidden group hover:border-zinc-700 transition">
              <div className="absolute top-0 right-0 p-4 font-mono text-[10px] text-zinc-800 group-hover:text-zinc-700 transition-colors">SYS_ENG_02</div>
              <h4 className="text-sm font-mono font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span></span> Client-Side Privacy Layer
              </h4>
              <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                Engineered with an isolated client-side privacy layer framework. Your proprietary injection string matrices, system context variables, and uploaded code repositories are evaluated inside secure browser sandbox structures, guaranteeing total database confidentiality away from tracking vectors.
              </p>
            </div>

            {/* CARD C: CROSS-LINGUAL ENGINE */}
            <div className="border border-zinc-850/80 bg-zinc-950/30 p-6 rounded-2xl relative overflow-hidden group hover:border-zinc-700 transition">
              <div className="absolute top-0 right-0 p-4 font-mono text-[10px] text-zinc-800 group-hover:text-zinc-700 transition-colors">SYS_ENG_03</div>
              <h4 className="text-sm font-mono font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span></span> Cross-Lingual Token Packing
              </h4>
              <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                Non-English characters require up to 3x more token space due to multi-byte text fragmentation. Our engine natively parses international layouts, intelligently converting incoming content blocks into clean, dense English streams to drastically slash token consumption weights before processing.
              </p>
            </div>

            {/* CARD D: NEW DETERMINISTIC AST PARSER */}
            <div className="border border-zinc-850/80 bg-zinc-950/30 p-6 rounded-2xl relative overflow-hidden group hover:border-zinc-700 transition flex flex-col justify-between">
              <div>
                <div className="absolute top-0 right-0 p-4 font-mono text-[10px] text-zinc-800 group-hover:text-zinc-700 transition-colors">SYS_ENG_04</div>
                <h4 className="text-sm font-mono font-bold text-emerald-400 mb-3 flex items-center gap-2">
                  <span></span> Deterministic RegEx & AST Tokenizer
                </h4>
                <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                  Built on a robust array of deterministic regular expressions and localized parsing structures. SiftPrompt scans structural indentations, function hooks, and bracket blocks programmatically. This ensures code scripts or nested system parameters are cleanly stripped of bloat without modifying syntax logic.
                </p>
              </div>
            </div>


          </div>
        </div>
      </section>

      {/* FREQUENTLY ASKED QUESTIONS SEARCH INTAKE INDEX */}
      <section className="max-w-4xl mx-auto px-6 w-full pb-32">
        <h3 className="text-xl font-bold tracking-tight text-white mb-8 text-center font-mono">
          // Context Optimization FAQ
        </h3>
        
        <div className="space-y-6">
          <div className="bg-black border border-zinc-850 p-5 rounded-xl">
            <h4 className="text-sm font-bold text-zinc-100 mb-2">
              How do I reduce Claude Chat tokens during long developer sessions?
            </h4>
            <p className="text-xs text-zinc-400 leading-relaxed font-sans">
              Claude models utilize tokens for both instructions and conversational history. By running your prompt through SiftPrompt's <span className="text-emerald-400 font-mono">chat</span> or <span className="text-emerald-400 font-mono">codegen</span> compression vectors first, you strip out up to 40% of repetitive text and system rules before submitting. This keeps your context footprint light and prevents early token expiration.
            </p>
          </div>

          <div className="bg-black border border-zinc-850 p-5 rounded-xl">
            <h4 className="text-sm font-bold text-zinc-100 mb-2">
              I keep running out of free messages on Claude. Can SiftPrompt help?
            </h4>
            <p className="text-xs text-zinc-400 leading-relaxed font-sans">
              Yes. Claude's message limits are directly tied to the total token volume of your conversation window. When you paste large blocks of code or lengthy documentation chunks, you burn through your message allocation exponentially faster. SiftPrompt minifies your input context buffers on the fly, allowing you to fit more actual substance into every single message turn.
            </p>
          </div>

          <div className="bg-black border border-zinc-850 p-5 rounded-xl">
            <h4 className="text-sm font-bold text-zinc-100 mb-2">
              Does SiftPrompt support non-English document compression?
            </h4>
            <p className="text-xs text-zinc-400 leading-relaxed font-sans">
              Yes. SiftPrompt includes an integrated cross-lingual optimization parser. Because LLM tokenizers handle English far more efficiently than other languages, pasting foreign-language datasets or documentation strings burns through message limits rapidly. SiftPrompt securely standardizes international text payloads into concise English arrays, protecting context depth while driving token overhead down to its absolute floor.
            </p>
          </div>

        </div>
      </section>
    </main>
  );
}