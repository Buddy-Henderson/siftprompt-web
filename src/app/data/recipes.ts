export interface Recipe {
  id: string;
  title: string;
  filename: string;
  code: string;
  description: string; // Added for search engine crawl richness
}

export const RECIPES_DATA: Recipe[] = [
  {
    id: 'rag',
    title: 'RAG Context Optimizer',
    filename: 'rag_pipeline.py',
    description: 'Middleware compression template for Retrieval-Augmented Generation context blocks to reduce bloated vector store results before LLM ingestion.',
    code: `# Pattern: Middleware Compression for RAG
# Reduces bloated vector store results before LLM ingestion
def get_optimized_context(retrieved_chunks):
    raw_text = "\\n".join([doc.text for doc in retrieved_chunks])
    
    # Sift-Core compression reduces token count while preserving meaning
    optimized = sift_client.compress(raw_text, mode="rag")
    
    return optimized`
  },
  {
    id: 'stream',
    title: 'Real-time Streaming Helper',
    filename: 'stream_chat.js',
    description: 'On-the-fly prompt compression helper for high-latency conversational streaming chains to keep response speeds fast.',
    code: `// Pattern: On-the-fly compression for high-latency chains
const handleChat = async (history) => {
  // Compress history to keep latency low in streaming UI
  const compressed = await sift.compress(history, { mode: 'chat' });
  
  return streamResponseToUI(compressed);
};`
  },
  {
    id: 'batch',
    title: 'High-Volume Batch Processor',
    filename: 'batch_process.py',
    description: 'Cost-effective parallel batch prompt processor for handling high-volume background tasks with safe fallback recovery.',
    code: `# Pattern: Cost-effective bulk processing
def process_logs(log_batch):
    # Process multiple prompts in parallel with safe recovery
    return [sift_client.compress(log, mode="chat") for log in log_batch]`
  },
  {
    id: 'node',
    title: 'Node.js (Fetch)',
    filename: 'siftPrompt.js',
    description: 'Native JavaScript Node.js integration template using standard Fetch APIs to run prompt optimization securely server-side.',
    code: `const compressPrompt = async (rawText) => {
  const url = 'https://sift6.p.rapidapi.com/api/v1/compress';
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-rapidapi-host': 'sift6.p.rapidapi.com',
      'x-rapidapi-key': 'YOUR_RAPIDAPI_KEY' // Load via process.env safely
    },
    body: JSON.stringify({
      text: rawText,
      mode: 'chat',
      language: 'en'
    })
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    return data.compressedText; // Your optimized token payload
  } catch (error) {
    console.error('Sift optimization failed:', error);
    return rawText; // Fallback pattern
  }
};`
  },
  {
    id: 'python',
    title: 'Python (Requests)',
    filename: 'sift_prompt.py',
    description: 'Python code integration example using the Requests library to safely compress token windows with absolute fallback recovery.',
    code: `import requests

def compress_prompt(raw_text):
    url = "https://sift6.p.rapidapi.com/api/v1/compress"
    
    payload = {
        "text": raw_text,
        "mode": "chat",
        "language": "en"
    }
    
    headers = {
        "Content-Type": "application/json",
        "x-rapidapi-host": "sift6.p.rapidapi.com",
        "x-rapidapi-key": "YOUR_RAPIDAPI_KEY"
    }

    try:
        response = requests.post(url, json=payload, headers=headers)
        response.raise_for_status()
        return response.json().get("compressedText", raw_text)
    except Exception as e:
        print(f"Sift error: {e}")
        return raw_text # Safe recovery fallback`
  },
  {
    id: 'curl',
    title: 'cURL / Terminal',
    filename: 'bash_terminal',
    description: 'Terminal cURL syntax example execution blueprint to quickly test the SiftPrompt token optimization endpoints.',
    code: `curl --request POST \\
  --url https://sift6.p.rapidapi.com/api/v1/compress \\
  --header 'Content-Type: application/json' \\
  --header 'x-rapidapi-host: sift6.p.rapidapi.com' \\
  --header 'x-rapidapi-key: YOUR_RAPIDAPI_KEY' \\
  --data '{
    "text": "The financial forecasting framework generated a massive overhead deficit during the third fiscal quarter.",
    "mode": "chat",
    "language": "en"
  }'`
  }
];