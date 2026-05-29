import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/app/utils/supabase';

// POST: Ingest metrics coming from the SDK client
export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Missing or malformed Authorization header credentials.' }, { status: 401 });
    }

    const apiKey = authHeader.split(' ')[1];
    if (apiKey !== 'sift_live_9381kdjf923847293847dfjksh') {
      return NextResponse.json({ error: 'Invalid master API key authorization credential.' }, { status: 403 });
    }

    const body = await request.json();
    const { mode, original_token_count, optimized_token_count, execution_time_ms, source_language } = body;
    const saved_tokens = original_token_count - optimized_token_count;

    const { error } = await supabaseAdmin
      .from('metrics')
      .insert([
        {
          mode,
          original_token_count,
          optimized_token_count,
          saved_tokens,
          execution_time_ms,
          source_language: source_language || 'en'
        }
      ]);

    if (error) {
      console.error("Supabase Insertion Error:", error.message);
      return NextResponse.json({ error: 'Internal database communication fault.' }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: 'Metrics saved permanently.' }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: 'Server Ingestion Runtime Exception Fault.' }, { status: 500 });
  }
}

// GET: Fetch records and process them precisely for the DashboardPage UI layout
export async function GET(request: NextRequest) {
  try {
    // 1. Intercept search parameters from the URL string
    const { searchParams } = new URL(request.url);
    const range = searchParams.get('range') || '7d'; // default fallback to 7 days

    // 2. Compute the dynamic UTC cutoff timestamp boundary
    const cutoffDate = new Date();
    if (range === '24h') {
      cutoffDate.setHours(cutoffDate.getHours() - 24);
    } else if (range === '7d') {
      cutoffDate.setDate(cutoffDate.getDate() - 7);
    } else if (range === '30d') {
      cutoffDate.setDate(cutoffDate.getDate() - 30);
    } else if (range === 'all') {
      // Set to epoch beginning to fetch absolute complete history
      cutoffDate.setTime(0);
    }

    // 3. Query Supabase with a conditional date filter condition (.gte = Greater Than or Equal To)
    const { data: dbLogs, error } = await supabaseAdmin
      .from('metrics')
      .select('*')
      .gte('logged_at', cutoffDate.toISOString())
      .order('logged_at', { ascending: false });

    if (error) {
      console.error("Supabase Telemetry Query Error:", error.message);
      return NextResponse.json({ error: 'Database transaction failure.' }, { status: 500 });
    }

    // 4. Run your existing structural data aggregations over the filtered subset
    let totalOriginal = 0;
    let totalOptimized = 0;
    let totalSaved = 0;
    let totalMs = 0;

    let chatCount = 0;
    let ragCount = 0;
    let agentCount = 0;
    let codegenCount = 0;

    dbLogs?.forEach(log => {
      totalOriginal += log.original_token_count;
      totalOptimized += log.optimized_token_count;
      totalSaved += log.saved_tokens;
      totalMs += log.execution_time_ms;

      if (log.mode === 'chat') chatCount++;
      else if (log.mode === 'rag') ragCount++;
      else if (log.mode === 'agent') agentCount++;
      else if (log.mode === 'codegen') codegenCount++;
    });

    const totalLogsCount = dbLogs?.length || 0;
    const averageRatio = totalOriginal > 0 ? ((totalSaved / totalOriginal) * 100).toFixed(1) : "0.0";
    
    // Simulating token pricing calculation ($0.002 per 1K tokens)
    const financialSavings = ((totalSaved / 1000) * 0.002).toFixed(4);

    return NextResponse.json({
      usage_summary: {
        tokens_ingested: totalOriginal.toLocaleString(),
        tokens_optimized: totalOptimized.toLocaleString(),
        raw_tokens_saved: totalSaved.toLocaleString(),
        average_compression_ratio: `${averageRatio}%`,
        estimated_cost_saved_usd: `$${financialSavings}`
      },
      profile_breakdown: {
        chat_mode_invocations: chatCount,
        rag_mode_invocations: ragCount,
        agent_mode_invocations: agentCount,
        codegen_mode_invocations: codegenCount
      },
      recent_logs: dbLogs || []
    }, { status: 200 });

  } catch (err) {
    return NextResponse.json({ error: 'An unexpected execution exception occurred.' }, { status: 500 });
  }
}