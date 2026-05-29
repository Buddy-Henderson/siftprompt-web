'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Simulated authentication state for local design verification
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  // Close desktop dropdown if user clicks anywhere else
  useEffect(() => {
    const handleOutsideClick = () => setDropdownOpen(false);
    if (dropdownOpen) {
      window.addEventListener('click', handleOutsideClick);
    }
    return () => window.removeEventListener('click', handleOutsideClick);
  }, [dropdownOpen]);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-900 bg-[#09090b]/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        
        {/* Left Side: Brand Logo */}
        <Link href="/" className="flex items-center gap-3 font-mono text-lg font-bold tracking-tight text-white group">
          <div className="w-7 h-7 rounded-lg bg-zinc-950 border border-zinc-900 flex items-center justify-center p-1 shadow-inner shadow-emerald-500/10 group-hover:border-emerald-400/30 transition min-w-[28px]">
            <img 
              src="/favicon.png" 
              alt="SiftPrompt Funnel Logo" 
              className="w-full h-full object-contain"
            />
          </div>
          {/* Hide the text on very small mobile screens so your priority links fit */}
          <span className="hidden sm:block">
            siftprompt<span className="text-emerald-400 font-medium">.com</span>
          </span>
        </Link>

        {/* Right Side: Navigation Container */}
        <div className="flex items-center gap-3 md:gap-6">
          
          {/* ──────────────────────────────────────────────────────────────
              ALWAYS VISIBLE LINKS (Mobile & Desktop)
              ────────────────────────────────────────────────────────────── */}
          <nav className="flex items-center gap-3 md:gap-6 text-xs md:text-sm font-medium text-zinc-400">
            <Link href="/" className="transition-colors hover:text-white">Home</Link>
            
            {/* "How it works" - Hidden on mobile, visible on desktop */}
            <Link href="/how-it-works" className="hidden md:block transition-colors hover:text-white">
              How it works
            </Link>

            <Link href="/docs" className="transition-colors hover:text-white">Docs</Link>
            
            {/* "Examples" - Hidden on mobile, visible on desktop */}
            <Link href="/examples" className="hidden md:block transition-colors hover:text-white">
              Examples
            </Link>

            {/* Pricing - Truncated on mobile to save space */}
            <Link href="/pricing" className="transition-colors hover:text-white whitespace-nowrap">
              <span className="hidden sm:inline">API | </span>Pricing
            </Link>
          </nav>

          {/* ──────────────────────────────────────────────────────────────
              DESKTOP ONLY SECTION (More Dropdown + Auth)
              ────────────────────────────────────────────────────────────── */}
          <div className="hidden md:flex items-center gap-6">
            
            {/* Desktop "More" Dropdown */}
            <div className="relative text-sm font-medium text-zinc-400" onClick={(e) => e.stopPropagation()}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-1 transition-colors hover:text-white focus:outline-none"
              >
                More
                <svg
                  className={`h-4 w-4 transform transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`}
                  fill="none" viewBox="0 0 24 24" stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-3 w-48 rounded-lg border border-zinc-800 bg-zinc-900 p-2 shadow-xl ring-1 ring-black ring-opacity-5 animate-in fade-in slide-in-from-top-1 duration-150">
                  <Link href="/blog" className="block rounded-md px-3 py-2 text-zinc-300 hover:bg-zinc-800 hover:text-white" onClick={() => setDropdownOpen(false)}>Blog</Link>
                  <Link href="/tutorials" className="block rounded-md px-3 py-2 text-zinc-300 hover:bg-zinc-800 hover:text-white" onClick={() => setDropdownOpen(false)}>Tutorials</Link>
                  <div className="my-1 border-t border-zinc-800"></div>
                  <Link href="/contact" className="block rounded-md px-3 py-2 text-zinc-300 hover:bg-zinc-800 hover:text-white" onClick={() => setDropdownOpen(false)}>Contact us</Link>
                </div>
              )}
            </div>

            {/* Desktop Auth Controls */}
            <span onClick={() => setIsLoggedIn(!isLoggedIn)} className="text-[10px] font-mono text-zinc-600 cursor-pointer hover:text-zinc-400 transition-colors select-none px-1 border-l border-zinc-850">
              [{isLoggedIn ? 'User' : 'Guest'}]
            </span>

            {!isLoggedIn ? (
              <div className="flex gap-2">
                <Link href="/auth" className="text-xs font-mono font-bold bg-zinc-900 text-emerald-400 border border-zinc-850 px-3 py-1.5 rounded-lg hover:bg-zinc-850 transition select-none">
                  Signup/Login
                </Link>
                <Link href="/auth" className="rounded-md bg-zinc-100 px-3.5 py-1.5 text-xs font-semibold text-zinc-950 transition-all hover:bg-white active:scale-95 font-sans select-none">
                  Launch App
                </Link>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Link href="/dashboard" className="transition-colors text-xs font-mono font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1.5 select-none">
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" /> Console
                </Link>
                <div onClick={() => setIsLoggedIn(false)} className="w-7 h-7 rounded-full bg-zinc-900 border border-zinc-800 hover:border-red-500/40 transition-colors cursor-pointer flex items-center justify-center text-[9px] font-mono font-bold text-zinc-500 hover:text-red-400" title="Disconnect Session">
                  EXIT
                </div>
              </div>
            )}
          </div>

          {/* ──────────────────────────────────────────────────────────────
              MOBILE HAMBURGER TRIGGER
              ────────────────────────────────────────────────────────────── */}
          <button 
            className="md:hidden text-zinc-400 hover:text-white p-1"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {/* Simple Hamburger/Close SVG for cleaner look */}
            {mobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
            )}
          </button>
        </div>
      </div>

      {/* ──────────────────────────────────────────────────────────────
          MOBILE HAMBURGER DROPDOWN CONTENT
          ────────────────────────────────────────────────────────────── */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-zinc-900 bg-zinc-950 p-4 flex flex-col gap-4 text-sm font-medium text-zinc-400 animate-in fade-in slide-in-from-top-2">
          <Link href="/how-it-works" onClick={() => setMobileMenuOpen(false)}>How it works</Link>
          <Link href="/examples" onClick={() => setMobileMenuOpen(false)}>Examples</Link>
          
          <div className="border-t border-zinc-900 pt-4 flex flex-col gap-4">
            <span className="text-xs text-zinc-600 font-mono uppercase tracking-wider">More</span>
            <Link href="/blog" onClick={() => setMobileMenuOpen(false)}>Blog</Link>
            <Link href="/tutorials" onClick={() => setMobileMenuOpen(false)}>Tutorials</Link>
            <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>Contact us</Link>
          </div>

          <div className="border-t border-zinc-900 pt-4 flex flex-col gap-3">
             {/* Mobile Auth State */}
             {!isLoggedIn ? (
              <>
                <Link href="/auth" className="text-center text-xs font-mono font-bold bg-zinc-900 text-emerald-400 border border-zinc-850 px-3 py-2 rounded-lg" onClick={() => setMobileMenuOpen(false)}>
                  Signup/Login
                </Link>
                <Link href="/auth" className="text-center rounded-md bg-zinc-100 px-3 py-2 text-xs font-semibold text-zinc-950" onClick={() => setMobileMenuOpen(false)}>
                  Launch App
                </Link>
              </>
            ) : (
              <div className="flex justify-between items-center bg-zinc-900/50 p-3 rounded-lg border border-zinc-800">
                <Link href="/dashboard" className="text-xs font-mono font-bold text-emerald-400 flex items-center gap-2" onClick={() => setMobileMenuOpen(false)}>
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" /> Console
                </Link>
                <div onClick={() => { setIsLoggedIn(false); setMobileMenuOpen(false); }} className="text-[10px] font-mono text-zinc-500 hover:text-red-400 cursor-pointer">
                  [EXIT]
                </div>
              </div>
            )}
            
            {/* Testing Toggle for Mobile */}
            <div className="mt-2 text-center text-[10px] font-mono text-zinc-600" onClick={() => setIsLoggedIn(!isLoggedIn)}>
               Toggle Test State: {isLoggedIn ? 'User' : 'Guest'}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}