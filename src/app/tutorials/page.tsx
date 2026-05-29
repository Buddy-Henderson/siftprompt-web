'use client';

import React, { useMemo } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { TUTORIALS_DATA } from '@/app/data/tutorials';

// 1. INNER CHILD ELEMENT: Holds your layout and reads query strings safely
function TutorialsListContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const activeCategoryQuery = searchParams.get('category') || 'All';
  const initialTutorials = useMemo(() => TUTORIALS_DATA, []);

  const categories = useMemo(() => {
    const extracted = initialTutorials.map(t => (t as any).category || 'Guides');
    return ['All', ...Array.from(new Set(extracted))];
  }, [initialTutorials]);

  const handleCategoryChange = (category: string) => {
    if (category === 'All') {
      router.push('/tutorials', { scroll: false });
    } else {
      const urlSafeCategory = category.toLowerCase().replace(/[^a-z0-9]/g, '');
      router.push(`/tutorials?category=${urlSafeCategory}`, { scroll: false });
    }
  };

  const filteredTutorials = useMemo(() => {
    return initialTutorials.filter(t => {
      if (activeCategoryQuery === 'All') return true;
      
      const postCategory = (t as any).category || 'Guides';
      const cleanPostCategory = postCategory.toLowerCase().replace(/[^a-z0-9]/g, '');
      const cleanActiveCategory = activeCategoryQuery.toLowerCase().replace(/[^a-z0-9]/g, '');
      
      return cleanPostCategory === cleanActiveCategory;
    });
  }, [initialTutorials, activeCategoryQuery]);

  const featuredTutorial = filteredTutorials[0];
  const gridTutorials = filteredTutorials.slice(1);

  return (
    <div className="space-y-10">
      {/* HERO FEATURED BLOCKS MAIN ZONE */}
      {featuredTutorial && (
        <Link
          href={`/tutorials/${featuredTutorial.slug}`}
          className="group block bg-black/40 border border-zinc-900 hover:border-zinc-800 rounded-2xl p-6 sm:p-8 transition relative overflow-hidden min-h-[260px] flex flex-col justify-between"
        >
          <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none group-hover:bg-emerald-500/10 transition" />
          
          <div>
            <div className="text-[10px] font-mono text-zinc-600 mb-4 flex justify-between items-center">
              <span>Blueprints Series 01</span>
              <span className="bg-emerald-500/5 px-2 py-0.5 rounded text-emerald-400 border border-emerald-500/10 text-[9px] font-bold uppercase tracking-widest">
                {(featuredTutorial as any).category || 'Guides'}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight group-hover:text-emerald-400 transition mb-3 leading-snug font-mono">
              {featuredTutorial.title || `Execute Pipeline: ${featuredTutorial.slug}`}
            </h2>
            <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed max-w-3xl">
              {featuredTutorial.description || "Master the core processing pipeline settings to intercept, minify, and pass optimized metadata vectors down to processing nodes safely."}
            </p>
          </div>

          <div className="text-xs font-mono text-zinc-500 flex justify-between items-center mt-8 pt-4 border-t border-zinc-900">
            <span className="group-hover:text-zinc-300 transition flex items-center gap-1">
              Initialize Workspace Blueprint <span className="text-emerald-500 font-bold group-hover:translate-x-0.5 transition-transform">→</span>
            </span>
            <span className="text-zinc-600">ID: {featuredTutorial.id}</span>
          </div>
        </Link>
      )}

      {/* SECONDARY TILES SYSTEM ARRAYS BLOCK INDEX */}
      {gridTutorials.length > 0 && (
        <div className="pt-8 border-t border-zinc-900">
          <div className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest mb-6">// Secondary Execution Guides Directory</div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {gridTutorials.map((t) => (
              <Link
                key={t.id}
                href={`/tutorials/${t.slug}`}
                className="group flex flex-col justify-between bg-black/40 border border-zinc-900 hover:border-zinc-800 rounded-xl p-5 transition"
              >
                <div>
                  <div className="text-[10px] font-mono text-zinc-600 mb-3 flex justify-between items-center">
                    <span>Key Matrix: {t.slug}</span>
                    <span className="bg-zinc-950 px-1.5 py-0.5 rounded text-zinc-500 border border-zinc-900 text-[9px] uppercase tracking-wider">
                      {(t as any).category || 'Guides'}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-white tracking-tight group-hover:text-emerald-400 transition mb-2 font-mono line-clamp-2">
                    {t.title || `Deployment Runbook: ${t.slug}`}
                  </h3>
                  <p className="text-zinc-500 text-xs leading-normal line-clamp-2">
                    {t.description || "Production-ready walkthrough configuration mappings targeting context sequence reductions across enterprise clustering zones."}
                  </p>
                </div>
                
                <div className="text-[11px] font-mono text-zinc-600 flex items-center justify-between mt-6 pt-3 border-t border-zinc-900">
                  <span className="group-hover:text-zinc-400 transition">Inspect Pipeline</span>
                  <span>Index 0{t.id}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {filteredTutorials.length === 0 && (
        <div className="w-full border border-dashed border-zinc-900 rounded-2xl py-24 text-center font-mono text-sm text-zinc-600">
          ⚠ [No active dynamic tutorials found matching category parameter indices]
        </div>
      )}
    </div>
  );
}

// 2. ROOT PARENT WRAPPER: Exposes the primary default page entry protected by a Suspense gate
export default function TutorialsPage() {
  return (
    <div className="w-full min-h-[calc(100vh-64px)] bg-[#09090b] text-zinc-100 py-16 font-sans">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* HEADER SECTION ZONE */}
        <div className="mb-12 border-b border-zinc-900 pb-8">
          <div className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest mb-1 select-none">
            // Developer Implementation Pipelines
          </div>
          <h1 className="text-2xl font-black tracking-tight text-white font-mono select-none">
            SiftPrompt.<span className="text-emerald-500">tutorials</span>
          </h1>
          <p className="text-zinc-400 text-sm mt-2 max-w-xl leading-relaxed">
            Deep-dive step-by-step blueprints on middleware integration patterns, token context minification, and latency control architecture.
          </p>
        </div>

        {/* 🛠️ SUSPENSE BOUNDARY SAFE ZONE */}
        <React.Suspense fallback={
          <div className="w-full h-48 flex items-center justify-center font-mono text-xs text-zinc-600 animate-pulse">
            // Synchronizing telemetry data registry pipelines...
          </div>
        }>
          <TutorialsListContent />
        </React.Suspense>

      </div>
    </div>
  );
}