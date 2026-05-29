'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '', fullName: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      if (isSignUp) {
        const { error: signUpError } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: {
            data: { full_name: formData.fullName },
            emailRedirectTo: `${window.location.origin}/dashboard`,
          },
        });
        if (signUpError) throw signUpError;
        alert('Verification beacon deployed. Please check your developer inbox to confirm your keys!');
      } else {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        });
        if (signInError) throw signInError;
        window.location.href = '/dashboard';
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected structural connection loss occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  // 🌐 SOCIAL OAUTH PROVIDER HANDLER HANDSHAKE
  const handleSocialLogin = async (provider: 'github' | 'google') => {
    setError('');
    try {
      const { error: oauthError } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          // Send them to the console page automatically when the social loop resolves
          redirectTo: `${window.location.origin}/dashboard`,
        },
      });
      if (oauthError) throw oauthError;
    } catch (err: any) {
      setError(err.message || 'OAuth protocol verification failure.');
    }
  };

  return (
    <div className="w-full min-h-[calc(100vh-64px)] bg-[#09090b] text-zinc-100 flex flex-col justify-center items-center px-6 py-12 font-sans">
      
      {/* ENTERPRISE CALLOUT BANNER */}
      <div className="w-full max-w-md mb-6 bg-emerald-500/5 border border-emerald-500/10 rounded-xl p-4 text-center relative overflow-hidden">
        <p className="text-xs text-zinc-400 leading-normal">
          <span className="text-emerald-400 font-bold font-mono uppercase tracking-wider mr-1.5">[Enterprise Node]</span> 
          Deploying across an entire engineering org? 
          <Link href="/contact" className="text-white underline font-semibold ml-1 hover:text-emerald-400 transition">
            Contact Enterprise Sales
          </Link>
        </p>
      </div>

      {/* CORE AUTH CONTAINER CARD */}
      <div className="w-full max-w-md bg-black/40 border border-zinc-850 rounded-2xl p-6 sm:p-8 backdrop-blur-md shadow-2xl">
        
        {/* CONSOLE HEADERS */}
        <div className="mb-6">
          <div className="text-[9px] font-mono text-zinc-600 uppercase tracking-widest mb-1">// Core Identity verification gateway</div>
          <h2 className="text-2xl font-black font-mono tracking-tight text-white">
            SiftPrompt.<span className="text-emerald-500">{isSignUp ? 'register' : 'init'}</span>
          </h2>
        </div>

        {/* INPUT SUBMISSION CONSOLE FORM */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignUp && (
            <div className="space-y-1">
              <label className="block text-[10px] font-mono uppercase tracking-wider text-zinc-400">Full Name</label>
              <input 
                type="text" required disabled={isLoading} placeholder="Linus Torvalds" value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="w-full bg-zinc-950 border border-zinc-900 rounded-lg px-3 py-2 text-sm text-zinc-200 focus:outline-none focus:border-emerald-500/40 font-mono transition disabled:opacity-50"
              />
            </div>
          )}

          <div className="space-y-1">
            <label className="block text-[10px] font-mono uppercase tracking-wider text-zinc-400">Developer Email</label>
            <input 
              type="email" required disabled={isLoading} placeholder="name@domain.com" value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full bg-zinc-950 border border-zinc-900 rounded-lg px-3 py-2 text-sm text-zinc-200 focus:outline-none focus:border-emerald-500/40 font-mono transition disabled:opacity-50"
            />
          </div>

          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <label className="block text-[10px] font-mono uppercase tracking-wider text-zinc-400">Security Password</label>
            </div>
            <input 
              type="password" required disabled={isLoading} placeholder="••••••••••••" value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full bg-zinc-950 border border-zinc-900 rounded-lg px-3 py-2 text-sm text-zinc-200 focus:outline-none focus:border-emerald-500/40 transition disabled:opacity-50"
            />
          </div>

          {error && <p className="text-xs font-mono text-red-400 pt-1">⚠️ [Runtime Auth Failure]: {error}</p>}

          <button 
            type="submit" disabled={isLoading}
            className="w-full bg-zinc-900 hover:bg-zinc-850 text-emerald-400 font-mono text-xs font-bold uppercase tracking-widest py-2.5 px-4 rounded-lg border border-zinc-800 hover:border-emerald-500/20 active:scale-[0.99] transition mt-2 disabled:opacity-50"
          >
            {isLoading ? 'Processing Handshake...' : isSignUp ? 'Generate Dev Key →' : 'Establish Connect Link →'}
          </button>
        </form>

        {/* ──────────────────────────────────────────────────────────────────────────────
            OAUTH DIVIDER AND ACCENTED SOCIAL BUTTON MATRIX
            ────────────────────────────────────────────────────────────────────────────── */}
        <div className="relative my-6 flex items-center justify-center">
          <div className="absolute w-full border-t border-zinc-900" />
          <span className="relative bg-[#09090b] px-3 font-mono text-[9px] uppercase tracking-wider text-zinc-600">
            Or Sync Oauth Cluster
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {/* GITHUB LOGIN LINK */}
          <button
            onClick={() => handleSocialLogin('github')}
            disabled={isLoading}
            className="flex items-center justify-center gap-2 border border-zinc-900 bg-zinc-950 px-3 py-2 text-xs font-medium text-zinc-300 rounded-lg hover:bg-zinc-900 hover:text-white active:scale-[0.98] transition disabled:opacity-50 font-sans"
          >
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.008.069-.008 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
            </svg>
            GitHub
          </button>

          {/* GOOGLE LOGIN LINK */}
          <button
            onClick={() => handleSocialLogin('google')}
            disabled={isLoading}
            className="flex items-center justify-center gap-2 border border-zinc-900 bg-zinc-950 px-3 py-2 text-xs font-medium text-zinc-300 rounded-lg hover:bg-zinc-900 hover:text-white active:scale-[0.98] transition disabled:opacity-50 font-sans"
          >
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12.24 10.285V13.4h6.887c-.275 1.565-1.88 4.604-6.887 4.604-4.33 0-7.866-3.577-7.866-8s3.536-8 7.866-8c2.46 0 4.105 1.025 5.047 1.926l2.427-2.334C17.955 2.192 15.34 1 12.24 1c-6.075 0-11 4.925-11 11s4.925 11 11 11c6.34 0 10.55-4.433 10.55-10.712 0-.725-.075-1.275-.175-1.713H12.24z" />
            </svg>
            Google
          </button>
        </div>

        {/* INTER-STATE CONSOLE INTERCHANGING */}
        <div className="mt-6 pt-4 border-t border-zinc-950/60 text-center">
          <p className="text-xs text-zinc-500">
            {isSignUp ? 'Existing environment detected?' : 'New nodes scaling up?'}
            <button
              type="button" onClick={() => { setIsSignUp(!isSignUp); setError(''); }}
              className="text-zinc-300 hover:text-emerald-400 font-mono ml-1.5 underline transition"
            >
              {isSignUp ? 'Invoke Login' : 'Register Account'}
            </button>
          </p>
        </div>

      </div>
    </div>
  );
}