import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { articlesDatabase } from '../data';

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export async function generateStaticParams() {
  return Object.keys(articlesDatabase).map((id) => ({ id }));
}

// Advanced parser to style markdown blocks, multi-line code elements, and horizontal rules
function renderMarkdown(text: string) {
  const lines = text.split('\n');
  const renderedElements: React.ReactNode[] = [];
  
  let inCodeBlock = false;
  let codeBlockLines: string[] = [];
  let codeBlockLang = '';

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    // --- HANDLE MULTI-LINE FENCED CODE BLOCKS ---
    if (trimmed.startsWith('```') || (trimmed.startsWith('`') && (trimmed.includes('javascript') || trimmed.includes('python') || trimmed.includes('bash')))) {
      if (!inCodeBlock) {
        inCodeBlock = true;
        codeBlockLang = trimmed.replace(/[`\s]/g, '') || 'javascript';
        codeBlockLines = [];
      } else {
        inCodeBlock = false;
        renderedElements.push(
          <div key={`code-${i}`} className="my-6 border border-zinc-800 rounded-xl bg-black overflow-hidden shadow-2xl font-mono text-xs">
            <div className="bg-zinc-900/40 border-b border-zinc-800 px-4 py-2 flex items-center justify-between text-zinc-500 text-[11px]">
              <span>active_snippet.{codeBlockLang === 'javascript' ? 'js' : 'py'}</span>
              <span className="uppercase text-[10px] bg-zinc-800/50 px-1.5 py-0.5 rounded font-bold tracking-wider text-emerald-400">{codeBlockLang}</span>
            </div>
            <pre className="p-5 overflow-x-auto text-zinc-300 leading-relaxed bg-zinc-950/40 select-text">
              <code>{codeBlockLines.join('\n')}</code>
            </pre>
          </div>
        );
      }
      continue;
    }

    if (inCodeBlock) {
      codeBlockLines.push(line);
      continue;
    }

    // --- HANDLE HORIZONTAL RULE BREAKS (---) ---
    if (trimmed === '---') {
      renderedElements.push(<hr key={`hr-${i}`} className="my-8 border-t border-zinc-900" />);
      continue;
    }

    // --- HANDLE ISOLATED BLOCK MATH FORMULAS ($$Formula$$) ---
    if (trimmed.startsWith('$$') && trimmed.endsWith('$$')) {
      const cleanFormula = trimmed.replace(/\$\$/g, '').trim();
      renderedElements.push(
        <div key={`block-math-${i}`} className="my-6 p-4 bg-zinc-950/60 border border-zinc-900 rounded-xl text-center font-mono text-emerald-400 text-sm sm:text-base overflow-x-auto">
          {cleanFormula}
        </div>
      );
      continue;
    }

    // --- HANDLE H3 HEADERS (### Header) ---
    if (trimmed.startsWith('###') || (trimmed.startsWith('#') && !trimmed.startsWith('# '))) {
      const cleanHeader = trimmed.replace(/^[#\s]+/, '');
      renderedElements.push(
        <h3 key={`h3-${i}`} className="text-base font-bold text-zinc-100 font-mono mt-8 mb-3 tracking-tight flex items-center gap-2 text-emerald-400">
          <span className="text-zinc-700 font-normal">//</span> {cleanHeader}
        </h3>
      );
      continue;
    }

    // --- HANDLE H2 HEADERS (## Header) ---
    if (trimmed.startsWith('##')) {
      renderedElements.push(
        <h2 key={`h2-${i}`} className="text-xl font-extrabold text-white mt-10 mb-4 tracking-tight border-b border-zinc-900 pb-2">
          {trimmed.replace(/^##\s*/, '')}
        </h2>
      );
      continue;
    }

    // --- HANDLE BULLET LIST ITEMS (* Item or - Item) ---
    if (trimmed.startsWith('* ') || trimmed.startsWith('- ') || trimmed.startsWith('** ')) {
      const cleanItem = trimmed.replace(/^(\*\*\s*|\*\s*|-\s*)/, '');
      renderedElements.push(
        <div key={`list-bullet-${i}`} className="flex gap-3 text-zinc-300 text-sm sm:text-base my-2 pl-4">
          <span className="text-emerald-500/70 select-none">•</span>
          <div className="flex-1">{parseInlineFormatting(cleanItem)}</div>
        </div>
      );
      continue;
    }

    // --- HANDLE EMPTY SPACES ---
    if (!trimmed) {
      renderedElements.push(<div key={`space-${i}`} className="h-2" />);
      continue;
    }

    // --- STANDARD PARAGRAPHS ---
    renderedElements.push(
      <p key={`p-${i}`} className="text-zinc-300 text-sm sm:text-base leading-relaxed mb-4">
        {parseInlineFormatting(line)}
      </p>
    );
  }

  return renderedElements;
}

// Sub-processor to cleanly unwrap bold terms, inline math strings, and inline parameters
function parseInlineFormatting(text: string) {
  // Clean up dangling or repetitive bold artifacts sometimes left behind during line parses
  let sanitizedText = text.replace(/^:\*\*\s*/, '').replace(/:\*\*$/, '');

  // Split line using regex to segment bold blocks (**bold**), inline code (`code`), and inline math formulas ($math$)
  const parts = sanitizedText.split(/(\*\*.*?\*\*|`.*?`|\$.*?\$)/g);
  
  return parts.map((part, i) => {
    // 1. Process Bold Elements (**text**)
    if (part.startsWith('**') && part.endsWith('**')) {
      const cleanBold = part.slice(2, -2);
      return <strong key={i} className="text-white font-bold">{cleanBold}</strong>;
    }
    
    // 2. Process Inline Monospace Code Badges (`code`)
    if (part.startsWith('`') && part.endsWith('`')) {
      return (
        <code key={i} className="bg-zinc-950 text-emerald-400 border border-zinc-900/60 px-1.5 py-0.5 rounded text-xs font-mono mx-0.5">
          {part.slice(1, -1)}
        </code>
      );
    }

    // 3. Process Inline Math Math Sequences ($K=5$)
    if (part.startsWith('$') && part.endsWith('$')) {
      const cleanMath = part.slice(1, -1).replace(/\\text\{(.*?)\}/g, '$1'); // Cleans LaTeX \text fragments nicely
      return (
        <code key={i} className="font-mono text-emerald-400 bg-zinc-950/40 px-1 py-0.5 rounded text-xs sm:text-sm mx-0.5">
          {cleanMath}
        </code>
      );
    }

    return part;
  });
}

export default async function BlogArticlePage({ params }: Props) {
  const resolvedParams = await params;
  const article = articlesDatabase[resolvedParams.id];

  if (!article) {
    notFound();
  }

  const baseUrl = '[https://siftprompt.com](https://siftprompt.com)';
  const articleUrl = `${baseUrl}/blog/${article.id}`;

  const articleJsonLd = {
    "@context": "[https://schema.org](https://schema.org)",
    "@type": "BlogPosting",
    "headline": article.title,
    "description": article.excerpt,
    "datePublished": new Date(article.date).toISOString(),
    "author": {
      "@type": "Organization",
      "name": "SiftPrompt Engineering"
    },
    "publisher": {
      "@type": "Organization",
      "name": "SiftPrompt",
      "logo": {
        "@type": "ImageObject",
        "url": `${baseUrl}/logo.png`
      }
    },
    "mainEntityOfPage": articleUrl
  };

  const breadcrumbJsonLd = {
    "@context": "[https://schema.org](https://schema.org)",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Blog",
        "item": `${baseUrl}/blog`
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": article.title,
        "item": articleUrl
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <article className="w-full min-h-[calc(100vh-64px)] bg-[#09090b] text-zinc-100 py-16 font-sans">
        <div className="max-w-3xl mx-auto px-6">
          
          {/* VISUAL NAVIGATION CRUMB HEADER LAYER */}
          <nav className="font-mono text-[10px] text-zinc-600 mb-8 select-none flex items-center gap-2">
            <Link href="/blog" className="hover:text-zinc-400 transition">blog</Link>
            <span>/</span>
            <span className="text-emerald-500">{article.id}</span>
          </nav>

          {/* ARTICLE METADATA TOP BAR STRIP */}
          <header className="mb-10 pb-8 border-b border-zinc-900">
            <div className="font-mono text-xs text-zinc-500 mb-3 flex items-center gap-3">
              <span>{article.date}</span>
              <span className="text-zinc-700">•</span>
              <span>{article.readTime}</span>
              <span className="text-zinc-700">•</span>
              <span className="text-emerald-400 font-bold tracking-wider uppercase text-[10px]">{article.category}</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
              {article.title}
            </h1>
          </header>

          {/* SYSTEM DESCRIPTION RENDER ROW */}
          <div className="text-zinc-400 text-sm leading-relaxed mb-8 italic bg-zinc-950/40 border border-zinc-900 p-4 rounded-xl font-mono text-xs">
            <span className="text-zinc-600 block mb-1 font-bold">// Abstract Summary Telemetry:</span>
            "{article.excerpt}"
          </div>

          {/* PARSED MARKDOWN LAYOUT BOX PANEL */}
          <div className="max-w-none space-y-1">
            {renderMarkdown(article.body)}
          </div>

          {/* FOOTER NAV CONTAINER STRIP */}
          <footer className="mt-16 pt-8 border-t border-zinc-900">
            <Link 
              href="/blog" 
              className="font-mono text-xs text-emerald-400 hover:text-emerald-300 transition flex items-center gap-1.5"
            >
              <span>←</span> Return to telemetry archive logs
            </Link>
          </footer>

        </div>
      </article>
    </>
  );
}