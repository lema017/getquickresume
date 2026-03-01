/**
 * Sanitizes a single-line text input.
 * Strips HTML tags, removes angle brackets, collapses whitespace, trims, and caps length.
 */
export function sanitizeText(input: string, maxLen = 500): string {
  if (!input || typeof input !== 'string') return '';
  let result = input
    .replace(/<[^>]*>/g, '')
    .replace(/[<>]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
  if (result.length > maxLen) {
    result = result.slice(0, maxLen);
  }
  return result;
}

/**
 * Sanitizes a multiline text input.
 * Strips HTML tags, normalizes line breaks, collapses whitespace per line, trims, and caps length.
 */
export function sanitizeMultiline(input: string, maxLen = 10000): string {
  if (!input || typeof input !== 'string') return '';
  let result = input
    .replace(/<[^>]*>/g, '')
    .replace(/[<>]/g, '')
    .replace(/\r\n/g, '\n')
    .split('\n')
    .map(line => line.replace(/\s+/g, ' ').trim())
    .join('\n')
    .trim();
  if (result.length > maxLen) {
    result = result.slice(0, maxLen);
  }
  return result;
}
