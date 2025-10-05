import type { OllamaStreamResponse } from '../types';

export const streamOllamaResponse = async (
  model: string,
  prompt: string,
  onChunk: (chunk: string) => void
): Promise<void> => {
  const response = await fetch('http://localhost:11434/api/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model,
      prompt,
      stream: true,
    }),
  });

  if (!response.ok) {
    throw new Error(`Ollama API request failed with status ${response.status}`);
  }

  if (!response.body) {
    throw new Error('Ollama API response has no body');
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = '';

  while (true) {
    const { done, value } = await reader.read();
    if (done) {
      break;
    }

    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split('\\n');
    
    buffer = lines.pop() || '';

    for (const line of lines) {
      if (line.trim() === '') continue;
      try {
        const parsed: OllamaStreamResponse = JSON.parse(line);
        if (parsed.response) {
          onChunk(parsed.response);
        }
      } catch (error) {
        console.error('Failed to parse JSON line from Ollama stream:', line, error);
      }
    }
  }
};

// Placeholder for multimodal API call
export const streamOllamaImageResponse = async (
  model: string,
  prompt: string,
  imageBase64: string,
  onChunk: (chunk: string) => void
): Promise<void> => {
  console.log("Simulating image analysis call for model:", model);
  console.log("Prompt:", prompt);
  console.log("Image (first 100 chars):", imageBase64.substring(0, 100));

  // In a real implementation, you would use an API like this:
  /*
  const response = await fetch('http://localhost:11434/api/generate', {
    method: 'POST',
    body: JSON.stringify({
      model,
      prompt,
      images: [imageBase64],
      stream: true,
    }),
  });
  // ... and then process the stream like in streamOllamaResponse
  */

  // For this PoC, we simulate a response with a delay.
  const mockResponse = "This is a simulated analysis of the uploaded image. The AI model would typically describe findings, anomalies, or answer specific questions about the visual data provided. For example, it might identify anatomical structures, point out potential areas of concern, and correlate them with the user's prompt. This demonstrates the potential of multimodal AI in radiology.";
  
  return new Promise(resolve => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < mockResponse.length) {
        const chunk = mockResponse.substring(i, i + 5);
        onChunk(chunk);
        i += 5;
      } else {
        clearInterval(interval);
        resolve();
      }
    }, 50);
  });
};