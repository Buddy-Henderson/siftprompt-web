'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  
  // Simulated authentication state for local design verification
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  // Close dropdown if user clicks anywhere else on the screen
  useEffect(() => {
    const handleOutsideClick = () => setDropdownOpen(false);
    if (dropdownOpen) {
      window.addEventListener('click', handleOutsideClick);
    }
    return () => window.removeEventListener('click', handleOutsideClick);
  }, [dropdownOpen]);

  return (
    // 1. CHANGED: Fixed container color token to absolute app theme dark (#09090b)
    <header className="sticky top-0 z-50 w-full border-b border-zinc-900 bg-[#09090b]/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        
        {/* Left Side: Brand Logo */}
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-3 font-mono text-lg font-bold tracking-tight text-white group">
            
            {/* 2. CHANGED: Swapped lightning bolt box with your custom wireframe favicon asset */}
            <div className="w-7 h-7 rounded-lg bg-zinc-950 border border-zinc-900 flex items-center justify-center p-1 shadow-inner shadow-emerald-500/10 group-hover:border-emerald-400/30 transition">
              <img 
                src="/favicon.png" 
                alt="SiftPrompt Funnel Logo" 
                className="w-full h-full object-contain"
              />
            </div>

            <span>
              siftprompt<span className="text-emerald-400 font-medium">.com</span>
            </span>
          </Link>
        </div>

        {/* Right Side: Main Navigation Links */}
        <nav className="flex items-center gap-6 text-sm font-medium text-zinc-400">
          <Link href="/" className="transition-colors hover:text-white">
            Home
          </Link>
          <Link href="/how-it-works" className="transition-colors hover:text-white">
            How it works
          </Link>
          <Link href="/docs" className="transition-colors hover:text-white">
            Docs
          </Link>
          <Link href="/examples" className="transition-colors hover:text-white">
            Examples
          </Link>
          <Link href="/pricing" className="transition-colors hover:text-white">
            API | Pricing
          </Link>

          {/* Interactive "More" Dropdown Trigger */}
          <div className="relative" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-1 transition-colors hover:text-white focus:outline-none"
            >
              More
              <svg
                className={`h-4 w-4 transform transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Dropdown Card Grid */}
            {dropdownOpen && (
              <div className="absolute right-0 mt-3 w-48 rounded-lg border border-zinc-800 bg-zinc-900 p-2 shadow-xl ring-1 ring-black ring-opacity-5 animate-in fade-in slide-in-from-top-1 duration-150">
                <Link
                  href="/blog"
                  className="block rounded-md px-3 py-2 text-zinc-300 hover:bg-zinc-800 hover:text-white"
                  onClick={() => setDropdownOpen(false)}
                >
                  Blog
                </Link>
                <Link
                  href="/tutorials"
                  className="block rounded-md px-3 py-2 text-zinc-300 hover:bg-zinc-800 hover:text-white"
                  onClick={() => setDropdownOpen(false)}
                >
                  Tutorials
                </Link>
                <div className="my-1 border-t border-zinc-800"></div>
                <Link
                  href="/contact"
                  className="block rounded-md px-3 py-2 text-zinc-300 hover:bg-zinc-800 hover:text-white"
                  onClick={() => setDropdownOpen(false)}
                >
                  Contact us
                </Link>
              </div>
            )}
          </div>

          {/* ──────────────────────────────────────────────────────────────────────────────
              DEVELOPER ONLY LOGICAL TESTING TOGGLE
              ────────────────────────────────────────────────────────────────────────────── */}
          <span 
            onClick={() => setIsLoggedIn(!isLoggedIn)} 
            className="text-[10px] font-mono text-zinc-600 cursor-pointer hover:text-zinc-400 transition-colors select-none px-1 border-l border-zinc-850"
            title="Click to toggle between Guest and User state"
          >
            [{isLoggedIn ? 'User' : 'Guest'}]
          </span>

          {/* ──────────────────────────────────────────────────────────────────────────────
              DYNAMIC AUTHENTICATION GATEWAY CONTROL HUB
              ────────────────────────────────────────────────────────────────────────────── */}
          {!isLoggedIn ? (
            <>
              {/* VISITOR/GUEST STATE: CLEAN INBOUND ONBOARDING LINKS */}
              <Link 
                href="/auth" 
                className="text-xs font-mono font-bold bg-zinc-900 text-emerald-400 border border-zinc-850 px-3 py-1.5 rounded-lg hover:bg-zinc-850 transition select-none"
              >
                // Connect Node
              </Link>
              <Link
                href="/auth"
                className="rounded-md bg-zinc-100 px-3.5 py-1.5 text-xs font-semibold text-zinc-950 transition-all hover:bg-white active:scale-95 font-sans select-none"
              >
                Launch App
              </Link>
            </>
          ) : (
            <>
              {/* AUTHENTICATED STATE: DIRECT RUNTIME DASHBOARD NAVIGATION ACCENT */}
              <Link
                href="/dashboard"
                className="transition-colors text-xs font-mono font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1.5 select-none"
              >
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                Console
              </Link>
              
              {/* ACCOUNT DEACTIVATOR INTERACTIVE SIGN-OUT MOCK AVATAR */}
              <div
                onClick={() => setIsLoggedIn(false)}
                className="w-7 h-7 rounded-full bg-zinc-900 border border-zinc-800 hover:border-red-500/40 transition-colors cursor-pointer flex items-center justify-center text-[9px] font-mono font-bold text-zinc-500 hover:text-red-400"
                title="Disconnect Session"
              >
                EXIT
              </div>
            </>
          )}

        </nav>

      </div>
    </header>
  );
}