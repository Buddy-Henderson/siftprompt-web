"use client";

import React, { useState } from 'react';
import { SiftOptimizer } from '@/app/utils/sift-sdk-mock';

export default function TestSdkPage() {
  const [logStatus, setLogStatus] = useState<string>("Ready to transmit...");
  const [buttonLoading, setButtonLoading] = useState<boolean>(false);

  const executeMockSdkCall = async () => {
    try {
      setButtonLoading(true);
      setLogStatus("Initializing SiftOptimizer module instance...");

      // 1. Instantiate our built-in pre-made class library asset
      const sift = new SiftOptimizer({
        apiKey: 'sift_live_9381kdjf923847293847dfjksh',
        baseUrl: window.location.origin // Automatically points to http://localhost:3000
      });

      setLogStatus("Running local regex minification routines...");

      // A mock payload simulating a messy developer code repository prompt submission
      const messyCodegenPrompt = `
        // TODO: Refactor this processing array loop before production release v2
        function aggregateMetricsData(inputArray) {
          // Inline comments will be stripped away locally by the SDK engine
          const baseMultiplier = 1.42; 
          return inputArray.map(val => val * baseMultiplier);
        }
      `;

      // 2. Fire the local compression task
      const result = await sift.compress(messyCodegenPrompt, {
        mode: 'codegen',
        language: 'en'
      });

      setLogStatus(`Success! Optimized local token volume down to ${result.metrics.optimizedTokens} units. Metrics dispatched asynchronously to cloud telemetry api gateway.`);
    } catch (err) {
      setLogStatus(`Execution failure: ${err instanceof Error ? err.message : 'Unknown exception'}`);
    } finally {
      setButtonLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#09090b] text-zinc-100 flex flex-col items-center justify-center p-6 font-mono text-xs">
      <div className="max-w-md w-full bg-zinc-950 border border-zinc-900 rounded-xl p-6 space-y-4 shadow-xl">
        <div className="space-y-1">
          <div className="text-emerald-400 font-bold">// LOCAL SDK STAGING COMPILER</div>
          <h1 className="text-sm font-bold text-white font-sans">Simulate Inbound App Client Ingestion</h1>
        </div>
        
        <p className="text-zinc-400 leading-relaxed text-[11px]">
          Clicking the trigger below executes our internal class logic module, compresses a text snippet locally in less than 2ms, and ships the resulting background log metrics straight to our shared database layer.
        </p>

        <button
          onClick={executeMockSdkCall}
          disabled={buttonLoading}
          className="w-full bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-sans font-bold py-2 rounded-lg transition disabled:opacity-40"
        >
          {buttonLoading ? "Processing Core..." : "Fire SDK Compression Task"}
        </button>

        <div className="bg-zinc-900/50 border border-zinc-850 p-3 rounded-lg text-zinc-400 text-[11px] leading-relaxed break-words">
          <span className="text-zinc-600 font-bold">STATUS:</span> {logStatus}
        </div>
      </div>
    </main>
  );
}