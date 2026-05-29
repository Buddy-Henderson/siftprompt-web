import React from 'react';
import Link from 'next/link';

const tiers = [
  {
    name: 'Basic',
    price: 'FREE',
    description: 'Perfect for local debugging, open-source testing, and small hobby projects.',
    quota: '1,000 logs / mo',
    overage: '$0.001 per extra sync',
    cta: 'Get Free API Key',
    popular: false,
    link: 'https://rapidapi.com/siftprompt-siftprompt-default/api/sift6/pricing',
    features: [
      'Access to core SDK compression engine',
      'Unlimited local text minification',
      'Up to 1,000 monthly cloud sync logs',
      'Standard 24-hour dashboard range tracking',
    ],
  },
  {
    name: 'Pro',
    price: '$29.99',
    period: '/ month',
    description: 'Ideal for production indie apps, standard bots, and early-stage startup integrations.',
    quota: '50,000 logs / mo',
    overage: '$0.001 per extra sync',
    cta: 'Subscribe to Pro',
    popular: true, // Highlights this card with an emerald accent border
    link: 'https://rapidapi.com/siftprompt-siftprompt-default/api/sift6/pricing',
    features: [
      'Everything in Basic tier',
      'Expanded 50,000 cloud telemetry rows',
      'Full time-series data range filtering',
      'Advanced context-profile modes',
    ],
  },
  {
    name: 'Ultra',
    price: '$99.99',
    period: '/ month',
    description: 'Built for high-traffic platforms requiring massive real-time volume handling.',
    quota: '250,000 logs / mo',
    overage: '$0.001 per extra sync',
    cta: 'Subscribe to Ultra',
    popular: false,
    link: 'https://rapidapi.com/siftprompt-siftprompt-default/api/sift6/pricing',
    features: [
      'Everything in Pro tier',
      'Quarter-million cloud sync rows',
      'Complete raw data JSON export capabilities',
      'Priority email developer support',
    ],
  },
  {
    name: 'Mega',
    price: '$249.99',
    period: '/ month',
    description: 'Enterprise scale for large systems routing continuous prompt operations.',
    quota: '1,000,000 logs / mo',
    overage: '$0.001 per extra sync',
    cta: 'Subscribe to Mega',
    popular: false,
    link: 'https://rapidapi.com/siftprompt-siftprompt-default/api/sift6/pricing',
    features: [
      'Everything in Ultra tier',
      '1 million telemetry rows sync pool',
      'Persistent high-capacity data retention',
      'Dedicated integration architecture review',
    ],
  },
];

export default function PricingPage() {
  return (
    <div className="w-full min-h-[calc(100vh-64px)] bg-[#09090b] text-zinc-100 py-20 font-sans">
      {/* EXPANDED CONTAINER WIDTH FROM max-w-7xl TO max-w-[90rem] */}
      <div className="max-w-[90rem] mx-auto px-6">
      
        {/* HEADER ROW ZONE */}
        <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="text-xs font-mono text-emerald-400 uppercase tracking-widest mb-3">
            // Production Token Architecture Matrix
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4">
            Transparent, Usage-Based Tiers.
            </h1>
            <p className="text-zinc-400 text-sm md:text-base leading-relaxed">
            Deploy our drop-in SDK completely free. Local minification routines carry no resource usage cap, allowing you to scale your cloud telemetry logging pool effortlessly as your app expands.
            </p>
        </div>

        {/* 4-COLUMN CARDS LAYOUT CONTAINER */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
            {tiers.map((tier) => (
            <div
                key={tier.name}
                className={`flex flex-col bg-[#000000] border rounded-2xl p-6 transition relative ${
                tier.popular 
                    ? 'border-emerald-500 ring-1 ring-emerald-500/30' 
                    : 'border-zinc-800 hover:border-zinc-700'
                }`}
            >
                {/* "Most Popular" Ribbon Tag */}
                {tier.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-500 text-zinc-950 font-mono text-[10px] uppercase font-bold tracking-wider px-3 py-0.5 rounded-full shadow-md shadow-emerald-500/10">
                    Most Popular
                </span>
                )}

                {/* Core Identification Header */}
                <div className="mb-6">
                <h3 className="text-lg font-bold text-white mb-2 font-mono">{tier.name}</h3>
                <p className="text-xs text-zinc-400 leading-relaxed min-h-[48px]">
                    {tier.description}
                </p>
                </div>

                {/* Price Readout Area */}
                <div className="mb-6 border-b border-zinc-900 pb-6 flex items-baseline gap-1">
                <span className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">{tier.price}</span>
                {tier.period && <span className="text-xs text-zinc-500 font-mono">{tier.period}</span>}
                </div>

                {/* Crucial System Limit Metrics */}
                <div className="mb-6 space-y-1 font-mono text-xs">
                <div className="text-emerald-400 font-bold flex justify-between">
                    <span>Cloud Quota:</span>
                    <span>{tier.quota}</span>
                </div>
                <div className="text-zinc-500 flex justify-between">
                    <span>Overage Fee:</span>
                    <span>{tier.overage}</span>
                </div>
                </div>

                {/* Feature Bullets List Checkbox Grid */}
                <ul className="space-y-3 mb-8 flex-grow text-xs text-zinc-400 leading-normal">
                {tier.features.map((feat, index) => (
                    <li key={index} className="flex items-start gap-2">
                    <span className="text-emerald-400 flex-shrink-0 select-none">✓</span>
                    <span>{feat}</span>
                    </li>
                ))}
                </ul>

                {/* Action Call To Action Button Anchor */}
                <Link
                href={tier.link} // FIXED: Changed from "https://rapidapi.com" to evaluate the array variable!
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full py-2.5 rounded-xl text-xs font-semibold tracking-wide text-center transition active:scale-98 ${
                    tier.popular
                    ? 'bg-emerald-500 text-zinc-950 hover:bg-emerald-400 font-bold'
                    : 'bg-zinc-900 text-zinc-200 border border-zinc-800 hover:bg-zinc-800 hover:text-white'
                }`}
                >
                {tier.cta}
                </Link>
            </div>
            ))}
        </div>

        {/* FOOTER METRIC NOTE ZONE */}
        <div className="mt-12 text-center text-xs font-mono text-zinc-600 bg-zinc-950 p-4 border border-zinc-900/60 rounded-xl max-w-4xl mx-auto">
            <span className="text-zinc-500 font-bold">API Integration Architecture Note:</span> Telemetry packets route securely to your account workspace databases via protected server gateways. Core minification operates natively inside local runtimes with zero transmission boundaries.
        </div>
        </div>
    </div>
  );
}