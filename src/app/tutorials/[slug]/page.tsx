import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { TUTORIALS_DATA } from "@/app/data/tutorials"; 

// 1. FORCE THE COMPILER TO PRE-MAP ALL VALID SLUGS
export async function generateStaticParams() {
  return TUTORIALS_DATA.map((tutorial) => ({
    slug: tutorial.slug,
  }));
}

// Ensure the page always fetches fresh data during troubleshooting
export const dynamic = 'force-dynamic';

interface Props {
  params: Promise<{ slug: string }>;
}

// 2. GENERATE DYNAMIC METADATA
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tutorial = TUTORIALS_DATA.find((item) => item.slug === slug);

  if (!tutorial) return { title: "Tutorial Not Found" };

  return {
    title: tutorial.title,
    description: tutorial.description,
    alternates: {
      canonical: `/tutorials/${slug}`,
    },
  };
}

// 3. MAIN CONTENT RENDER LAYER
export default async function TutorialSlugPage({ params }: Props) {
  const { slug } = await params;
  const tutorial = TUTORIALS_DATA.find((item) => item.slug === slug);

  

  if (!tutorial) {
    notFound();


  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "headline": tutorial.title,
    "description": tutorial.description,
    "dependencies": tutorial.prerequisites?.join(', '),
    "proficiencyLevel": tutorial.difficulty,
    "publisher": {
        "@type": "Organization",
        "name": "SiftPrompt",
        "logo": {
        "@type": "ImageObject",
        "url": "https://siftprompt.com/logo.png"
        }
    },
    "datePublished": "2026-05-01", // Update with your actual publish timestamps
    "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": `https://siftprompt.com/tutorials/${slug}`
    }
    };

  return (
    <>
        {/* Structural JSON-LD schema for search engines */}
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {/* Your visual user interface layout */}
        <article className="w-full min-h-screen bg-[#09090b] text-zinc-100 px-6 py-20 font-sans selection:bg-emerald-500/30">
            <div className="max-w-3xl mx-auto">
            
            {/* Navigation Breadcrumb */}
            <Link 
                href="/tutorials" 
                className="font-mono text-xs text-zinc-500 hover:text-emerald-400 transition inline-flex items-center gap-1 mb-8"
            >
                ← Back to index.all()
            </Link>

            {/* Header Metadata Section */}
            <header className="mb-12 border-b border-zinc-900 pb-8">
                <div className="flex items-center gap-3 mb-3">
                <span className="font-mono text-[10px] text-emerald-400 bg-emerald-500/5 px-2 py-0.5 rounded border border-emerald-500/10">
                    {tutorial.category}
                </span>
                {tutorial.difficulty && (
                    <span className="font-mono text-[10px] text-zinc-400 bg-zinc-900 px-2 py-0.5 rounded border border-zinc-800">
                    {tutorial.difficulty}
                    </span>
                )}
                <span className="text-xs font-mono text-zinc-600">
                    • {tutorial.duration}
                </span>
                <span className="text-xs font-mono text-zinc-600">
                    • {tutorial.impact}
                </span>
                </div>

                <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-4 leading-tight font-sans">
                {tutorial.title}
                </h1>
                <p className="text-zinc-400 text-base md:text-lg leading-relaxed">
                {tutorial.description}
                </p>
            </header>

        {/* Environment Prerequisites */}
        {tutorial.prerequisites && tutorial.prerequisites.length > 0 && (
          <div className="bg-zinc-950 border border-zinc-900 rounded-xl p-5 mb-10">
            <div className="text-xs font-mono text-zinc-500 uppercase tracking-wider mb-3">// Environment Prerequisites</div>
            <ul className="space-y-2 text-xs text-zinc-400 font-sans">
              {tutorial.prerequisites.map((req, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-emerald-400 font-mono">✔</span>
                  <span>{req}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        
        {/* Dynamic Step-by-Step Rendering Loop */}
        <div className="space-y-12">
          {tutorial.steps && tutorial.steps.length > 0 ? (
            tutorial.steps.map((step) => (
              <section key={step.num} className="border-l border-zinc-900 pl-6 relative">
                
                {/* Timeline Circle Badge */}
                <div className="absolute -left-3.5 top-0 bg-[#09090b] border border-zinc-800 text-zinc-500 font-mono text-[10px] w-7 h-7 rounded-full flex items-center justify-center">
                  {step.num}
                </div>

                <h2 className="text-xl font-bold font-mono text-zinc-100 tracking-tight mb-3">
                  {step.heading}
                </h2>

                <p className="text-zinc-400 text-sm md:text-base leading-relaxed mb-4 font-sans">
                  {step.content}
                </p>

                {step.codeSnippet && (
                  <div className="bg-zinc-950 border border-zinc-900 rounded-xl p-4 overflow-x-auto font-mono text-xs text-emerald-400 leading-relaxed mt-4 shadow-inner">
                    <div className="flex items-center justify-between border-b border-zinc-900/60 pb-2 mb-3 select-none text-[10px] text-zinc-600">
                      <span>// SYSTEM CODE CONFIGURATION</span>
                      <span>Terminal Stack</span>
                    </div>
                    <pre><code>{step.codeSnippet}</code></pre>
                  </div>
                )}

              </section>
            ))
          ) : (
            <p className="text-zinc-500 text-sm italic">This handbook does not contain any documentation steps yet.</p>
          )}
        </div>

      </div>
    </article>
    </>
  );
}