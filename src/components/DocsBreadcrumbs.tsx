import React from 'react';
import Link from 'next/link';

// Define what a single breadcrumb item looks like
interface BreadcrumbItem {
  name: string;
  path: string;
}

interface Props {
  items: BreadcrumbItem[];
}

export default function DocsBreadcrumbs({ items }: Props) {
  const baseUrl = 'https://siftprompt.com';

  // Format the visual paths for Google's JSON-LD structure
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": `${baseUrl}${item.path}`
    }))
  };

  return (
    <>
      {/* Invisible Search Engine Schema Layer */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Visible User Interface UI Layer */}
      <nav className="flex items-center gap-2 font-mono text-xs text-zinc-500 mb-6 select-none">
        <Link href="/docs" className="hover:text-emerald-400 transition">
          docs
        </Link>
        
        {items.map((item, index) => (
          <React.Fragment key={index}>
            <span className="text-zinc-700">/</span>
            {index === items.length - 1 ? (
              // Active page text (not a link)
              <span className="text-zinc-300">{item.name.toLowerCase()}</span>
            ) : (
              // Middle tracking folder links
              <Link href={item.path} className="hover:text-emerald-400 transition">
                {item.name.toLowerCase()}
              </Link>
            )}
          </React.Fragment>
        ))}
      </nav>
    </>
  );
}