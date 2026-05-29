'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { TUTORIALS_DATA } from '@/app/data/tutorials';

const CATEGORIES = ['All Nodes', 'Quickstart', 'Architecture', 'Infrastructure', 'Deep Dive'];

export default function TutorialsGrid() {
  const [selectedCategory, setSelectedCategory] = useState('All Nodes');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTutorials = TUTORIALS_DATA.filter((tutorial) => {
    const matchesCategory = selectedCategory === 'All Nodes' || tutorial.category === selectedCategory;
    const matchesSearch = 
      tutorial.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tutorial.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tutorial.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="w-full bg-[#09090b] text-zinc-100 px-6 py-12 font-sans selection:bg-emerald-500/30 selection:text-emerald-400">
      <div className="mx-auto max-w-7xl">
        
        {/* HEADER SECTION PANEL */}
        <div className="mb-12 border-b border-zinc-900 pb-10 relative">
          <div className="absolute top-0 right-1/4 w-72 h-72 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
          <div className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-2">// Technical Integration Handbooks</div>
          <h1 className="text-4xl font-black font-mono tracking-tight text-white mb-4 sm:text-5xl">
            Developer.<span className="text-emerald-400">tutorials()</span>
          </h1>
          <p className="text-zinc-400 text-sm max-w-2xl leading-relaxed">
            Production recipes, architecture teardowns, and quickstarts engineered to help you strip noise out of context streams, bypass token caps, and scale down LLM expenses.
          </p>
        </div>

        {/* CONTROLS BAR */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8 pb-4 border-b border-zinc-900/40">
          <div className="flex flex-wrap gap-1.5 order-2 md:order-1">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3 py-1.5 rounded-lg font-mono text-xs font-medium transition select-none border ${
                  selectedCategory === category
                    ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                    : 'bg-zinc-950 border-zinc-900 text-zinc-400 hover:border-zinc-800 hover:text-zinc-200'
                }`}
              >
                {category === 'All Nodes' ? category : `.${category.toLowerCase()}`}
              </button>
            ))}
          </div>

          <div className="relative order-1 md:order-2 w-full md:w-72">
            <input
              type="text"
              placeholder="Filter by tech (e.g. Next.js)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-900 rounded-lg px-3.5 py-1.5 pl-8 text-xs text-zinc-200 placeholder-zinc-700 focus:outline-none focus:border-emerald-500/40 font-mono transition"
            />
            <span className="absolute left-2.5 top-2 text-zinc-700 font-mono text-xs pointer-events-none">🔍</span>
          </div>
        </div>

        {/* GRID LAYOUT RESULTS */}
        {filteredTutorials.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTutorials.map((tutorial) => (
              <article 
                key={tutorial.id}
                className="group flex flex-col justify-between bg-black/40 border border-zinc-900 rounded-xl p-5 hover:border-zinc-800 transition-all hover:shadow-xl hover:shadow-emerald-500/[0.01] relative overflow-hidden"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-[9px] uppercase tracking-wider text-zinc-500 bg-zinc-950 border border-zinc-900 px-2 py-0.5 rounded">
                      {tutorial.category}
                    </span>
                    <span className="text-[10px] font-mono text-zinc-600">
                      {tutorial.duration}
                    </span>
                  </div>

                  <h3 className="text-base font-bold font-mono tracking-tight text-zinc-100 mb-2 group-hover:text-emerald-400 transition-colors">
                    <Link href={`/tutorials/${tutorial.slug}`}>
                      {tutorial.title}
                    </Link>
                  </h3>
                  <p className="text-zinc-400 text-xs leading-relaxed mb-6 font-sans">
                    {tutorial.description}
                  </p>
                </div>

                <div>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {tutorial.tags.map((tag) => (
                      <span key={tag} className="font-mono text-[9px] text-zinc-600 bg-zinc-950/40 px-1.5 py-0.5 rounded border border-zinc-900/60">
                        #{tag.toLowerCase()}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between pt-3 border-t border-zinc-950/80">
                    <span className="font-mono text-[10px] text-emerald-400 font-semibold bg-emerald-500/5 px-2 py-1 rounded border border-emerald-500/10">
                      {tutorial.impact}
                    </span>
                    <Link 
                      href={`/tutorials/${tutorial.slug}`}
                      className="text-[10px] font-mono text-zinc-500 group-hover:text-zinc-300 font-bold transition-colors uppercase tracking-wider flex items-center gap-1 select-none"
                    >
                      Read Guide <span className="transform group-hover:translate-x-0.5 transition-transform">→</span>
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="w-full text-center py-20 bg-black/20 border border-dashed border-zinc-900 rounded-xl">
            <div className="font-mono text-xs text-red-400 mb-1">⚠️ [Filter Exception: Zero Clusters Found]</div>
            <p className="text-zinc-600 text-xs">No documentation parameters match your filtering string query query logs.</p>
            <button 
              onClick={() => { setSearchQuery(''); setSelectedCategory('All Nodes'); }}
              className="mt-4 text-xs font-mono text-zinc-400 hover:text-emerald-400 underline transition"
            >
              Reset Filter Pipeline
            </button>
          </div>
        )}

      </div>
    </div>
  );
}