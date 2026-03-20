/**
 * Narrow types for JSON bodies from AI HTTP APIs (fetch().json() is Promise<unknown>).
 */

export interface OpenAiCompatibleChatCompletion {
  choices?: Array<{ message?: { content?: string | null } }>;
  usage?: {
    prompt_tokens?: number;
    completion_tokens?: number;
    total_tokens?: number;
    prompt_tokens_details?: { cached_tokens?: number };
  };
}

export interface AnthropicMessagesResponse {
  content?: Array<{ text?: string }>;
  usage?: {
    input_tokens?: number;
    output_tokens?: number;
  };
}
