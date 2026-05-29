'use client';

import React, { useState } from 'react';

const steps = [
  {
    num: '01',
    title: 'Lexical Analysis & Parsing',
    description: 'The raw string payload is processed directly inside your browser client thread. The engine maps syntax variables, protects JSON schema configurations, and tokenizes incoming words.',
    badge: 'Client-Side Execution',
    details: 'Zero data is leaked to external databases. The system isolates parameters like schema tags so the structural intent of your instructions remains completely flawless.'
  },
  {
    num: '02',
    title: 'Semantic Boilerplate Elimination',
    description: 'SiftPrompt runs a localized compression algorithm to target linguistic fluff, repetitive grammatical connectives, and redundant stop-words that add zero analytical value to an LLM.',
    badge: 'Context Compaction',
    details: 'By dropping words like "the", "a", "an", and structural conversational fluff, the semantic meaning is preserved while stripping away massive token weight.'
  },
  {
    num: '03',
    title: 'Whitespace & Character Trimming',
    description: 'Depending on your profile mode (like CodeGen), the engine eliminates multi-tab gaps, trailing space attributes, and carriage line breaks that waste billable token limits.',
    badge: 'Payload Minification',
    details: 'Especially powerful for script blocks and database schemas, reducing vertical overhead structure footprint natively.'
  },
  {
    num: '04',
    title: 'Optimized LLM Forwarding',
    description: 'The compressed, hyper-dense context payload is returned instantly to your backend router, ready to be dispatched to OpenAI or Anthropic at a massive financial discount.',
    badge: 'Token Dispatch Ready',
    details: 'Your target LLM model processes fewer characters while outputting the exact same logical results, saving you up to 40% on your monthly raw API infrastructure bill.'
  }
];

export default function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <div className="w-full min-h-[calc(100vh-64px)] bg-[#09090b] text-zinc-100 font-sans">
      <div className="max-w-6xl mx-auto px-6 py-16">
        
        {/* HEADER AREA */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="text-xs font-mono text-emerald-400 uppercase tracking-widest mb-3">
            // Algorithmic Mechanics Blueprint
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4">
            How SiftPrompt Compresses Text.
          </h1>
          <p className="text-zinc-400 text-base md:text-lg">
            An elegant, local pipeline that strips out expensive token overhead in milliseconds without altering the output quality of your linguistic data.
          </p>
        </div>

        {/* PIPELINE GRID WORKSPACE */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* LEFT COLUMN: INTERACTIVE PIPELINE STEPS */}
          <div className="lg:col-span-5 space-y-4">
            {steps.map((step, index) => (
              <button
                key={step.num}
                onClick={() => setActiveStep(index)}
                className={`w-full text-left p-5 rounded-xl border transition flex items-start gap-4 ${
                  activeStep === index
                    ? 'bg-zinc-900/60 border-emerald-500 shadow-md shadow-emerald-500/5 text-white'
                    : 'bg-black border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200'
                }`}
              >
                <div className={`font-mono text-sm font-bold px-2 py-0.5 rounded ${
                  activeStep === index ? 'bg-emerald-500 text-zinc-950' : 'bg-zinc-900 text-zinc-500'
                }`}>
                  {step.num}
                </div>
                <div>
                  <h3 className="text-sm font-bold font-mono tracking-wide uppercase mb-1">{step.title}</h3>
                  <p className="text-xs text-zinc-500 leading-normal line-clamp-2">
                    {step.description}
                  </p>
                </div>
              </button>
            ))}
          </div>

          {/* RIGHT COLUMN: PIPELINE STEP INSPECTOR TERMINAL */}
          <div className="lg:col-span-7 border border-zinc-800 rounded-2xl bg-[#000000] p-6 shadow-2xl relative min-h-[360px] flex flex-col justify-between overflow-hidden">
            
            {/* Visual matrix crosshair accents */}
            <div className="absolute top-0 right-0 p-4 font-mono text-[10px] text-zinc-800 select-none pointer-events-none">
              SIFT_SYSTEM_LOG // STATUS_ACTIVE
            </div>

            <div>
              {/* Dynamic Step Header */}
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-emerald-400 font-bold">
                  {steps[activeStep].badge}
                </span>
                <span className="text-zinc-700 font-mono text-xs">·</span>
                <span className="text-xs font-mono text-zinc-500">Node_{steps[activeStep].num}</span>
              </div>

              {/* Title & Description */}
              <h2 className="text-xl font-bold text-white mb-3">
                {steps[activeStep].title}
              </h2>
              <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                {steps[activeStep].description}
              </p>

              {/* Detailed Technical Blueprint Explainer */}
              <div className="border-t border-zinc-900 pt-6">
                <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-500 mb-2">Under the Hood Execution</h4>
                <p className="text-xs font-mono text-zinc-400 leading-relaxed bg-zinc-950 p-4 border border-zinc-900 rounded-xl">
                  {steps[activeStep].details}
                </p>
              </div>
            </div>

            {/* Terminal Pipeline Status Tracker Footer Bar */}
            <div className="mt-8 pt-4 border-t border-zinc-900 flex justify-between items-center text-xs font-mono text-zinc-600">
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>Payload Intact</span>
              </div>
              <div>
                Step {activeStep + 1} of 4
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}