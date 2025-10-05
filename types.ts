export type Page = 'landing' | 'text-analysis' | 'image-analysis' | 'about';

export interface OllamaError {
  message: string;
  details: string;
}

export interface OllamaStreamResponse {
  model: string;
  created_at: string;
  response: string;
  done: boolean;
}