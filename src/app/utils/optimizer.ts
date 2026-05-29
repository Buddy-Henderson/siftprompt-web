// src/app/utils/optimizer.ts

/**
 * Basic character-to-token ratio calculation engine (Approx 4 chars = 1 token)
 */
export function estimateTokens(text: string): number {
  if (!text) return 0;
  return Math.ceil(text.length / 4);
}

/**
 * Clean browser-safe prompt optimization loop
 */
export function compressTextLocally(text: string, options: { mode: string; language: string }): string {
  if (!text) return '';

  let processed = text;

  // 1. Strip extra whitespaces, line breaks, and conversational filler
  processed = processed.replace(/\s+/g, ' ').trim();

  // 2. Profile-specific optimizations
  if (options.mode === 'chat' || options.mode === 'rag') {
    // Basic structural cleanup matching your package formulas
    const stopWords = ['a', 'about', 'above', 'after', 'again', 'against', 'all', 'am', 'an', 'and', 'any', 'are', 'arent', 'as', 'at'];
    const words = processed.split(' ');
    processed = words.filter(word => !stopWords.includes(word.toLowerCase())).join(' ');
  } else if (options.mode === 'codegen') {
    // Scripting optimizations (removing code comments, triple carriage returns)
    processed = processed.replace(/\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$/gm, '');
  }

  return processed;
}