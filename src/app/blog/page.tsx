'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { articlesDatabase, BlogArticle } from './data'; 

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState('All');

  const initialPosts: BlogArticle[] = Object.values(articlesDatabase);

  // Synchronize state with URL query parameters for crawler accessibility
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const categoryParam = params.get('category');
      if (categoryParam) {
        // Find matching case-insensitive category name from database
        const matchedCategory = categories.find(
          c => c.toLowerCase().replace(/[^a-z0-9]/g, '') === categoryParam.toLowerCase().replace(/[^a-z0-9]/g, '')
        );
        if (matchedCategory) {
          setActiveCategory(matchedCategory);
        }
      }
    }
  }, []);

  // Unique Category Aggregator for Tab Pill Rows
  const categories = ['All', ...Array.from(new Set(initialPosts.map(p => p.category)))];

  // Filter posts dynamically based on selected category navigation tab
  const filteredPosts = initialPosts.filter(post => {
    if (activeCategory === 'All') return true;
    
    const cleanPostCategory = post.category.toLowerCase().replace(/[^a-z0-9]/g, '');
    const cleanActiveCategory = activeCategory.toLowerCase().replace(/[^a-z0-9]/g, '');
    
    return cleanPostCategory === cleanActiveCategory;
  });

  // Structural Layout Segment Allocations
  const featuredPost = filteredPosts[0];
  const depthPosts = filteredPosts.slice(1, 3);
  const gridPosts = filteredPosts.slice(3);

  // Dynamic SEO JSON-LD Breadcrumb Model
  const baseUrl = 'https://siftprompt.com';
  const cleanUrlCategory = activeCategory.toLowerCase().replace(/[^a-z0-9]/g, '');
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Blog",
        "item": `${baseUrl}/blog`
      },
      ...(activeCategory !== 'All' ? [{
        "@type": "ListItem",
        "position": 2,
        "name": activeCategory,
        "item": `${baseUrl}/blog?category=${cleanUrlCategory}`
      }] : [])
    ]
  };

  return (
    <>
      {/* Dynamic SEO JSON-LD Crawl Script Tracking Node */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <div className="w-full min-h-[calc(100vh-64px)] bg-[#09090b] text-zinc-100 py-16 font-sans">
        <div className="max-w-[85rem] mx-auto px-6">
          
          {/* LOGO AND TITLE SECTION ZONE */}
          <div className="mb-12 border-b border-zinc-950 pb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <div className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest mb-1">
                // Core Intelligence Infrastructure Repository
              </div>
              <h1 className="text-3xl font-black tracking-tight text-white font-mono">
                SiftPrompt.<span className="text-emerald-500">log</span>
              </h1>
            </div>

            {/* DYNAMIC CATEGORY FILTER NAVIGATION PILLS TABS BAR */}
            <div className="flex flex-wrap gap-1 bg-black/40 border border-zinc-950 p-1 rounded-xl w-fit">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setActiveCategory(cat);
                    const cleanCat = cat.toLowerCase().replace(/[^a-z0-9]/g, '');
                    window.history.pushState(null, '', cat === 'All' ? '/blog' : `/blog?category=${cleanCat}`);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono transition select-none ${
                    activeCategory === cat
                      ? 'bg-zinc-900 text-emerald-400 font-bold border border-zinc-850'
                      : 'text-zinc-500 hover:text-zinc-300'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* EDGE GUARD TRIGGER: Render layout only if there are active filtered results */}
          {filteredPosts.length > 0 ? (
            <div className="space-y-10">
              
              {/* GRID LAYOUT MATRIX COMBINED TOP AND SECONDARY ZONE */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
                
                {/* FEATURED ARTICLES HERO GRID CELL BLOCK */}
                {featuredPost && (
                  <Link
                    href={`/blog/${featuredPost.id}`}
                    className="lg:col-span-2 group flex flex-col justify-between bg-black/40 border border-zinc-850 hover:border-zinc-800 rounded-2xl p-6 sm:p-8 transition relative overflow-hidden min-h-[380px]"
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none group-hover:bg-emerald-500/10 transition" />
                    <div>
                      <div className="text-[10px] font-mono text-zinc-600 mb-4 flex justify-between items-center">
                        <span>{featuredPost.date}</span>
                        <span className="bg-emerald-500/5 px-2 py-0.5 rounded text-emerald-400 border border-emerald-500/10 text-[9px] font-bold uppercase tracking-widest">{featuredPost.category}</span>
                      </div>
                      <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight group-hover:text-emerald-400 transition mb-3 leading-snug">
                        {featuredPost.title}
                      </h2>
                      <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed max-w-2xl">
                        {featuredPost.excerpt}
                      </p>
                    </div>
                    <div className="text-xs font-mono text-zinc-500 flex justify-between items-center mt-8 pt-4 border-t border-zinc-950">
                      <span className="group-hover:text-zinc-300 transition flex items-center gap-1">Read Whitepaper <span className="text-emerald-500 font-bold group-hover:translate-x-0.5 transition-transform">→</span></span>
                      <span>{featuredPost.readTime}</span>
                    </div>
                  </Link>
                )}

                {/* SECONDARY SIDE COLUMN CELL LIST ZONE */}
                <div className="flex flex-col gap-4 justify-between h-full">
                  {depthPosts.length > 0 ? (
                    depthPosts.map((post) => (
                      <Link
                        key={post.id}
                        href={`/blog/${post.id}`}
                        className="group flex-1 flex flex-col justify-between bg-black/40 border border-zinc-850 hover:border-zinc-800 rounded-2xl p-5 transition"
                      >
                        <div>
                          <div className="text-[10px] font-mono text-zinc-600 mb-2 flex justify-between items-center">
                            <span>{post.date}</span>
                            <span className="text-zinc-500 font-bold uppercase tracking-wider text-[8px]">{post.category}</span>
                          </div>
                          <h3 className="text-sm font-bold text-white tracking-tight group-hover:text-emerald-400 transition mb-2 line-clamp-2">
                            {post.title}
                          </h3>
                          <p className="text-zinc-500 text-xs leading-normal line-clamp-2">
                            {post.excerpt}
                          </p>
                        </div>
                        <div className="text-[11px] font-mono text-zinc-600 flex justify-between items-center mt-4 pt-3 border-t border-zinc-950/60">
                          <span className="group-hover:text-zinc-400 transition">Analyze Stream</span>
                          <span>{post.readTime}</span>
                        </div>
                      </Link>
                    ))
                  ) : (
                    <div className="flex-1 border border-dashed border-zinc-900 rounded-2xl flex items-center justify-center p-6 text-center text-xs font-mono text-zinc-700">
                      // Secondary Matrices Staging Area
                    </div>
                  )}
                </div>
              </div>

              {/* LOWER ARCHIVE CARD DISPLAY LIST GRID FEED SECTION */}
              {gridPosts.length > 0 && (
                <div className="pt-8 border-t border-zinc-950">
                  <div className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest mb-6">// Historical Telemetry Streams Index</div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {gridPosts.map((post) => (
                      <Link
                        key={post.id}
                        href={`/blog/${post.id}`}
                        className="group flex flex-col justify-between bg-black/40 border border-zinc-850 hover:border-zinc-800 rounded-xl p-5 transition"
                      >
                        <div>
                          <div className="text-[10px] font-mono text-zinc-600 mb-2 flex justify-between items-center">
                            <span>{post.date}</span>
                            <span className="bg-zinc-950 px-1.5 py-0.5 rounded text-zinc-500 border border-zinc-900 text-[9px] uppercase tracking-wider">{post.category}</span>
                          </div>
                          <h4 className="text-sm font-bold text-white tracking-tight group-hover:text-emerald-400 transition mb-2 line-clamp-2">
                            {post.title}
                          </h4>
                          <p className="text-zinc-500 text-xs leading-normal line-clamp-2">
                            {post.excerpt}
                          </p>
                        </div>
                        <div className="text-[11px] font-mono text-zinc-600 flex items-center justify-between mt-4 pt-3 border-t border-zinc-950">
                          <span className="group-hover:text-zinc-400 transition">Read Entry</span>
                          <span>{post.readTime}</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* EMPTY FALLBACK CONTAINER STATE ZONE */
            <div className="w-full border border-dashed border-zinc-950 rounded-2xl py-24 text-center font-mono text-sm text-zinc-600">
              ⚠ [No active telemetry articles matching filter parameter indices]
            </div>
          )}
        </div>
      </div>
    </>
  );
}