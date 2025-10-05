import React, { useState, useCallback } from 'react';
import { QueryPanel } from '../components/QueryPanel';
import { AnalysisResult } from '../components/ResultsDisplay';
import { streamOllamaResponse } from '../services/ollamaService';
import { TEXT_MODEL_NAME } from '../constants';
import type { OllamaError } from '../types';

export const TextAnalysisPage: React.FC = () => {
  const [query, setQuery] = useState<string>('');
  const [response, setResponse] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<OllamaError | null>(null);

  const handleAnalyze = useCallback(async () => {
    if (!query.trim()) return;

    setIsLoading(true);
    setError(null);
    setResponse('');

    try {
      await streamOllamaResponse(
        TEXT_MODEL_NAME,
        query,
        (chunk) => setResponse((prev) => prev + chunk)
      );
    } catch (e: unknown) {
      if (e instanceof Error) {
        if(e.message.includes('Failed to fetch')) {
            setError({ 
                message: "Connection to Ollama failed.",
                details: "Please ensure the Ollama service is running on your local machine and accessible at http://localhost:11434."
            });
        } else {
            setError({ message: "An unexpected error occurred.", details: e.message });
        }
      } else {
        setError({ message: "An unknown error occurred.", details: String(e) });
      }
    } finally {
      setIsLoading(false);
    }
  }, [query]);

  return (
    <main className="flex-grow container mx-auto p-4 md:p-6 lg:p-8 animate-fade-in">
      <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-brand-dark">Radiology Report Analysis</h1>
          <p className="mt-2 text-lg text-slate-600 max-w-2xl mx-auto">Input a clinical question or report details to get an AI-powered analysis.</p>
      </div>
      <div className="flex flex-col lg:flex-row gap-8">
        <aside className="w-full lg:w-1/3 xl:w-1/4 animate-slide-in-up">
          <QueryPanel
            query={query}
            setQuery={setQuery}
            onAnalyze={handleAnalyze}
            isLoading={isLoading}
          />
        </aside>
        <section className="w-full lg:w-2/3 xl:w-3/4">
          <AnalysisResult
            response={response}
            isLoading={isLoading}
            error={error}
            query={query}
            modelName={TEXT_MODEL_NAME}
          />
        </section>
      </div>
    </main>
  );
};