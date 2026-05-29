"use client";

import React, { useState, useEffect } from 'react';

interface MetricLog {
  id: string;
  mode: string;
  original_token_count: number;
  optimized_token_count: number;
  saved_tokens: number;
  execution_time_ms: number;
  source_language: string;
  logged_at: string;
}

interface DashboardData {
  usage_summary: {
    tokens_ingested: string;
    tokens_optimized: string;
    raw_tokens_saved: string;
    average_compression_ratio: string;
    estimated_cost_saved_usd: string;
  };
  profile_breakdown: {
    chat_mode_invocations: number;
    rag_mode_invocations: number;
    agent_mode_invocations: number;
    codegen_mode_invocations: number;
  };
  recent_logs: MetricLog[];
}

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  
  // NEW STATE: Tracks selected time window
  const [selectedRange, setSelectedRange] = useState<string>('7d');

  // Fetch metrics whenever selectedRange state modifies
  useEffect(() => {
    async function fetchMetrics() {
      try {
        setIsLoading(true);
        // Pass range as a standard API query parameter string
        const response = await fetch(`/api/v1/metrics?range=${selectedRange}`);
        if (!response.ok) throw new Error("API retrieval failure code mapping status.");
        
        const payload = await response.json();
        setData(payload);
      } catch (err) {
        console.error("Dashboard calculation pipeline broken:", err);
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchMetrics();
  }, [selectedRange]); // Depend on selectedRange to automatically trigger a refetch!

  return (
    <div className="w-full min-h-screen bg-[#09090b] text-zinc-100 p-6 md:p-12 font-sans selection:bg-emerald-500/20">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* INTERACTIVE DASHBOARD HEADER BAR */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-zinc-900 pb-6">
          <div>
            <div className="text-xs font-mono text-emerald-400 tracking-widest uppercase mb-1">// REALTIME MONITOR MATRIX</div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">Platform Command Center</h1>
          </div>

          {/* NEW FILTER SELECTOR DROP-DOWN */}
          <div className="flex items-center gap-2 font-mono text-xs text-zinc-400 shrink-0">
            <span>⏱️ Time Window:</span>
            <select
              value={selectedRange}
              onChange={(e) => setSelectedRange(e.target.value)}
              className="bg-zinc-950 border border-zinc-800 text-zinc-200 px-3 py-1.5 rounded-lg focus:outline-none focus:border-emerald-500 transition cursor-pointer font-bold"
            >
              <option value="24h">Past 24 Hours</option>
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
              <option value="all">All-Time History</option>
            </select>
          </div>
        </div>

        {isLoading ? (
          <div className="min-h-[400px] flex items-center justify-center font-mono text-xs text-zinc-500">
            // Reloading matrix variables using fresh timestamp constraints...
          </div>
        ) : data ? (
          <div className="space-y-8 animate-in fade-in duration-300">
            
            {/* GRID SUMMARY COUNTERS ROW */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-zinc-950 border border-zinc-900 p-5 rounded-xl space-y-1">
                <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">Tokens Ingested</div>
                <div className="text-xl font-bold tracking-tight text-white">{data.usage_summary.tokens_ingested}</div>
              </div>
              <div className="bg-zinc-950 border border-zinc-900 p-5 rounded-xl space-y-1">
                <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">Tokens Optimized</div>
                <div className="text-xl font-bold tracking-tight text-emerald-400">{data.usage_summary.tokens_optimized}</div>
              </div>
              <div className="bg-zinc-950 border border-zinc-900 p-5 rounded-xl space-y-1">
                <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">Total Saved</div>
                <div className="text-xl font-bold tracking-tight text-white">{data.usage_summary.raw_tokens_saved} ({data.usage_summary.average_compression_ratio})</div>
              </div>
              <div className="bg-zinc-950 border border-zinc-900 p-5 rounded-xl space-y-1">
                <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">Capital Retained</div>
                <div className="text-xl font-bold tracking-tight text-amber-400">{data.usage_summary.estimated_cost_saved_usd} <span className="text-[10px] text-zinc-500">USD</span></div>
              </div>
            </div>

            {/* SPLIT LAYOUT AREA */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* PROFILE MODE DISTRIBUTION METERS */}
              <div className="bg-zinc-950 border border-zinc-900 p-6 rounded-xl space-y-4">
                <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">// Profile Distribution Invocations</div>
                <div className="space-y-3 font-mono text-xs text-zinc-300">
                  <div className="flex justify-between border-b border-zinc-900 pb-1.5">
                    <span>💬 CHAT Profile:</span>
                    <span className="text-white font-bold">{data.profile_breakdown.chat_mode_invocations}</span>
                  </div>
                  <div className="flex justify-between border-b border-zinc-900 pb-1.5">
                    <span>📚 RAG Engine:</span>
                    <span className="text-white font-bold">{data.profile_breakdown.rag_mode_invocations}</span>
                  </div>
                  <div className="flex justify-between border-b border-zinc-900 pb-1.5">
                    <span>🤖 AGENT Routing:</span>
                    <span className="text-white font-bold">{data.profile_breakdown.agent_mode_invocations}</span>
                  </div>
                  <div className="flex justify-between pb-1">
                    <span>💻 CODEGEN Stack:</span>
                    <span className="text-white font-bold">{data.profile_breakdown.codegen_mode_invocations}</span>
                  </div>
                </div>
              </div>

              {/* RECENT TRANSACTION STREAM LOG TABLE */}
              <div className="bg-zinc-950 border border-zinc-900 p-6 rounded-xl lg:col-span-2 flex flex-col space-y-3">
                <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider border-b border-zinc-900 pb-2">// Intercepted Transaction Telemetry Stream</div>
                <div className="space-y-2 font-mono text-[11px] overflow-y-auto max-h-[220px] pr-1">
                  {data.recent_logs.length === 0 ? (
                    <div className="text-zinc-600 text-center py-8">// No metric payload rows logged within this specific date constraint frame</div>
                  ) : (
                    data.recent_logs.map((log) => (
                      <div key={log.id} className="flex items-center justify-between border-b border-zinc-900/50 pb-2 last:border-0">
                        <div className="flex items-center gap-2">
                          <span className="text-emerald-400 bg-emerald-500/5 border border-emerald-500/10 px-1.5 py-0.5 rounded text-[10px] font-bold uppercase">{log.mode}</span>
                          <span className="text-zinc-300">-{log.saved_tokens.toLocaleString()} tokens</span>
                        </div>
                        <div className="flex items-center gap-4 text-zinc-500">
                          <span>lang: {log.source_language}</span>
                          <span>{log.execution_time_ms}ms</span>
                          <span className="text-zinc-600 text-[10px]">
                            {new Date(log.logged_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                          </span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

            </div>

          </div>
        ) : (
          <div className="text-center py-12 text-zinc-500 font-mono text-xs">
            ❌ Core telemetry data feed unavailable. Check cloud dashboard integrations.
          </div>
        )}
      </div>
    </div>
  );
}