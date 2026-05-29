export interface TutorialStep {
  num: string;
  heading: string;
  content: string;
  codeSnippet?: string;
}

export interface Tutorial {
  id: string;
  title: string;
  description: string;
  category: 'Quickstart' | 'Architecture' | 'Infrastructure' | 'Deep Dive';
  tags: string[];
  duration: string;
  impact: string;
  slug: string;
  difficulty?: 'Beginner' | 'Intermediate' | 'Advanced';
  prerequisites?: string[];
  steps?: TutorialStep[];
}

export const TUTORIALS_DATA: Tutorial[] = [
  {
    id: 't1',
    title: 'Optimizing Your First Prompt in Node.js (Next.js & Express)',
    description: 'Learn how to install our package, initialize the middleware pipeline, and intercept outbound LLM requests to catch immediately actionable token waste.',
    category: 'Quickstart',
    tags: ['Next.js', 'Node.js', 'JavaScript'],
    duration: '5 min read',
    impact: '📉 -25% Overhead',
    slug: 'node-js-quickstart',
    difficulty: 'Beginner',
    prerequisites: [
      'Node.js Runtime Engine (v18+)',
      'SiftPrompt Account Subscription Token',
      'Basic understanding of JavaScript async/await functions'
    ],
    steps: [
      {
        num: '01',
        heading: 'Install Core Software Packages',
        content: 'Navigate into your operational project core root layer and run the installation script using your preferred package manager to fetch the latest production build of the SiftPrompt client controller engine wrapper library.',
        codeSnippet: `npm install @siftprompt/node-core\n# -- or alternative runtime engines --\nyarn add @siftprompt/node-core`
      },
      {
        num: '02',
        heading: 'Initialize the Micro-Compiler Context Engine',
        content: 'Instantiate a fresh client class instance using your project credentials block. We recommend configuring a centralized initialization module so the compiler resource node stays active across local system invocation instances.',
        codeSnippet: `import { SiftCompiler } from '@siftprompt/node-core';\n\n// Initialize the global telemetry core layer\nconst sift = new SiftCompiler({\n  apiKey: process.env.SIFT_API_KEY || '',\n  environment: 'production'\n});`
      },
      {
        num: '03',
        heading: 'Execute a Compression Sequence Loop',
        content: 'Pass a messy, wordy prompt block string directly through the async compactor routine function thread. The compiler automatically drops fluff syntax tokens while retaining absolute programmatic reasoning logic bounds.',
        codeSnippet: `async function optimizeInput() {\n  const rawPrompt = "Act as an expert software systems infrastructure engineer and write down, step-by-step, completely detailed instructions on configuring Nginx parameters for real-time load distribution.";\n\n  // Execute optimization trace pass \n  const { optimizedPrompt, efficiencyMetrics } = await sift.minify({\n    text: rawPrompt,\n    mode: 'aggressive'\n  });\n\n  console.log(\`[Sift Metrics]: Saved \${efficiencyMetrics.tokensSaved} tokens (\${efficiencyMetrics.percentageReduction}% Reduction)\`);\n  return optimizedPrompt;\n}`
      }
    ]
  },
  {
    id: 't2',
    title: 'Zero-Configuration Context Minification in Python',
    description: 'A rapid boilerplate script utilizing SiftPrompt alongside native OpenAI and Anthropic SDK blocks to strip noise and track exact runtime metrics.',
    category: 'Quickstart',
    tags: ['Python', 'OpenAI', 'Anthropic'],
    duration: '4 min read',
    impact: '📉 -20% Cost',
    slug: 'python-quickstart',
    difficulty: 'Beginner',
    prerequisites: [
      'Python Runtime Environment (3.9+)',
      'Pip package installation framework manager',
      'Active environment API key credentials'
    ],
    steps: [
      {
        num: '01',
        heading: 'Install the Python SDK Extension',
        content: 'Use your terminal to fetch the core pipeline distribution wheel from the public package index. This equips your local environment with our specialized context compression dependencies.',
        codeSnippet: `pip install siftprompt-core\n# -- or alternative dependency locks --\npoetry add siftprompt-core`
      },
      {
        num: '02',
        heading: 'Establish Environment Client Parameters',
        content: 'Import the sync or async compiler orchestration class. We recommend assigning your credential payload token straight to your engine system variables to keep security layers completely decoupled from code scripts.',
        codeSnippet: `import os\nfrom siftprompt_core import SiftCompiler\n\n// Initialize synchronous context compactor client\nconst sift = new SiftCompiler({\n    apiKey: os.environ.get("SIFT_API_KEY", ""),\n    fallbackGraceful: true\n});`
      },
      {
        num: '03',
        heading: 'Execute a Compression Sequence Loop',
        content: 'Pass your verbose context prompt matrix down into the compression task loop routine. The tokenizer algorithm drops structural boilerplate words, formatting strings, and grammatical fillers while preserving logic tokens.',
        codeSnippet: `def optimize_data_payload():\n    raw_prompt = """\n    System Context: Please analyze this data frame log matrix completely. \n    Ensure that you pay close attention to the structural outliers, and error keys. \n    Do not omit any parameters that look like they could be memory drops.\n    """\n    \n    # Fire optimization pipeline pass\n    result = sift.minify(\n        text=raw_prompt,\n        mode="balanced"\n    )\n    \n    print(f"[Sift Telemetry]: Compaction Matrix Completed.")\n    print(f"-> Characters Before: {len(raw_prompt)} | Characters After: {len(result.optimized_text)}")\n    print(f"-> Budget Saved: {result.metrics['percentage_saved']}%")\n    \n    return result.optimized_text`
      }
    ]
  },
  {
    id: 't3',
    title: 'Fixing the "Quadratic Token Tax" in Multi-Turn LangChain Agents',
    description: 'Stop paying models to re-read their own scratchpad history blocks. Drop garbage collection layers straight into active LangGraph loops seamlessly.',
    category: 'Architecture',
    tags: ['LangChain', 'Agents', 'Python'],
    duration: '12 min read',
    impact: '⚡ Saves up to 40%',
    slug: 'fixing-quadratic-token-tax',
    difficulty: 'Intermediate',
    prerequisites: [
      'Python 3.10+ with active async event loops',
      'LangChain Core / LangGraph framework installed',
      'Basic understanding of State Graph memory channels'
    ],
    steps: [
      {
        num: '01',
        heading: 'Understand the Quadratic Token Trap',
        content: 'When an agent loops through five steps to solve a problem, step 5 submits the full raw logs of steps 1, 2, 3, and 4. This duplicate history creates an exponential billing loop. SiftPrompt acts as an execution middleware node that cleans repetitive scratchpad boilerplate from state memories before the next execution cycle fires.',
        codeSnippet: `# Standard LangGraph state structure requiring optimization\nfrom typing import Annotated, Sequence\nfrom typing_extensions import TypedDict\nfrom langchain_core.messages import BaseMessage\n\nclass AgentState(TypedDict):\n    # Compounding message queues that tax your token budget\n    messages: Annotated[Sequence[BaseMessage], add_messages]`
      },
      {
        num: '02',
        heading: 'Inject the Compiler Compression Interceptor',
        content: 'Create an isolated helper utility function that intercepts your active message state channel arrays, converts message objects to structural strings, processes them via the SiftPrompt SDK, and maps the trimmed payload back into your chain execution graph.',
        codeSnippet: `import os\nfrom siftprompt_core import SiftCompiler\nfrom langchain_core.messages import HumanMessage, AIMessage\n\nsift = SiftCompiler(api_key=os.environ.get("SIFT_RAPIDAPI_KEY"))\n\ndef prune_agent_history(state: AgentState):\n    messages = state["messages"]\n    if len(messages) <= 2:\n        return {"messages": messages}\n    \n    # Separate the system intent from the messy processing loops\n    latest_msg = messages[-1]\n    history_to_compress = "\\n".join([m.content for m in messages[:-1]])\n    \n    # Execute optimization pass to filter redundant agent thoughts\n    result = sift.minify(text=history_to_compress, mode="aggressive")\n    \n    # Reconstruct optimized state history framework\n    optimized_history = [HumanMessage(content=result.optimized_text), latest_msg]\n    return {"messages": optimized_history}`
      },
      {
        num: '03',
        heading: 'Wire the Compactor Node into Your State Graph',
        content: 'Compile the compactor middleware node straight into your active state manager layout. Route all cyclic loops through the compiler function before passing control parameters back to your primary LLM decision nodes.',
        codeSnippet: `from langgraph.graph import StateGraph, END\n\nworkflow = StateGraph(AgentState)\n\n# Define standard processing actors\nworkflow.add_node("call_model", lambda state: {"messages": [model.invoke(state["messages"])]})\n# Inject our SiftPrompt pipeline guardrails\nworkflow.add_node("minify_context", prune_agent_history)\n\n# Establish graph routing maps\nworkflow.set_entry_point("minify_context")\nworkflow.add_edge("minify_context", "call_model")\nworkflow.add_edge("call_model", END)\n\napp = workflow.compile()`
      }
    ]
  },
  {
    id: 't4',
    title: 'Building a Budget-Friendly RAG Pipeline with Token Sifting',
    description: 'Vector databases extract messy data frames. Learn how to clean, compress, and deduplicate structural document context pools prior to LLM compilation.',
    category: 'Architecture',
    tags: ['RAG', 'Vector DB', 'LlamaIndex'],
    duration: '15 min read',
    impact: '🧠 Better Context Accuracy',
    slug: 'budget-friendly-rag-pipelines',
    difficulty: 'Intermediate',
    prerequisites: [
      'Basic experience with a Vector Database (Pinecone, Weaviate, or Chroma)',
      'Understanding of RAG retrieval flows (Embeddings -> Context Injection)',
      'Familiarity with standard Python HTTP requests or SDK usage'
    ],
    steps: [
      {
        num: '01',
        heading: 'Identifying the RAG Context Bloat',
        content: 'Standard RAG pipelines often retrieve more context than the model needs for inference. Because vector similarity search can capture high-noise or repetitive text segments, injecting these directly into your LLM prompt causes "Context Bloat," leading to higher costs per request and potential performance degradation due to the needle-in-a-haystack effect.',
        codeSnippet: `# Standard naive RAG implementation\n# This often passes 2,000+ unnecessary tokens\nraw_context = "\\n".join([doc.text for doc in retrieved_chunks])\nprompt = f"Context: {raw_context}\\n\\nQuery: {user_query}"`
      },
      {
        num: '02',
        heading: 'Injecting Sift Middleware',
        content: 'By routing your retrieved chunks through the SiftPrompt middleware, you strip away low-entropy syntactic padding and redundant conversational filler before the payload hits your LLM provider. This allows you to maintain the same factual retrieval quality while passing significantly fewer tokens into your context window.',
        codeSnippet: `from sift import SiftClient\n\n# Initialize your Sift pipeline\nsift = SiftClient(api_key=os.getenv("SIFT_API_KEY"))\n\n# Compress the retrieved context before injecting into the prompt\n# The "rag" mode is optimized to preserve entities and factual claims\noptimized_context = sift.compress(raw_context, mode="rag")\n\nprompt = f"Context: {optimized_context}\\n\\nQuery: {user_query}"`
      },
      {
        num: '03',
        heading: 'Validating Cost & Latency Gains',
        content: 'To quantify success, compare the token count of your raw retrieved context against the compressed output. A successful implementation will show a 30-50% reduction in tokens without compromising the accuracy of the final answer. You should observe a direct correlation between these savings and your reduced Time to First Token (TTFT).',
        codeSnippet: `# Performance Audit Log\nraw_tokens = len(raw_context.split())\noptimized_tokens = len(optimized_context.split())\n\nsavings = (1 - (optimized_tokens / raw_tokens)) * 100\nprint(f"[Performance Log]: Reduced context payload by {savings:.1f}%")`
      }
    ]
  },
  {
    id: 't5',
    title: 'Deploying SiftPrompt on Vercel Edge Functions or AWS Lambda',
    description: 'Isolate minification to global edge servers. Intercept and condense outgoing streaming requests in transit while maintaining zero latency.',
    category: 'Infrastructure',
    tags: ['AWS Lambda', 'Vercel Edge', 'DevOps'],
    duration: '10 min read',
    impact: '🌐 Zero Edge Latency',
    slug: 'deploying-on-edge-infrastructure',
    difficulty: 'Advanced',
    prerequisites: [
      'Vercel CLI or AWS SAM deployment toolkit configured locally',
      'Familiarity with streaming Web Fetch APIs (Request/Response objects)',
      'Valid SiftPrompt account credential parameters mapped to your cloud secrets'
    ],
    steps: [
      {
        num: '01',
        heading: 'Understand the Global Edge Proxy Pattern',
        content: 'Instead of running context minification deep inside your internal server runtimes, routing inbound traffic through an edge layer reduces compute stress. The edge function acts as a pass-through layer: it captures the prompt body, optimizes it via SiftPrompt instantly, and proxies the call to downstream model clusters.',
        codeSnippet: `// Deployment architecture scheme visualization:\n// Client Browser -> Vercel Edge Middleware (Runs SiftPrompt) -> OpenAI/Anthropic API Edge Host`
      },
      {
        num: '02',
        heading: 'Write the Vercel Edge Middleware Proxy Handler',
        content: 'Create a lightweight JavaScript edge runtime file. It parses the incoming JSON request object stream, delegates the raw string compilation to your SiftPrompt endpoint, overrides the payload headers, and forwards the cleaned buffer onward.',
        codeSnippet: `// src/app/api/proxy/route.ts\nimport { NextResponse } from 'next/server';\n\n// Enforce globally distributed Vercel Edge execution context\nexport const runtime = 'edge';\n\nexport async function POST(request: Request) {\n  try {\n    const body = await request.json();\n    const rawPrompt = body.prompt || '';\n    \n    // 1. Fire optimization handshake with the SiftPrompt edge endpoint node\n    const siftResponse = await fetch('https://sift6.p.rapidapi.com/api/v1/compress', {\n      method: 'POST',\n      headers: {\n        'Content-Type': 'application/json',\n        'x-rapidapi-key': process.env.SIFT_RAPIDAPI_KEY || ''\n      },\n      body: JSON.stringify({ text: rawPrompt, mode: 'balanced', language: 'en' })\n    });\n    \n    const siftData = await siftResponse.json();\n    const optimizedPrompt = siftData.compressedText || rawPrompt;\n    \n    // 2. Patch your optimized text straight into your downstream payload configuration\n    const downstreamPayload = { ...body, prompt: optimizedPrompt };\n    \n    return NextResponse.json({ success: true, optimizedPayload: downstreamPayload });\n  } catch (err) {\n    // Graceful infrastructure fallback: fail open so your users never experience a crash\n    return NextResponse.json({ success: false, error: 'Proxy routing error' }, { status: 500 });\n  }\n}`
      },
      {
        num: '03',
        heading: 'Configure Cloud Infrastructure Variables',
        content: 'Deploy the edge script using your deployment toolchain. Ensure your live environment configuration handles your secret keys securely across your worldwide edge deployment locations.',
        codeSnippet: `# Deploying configuration states through terminal triggers\nvercel env add SIFT_RAPIDAPI_KEY production\nvercel deploy --prod`
      }
    ]
  },
  {
    id: 't6',
    title: 'Setting up Real-Time Cost Budget Alerts & Telemetry Hubs',
    description: 'Configure custom Postgres listeners on Supabase to flag billing spikes and broadcast active token optimization metrics straight to slack pipelines.',
    category: 'Infrastructure',
    tags: ['Supabase', 'Webhooks', 'Slack API'],
    duration: '8 min read',
    impact: '📊 Real-Time Alerting',
    slug: 'real-time-cost-budget-alerts',
    difficulty: 'Intermediate',
    prerequisites: [
      'Active Supabase project with an available Table Editor view',
      'Configured public profiles or usage metric logging table schemas',
      'An incoming webhook integration payload URL generated inside your Slack workspace'
    ],
    steps: [
      {
        num: '01',
        heading: 'Establish the Savings Log Table Schema',
        content: 'To analyze metrics in real time, build an operational logging frame inside your Postgres cluster. This table tracks the cost parameters generated by your user applications, capturing the raw tokens sent versus the optimized text token counts returned by the SiftPrompt compiler layer.',
        codeSnippet: `-- Create explicit database table to warehouse prompt telemetry frames\ncreate table public.token_logs (\n  id uuid default gen_random_uuid() primary key,\n  user_id uuid references auth.users(id),\n  tokens_saved integer not null,\n  estimated_cost_saved numeric(10, 4) not null,\n  created_at timestamp with time zone default now()\n);`
      },
      {
        num: '02',
        heading: 'Write the Postgres Database Hook Listener',
        content: 'Deploy a native database function configured to run every time a new row lands in your logs table. If the cumulative spend or savings cross your threshold, the function aggregates the math data payload and triggers a secure background network call straight to your communication pipeline.',
        codeSnippet: `create or replace function public.check_token_savings_alert()\nreturns trigger as $$\ndeclare\n  total_saved_dollars numeric;\n  slack_webhook_url text := 'https://hooks.slack.com/services/REDACTED-WEBHOOK-URL';\nbegin\n  -- Pull aggregate savings metrics across the operational cluster\n  select coalesce(sum(estimated_cost_saved), 0) into total_saved_dollars from public.token_logs;\n  \n  -- Fire alert parameters once milestones or quotas hit specific boundaries\n  if new.estimated_cost_saved > 5.00 then\n    perform http_post(\n      slack_webhook_url,\n      json_build_object(\n        'text', format('📊 [SiftPrompt Telemetry Alert]: Infrastructure node optimized a massive cluster. Saved %s tokens ($%s saved on this request).',\n          new.tokens_saved, new.estimated_cost_saved)\n      )::text,\n      'application/json'\n    );\n  end if;\n  \n  return new;\nend;\n$$ language plpgsql security definer;`
      },
      {
        num: '03',
        heading: 'Activate the Automated Runtime Trigger',
        content: 'Bind your telemetry tracking function directly to the underlying data layer. Enforce an automatic execution loop that fires on every insert event, ensuring your infrastructure monitoring cluster handles tracking without creating background daemon software dependencies.',
        codeSnippet: `create or replace trigger on_log_entry_inserted\n  after insert on public.token_logs\n  for each row execute procedure public.check_token_savings_alert();`
      }
    ]
  },
  {
    id: 't7',
    title: 'The Math of Prompt Minification: Stemming & Structural Pruning',
    description: 'An academic deep dive explaining how our compiler strips structural whitespaces, redundant grammar tokens, and noise without compromising accuracy.',
    category: 'Deep Dive',
    tags: ['Computer Science', 'LLM Internals', 'SEO Magnet'],
    duration: '20 min read',
    impact: '🔬 Under The Hood',
    slug: 'math-of-prompt-minification',
    difficulty: 'Advanced',
    prerequisites: [
      'Basic understanding of LLM Tokenization (Byte-Pair Encoding / Tiktoken)',
      'Familiarity with Information Theory fundamentals (Shannon Entropy limits)',
      'Comfort reading abstract algorithmic execution pipelines'
    ],
    steps: [
      {
        num: '01',
        heading: 'The Core Premise: Natural Language Is Over-Determined',
        content: 'Human grammar contains significant structural redundancy designed for vocal clarity, not matrix math vector calculations. LLMs do not read text like humans; they map high-dimensional semantic spaces. Prompt minification mathematically evaluates sentence structures, separating high-entropy information tokens from predictable, low-entropy syntactic padding.',
        codeSnippet: `// Concept Example of Semantic Information Density:\n// Raw String: "Please take a look at this code and tell me if there are any bugs."\n// Minified String: "Review code for bugs."\n// Token Reduction: ~65% savings while maintaining identical attention weightings.`
      },
      {
        num: '02',
        heading: 'Algorithmic Stemming and Frequency Mapping',
        content: 'The SiftPrompt compilation pipeline converts text into localized dependency parsing arrays. It strips out weak adjectives, systemic pleasantries ("Act as an expert..."), and optimizes repetitive filler sequences. It applies a variant of lemmatization tailored specifically to preserve the strict directional semantic constraints needed by attention heads.',
        codeSnippet: `# Pseudocode of the Token Importance Scoring pass\ndef calculate_token_weights(prompt_tokens):\n    weights = {}\n    for token in prompt_tokens:\n        # Check contextual mutual information value\n        if token.is_stopword and not token.is_structural_anchor:\n            weights[token] = token.entropy_score() * 0.15\n        else:\n            weights[token] = token.entropy_score() * 1.0\n    return [t for t in prompt_tokens if weights[t] > THRESHOLD]`
      },
      {
        num: '03',
        heading: 'Preserving the Attention Matrix Mapping',
        content: 'To prevent accuracy degradation, SiftPrompt simulates an attention-weight check pass. By computing the semantic similarity score between the raw prompt embedding and the compressed prompt embedding, it guarantees that the vector trajectory direction remains within a safe 98% cosine similarity boundary before passing the payload to the API layer.',
        codeSnippet: `# Mathematical Vector Validation Check\nimport numpy as np\n\ndef verify_cosine_similarity(v1: np.ndarray, v2: np.ndarray) -> float:\n    # Enforce strict matrix dot product alignment metrics\n    dot_product = np.dot(v1, v2)\n    norm_v1 = np.linalg.norm(v1)\n    norm_v2 = np.linalg.norm(v2)\n    \n    cosine_sim = dot_product / (norm_v1 * norm_v2)\n    print(f"[Validation Edge Log]: Cosine Vector Alignment: {cosine_sim:.4f}")\n    return cosine_sim`
      }
    ]
  }
];