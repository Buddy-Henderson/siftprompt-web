import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/app/utils/supabase';

export async function GET(request: NextRequest) {
  try {
    // 1. Authenticate the developer using the API key header
    const authHeader = request.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Unauthorized. Missing or malformed Bearer token.' }, 
        { status: 401 }
      );
    }

    const apiKey = authHeader.split(' ')[1];
    // In production, you would look up this key in a 'users' or 'keys' table.
    // For now, validating against your master staging token string.
    if (apiKey !== 'sift_live_9381kdjf923847293847dfjksh') {
      return NextResponse.json(
        { error: 'Forbidden. Invalid API key credential.' }, 
        { status: 403 }
      );
    }

    // 2. Fetch the telemetry records from Supabase
    const { data: dbLogs, error } = await supabaseAdmin
      .from('metrics')
      .select('mode, original_token_count, optimized_token_count, saved_tokens, execution_time_ms, source_language, logged_at')
      .order('logged_at', { ascending: false });

    if (error) {
      console.error("Supabase Query Error:", error.message);
      return NextResponse.json(
        { error: 'Internal server error processing database query.' }, 
        { status: 500 }
      );
    }

    // 3. Aggregate clean metrics for external developer usage
    let totalOriginal = 0;
    let totalOptimized = 0;
    let totalSaved = 0;
    let totalMs = 0;

    dbLogs?.forEach(log => {
      totalOriginal += log.original_token_count;
      totalOptimized += log.optimized_token_count;
      totalSaved += log.saved_tokens;
      totalMs += log.execution_time_ms;
    });

    const count = dbLogs?.length || 0;

    // 4. Return a highly professional, standard API response payload
    return NextResponse.json({
      object: "analytics_summary",
      meta: {
        total_records: count,
        retrieved_at: new Date().toISOString()
      },
      stats: {
        tokens_ingested: totalOriginal,
        tokens_optimized: totalOptimized,
        tokens_saved: totalSaved,
        avg_compression_percentage: totalOriginal > 0 ? Number(((totalSaved / totalOriginal) * 100).toFixed(2)) : 0,
        avg_latency_ms: count > 0 ? Number((totalMs / count).toFixed(2)) : 0
      },
      data: dbLogs || []
    }, { status: 200 });

  } catch (err) {
    return NextResponse.json(
      { error: 'An unexpected runtime error occurred.' }, 
      { status: 500 }
    );
  }
}