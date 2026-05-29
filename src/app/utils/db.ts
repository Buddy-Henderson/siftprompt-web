// A secure, in-memory database store that persists while your local dev server runs.
export interface MetricEntry {
  id: string;
  mode: 'chat' | 'rag' | 'agent' | 'codegen';
  original_token_count: number;
  optimized_token_count: number;
  saved_tokens: number;
  execution_time_ms: number;
  source_language: string;
  logged_at: string;
}

// Global variable tracking array to simulate database rows
let metricsDatabase: MetricEntry[] = [
  // Pre-seed with some baseline historical data rows so it's not empty
  { id: '1', mode: 'rag', original_token_count: 5000, optimized_token_count: 3100, saved_tokens: 1900, execution_time_ms: 45, source_language: 'en', logged_at: new Date(Date.now() - 3600000 * 3).toISOString() },
  { id: '2', mode: 'codegen', original_token_count: 1200, optimized_token_count: 800, saved_tokens: 400, execution_time_ms: 22, source_language: 'en', logged_at: new Date(Date.now() - 3600000 * 2).toISOString() },
  { id: '3', mode: 'chat', original_token_count: 3500, optimized_token_count: 2100, saved_tokens: 1400, execution_time_ms: 18, source_language: 'es', logged_at: new Date(Date.now() - 3600000 * 1).toISOString() }
];

export const mockDb = {
  // Method to fetch all recorded database rows
  getAll: (): MetricEntry[] => {
    return metricsDatabase;
  },

  // Method to insert a new telemetry log row from the SDK
  insert: (entry: Omit<MetricEntry, 'id' | 'saved_tokens' | 'logged_at'>): MetricEntry => {
    const saved_tokens = entry.original_token_count - entry.optimized_token_count;
    const newRow: MetricEntry = {
      ...entry,
      id: Math.random().toString(36).substring(2, 9),
      saved_tokens,
      logged_at: new Date().toISOString()
    };
    
    // Push directly into our running application memory store array
    metricsDatabase.unshift(newRow); // Adds to the top of the array so newest logs show first
    return newRow;
  },

  // Method to compute aggregated real-time summary statistics
  getSummary: () => {
    let totalIngested = 0;
    let totalOptimized = 0;
    let totalSaved = 0;
    let chatCount = 0, ragCount = 0, agentCount = 0, codegenCount = 0;

    metricsDatabase.forEach(row => {
      totalIngested += row.original_token_count;
      totalOptimized += row.optimized_token_count;
      totalSaved += row.saved_tokens;

      if (row.mode === 'chat') chatCount++;
      if (row.mode === 'rag') ragCount++;
      if (row.mode === 'agent') agentCount++;
      if (row.mode === 'codegen') codegenCount++;
    });

    const ratio = totalIngested > 0 ? ((totalSaved / totalIngested) * 100).toFixed(1) + '%' : '0%';
    // Baseline calculations mapping to modern LLM input costs (e.g., ~$3 per million tokens)
    const costSavedUsd = (totalSaved / 1000000) * 3; 

    return {
      tokens_ingested: totalIngested.toLocaleString(),
      tokens_optimized: totalOptimized.toLocaleString(),
      raw_tokens_saved: totalSaved.toLocaleString(),
      average_compression_ratio: ratio,
      estimated_cost_saved_usd: `$${costSavedUsd.toFixed(2)}`,
      breakdown: {
        chat_mode_invocations: chatCount,
        rag_mode_invocations: ragCount,
        agent_mode_invocations: agentCount,
        codegen_mode_invocations: codegenCount
      },
      recent_logs: metricsDatabase.slice(0, 5) // Return the 5 most recent requests
    };
  }
};