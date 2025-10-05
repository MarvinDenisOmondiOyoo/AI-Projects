import React from 'react';
import type { OllamaError } from '../types';
import { ResultCard } from './ResultCard';
import { BrainIcon } from './icons/BrainIcon';

interface AnalysisResultProps {
  response: string;
  isLoading: boolean;
  error: OllamaError | null;
  query: string;
  modelName: string;
}

export const AnalysisResult: React.FC<AnalysisResultProps> = ({
  response,
  isLoading,
  error,
  query,
  modelName
}) => {
  const hasResult = response;
  const showWelcome = !isLoading && !hasResult && !error;

  return (
    <div className="animate-fade-in">
      {showWelcome && (
        <div className="flex flex-col items-center justify-center h-full bg-white/50 p-8 rounded-xl border-2 border-dashed border-slate-300 min-h-[500px]">
           <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-slate-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" />
          </svg>
          <h2 className="text-xl font-semibold text-slate-700">Awaiting Analysis</h2>
          <p className="text-slate-500 mt-2 text-center max-w-md">Enter a query and click "Analyze" to see the AI model's response.</p>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-800 p-6 rounded-xl">
          <h3 className="font-bold text-lg mb-2">{error.message}</h3>
          <p className="text-sm">{error.details}</p>
        </div>
      )}

      {(isLoading || hasResult) && (
        <div>
          {query && <h2 className="text-lg font-semibold text-slate-700 mb-4">Query: <span className="font-normal italic">"{query}"</span></h2>}
          <div>
            <ResultCard
              title="AI Model Response"
              modelName={modelName}
              response={response}
              isLoading={isLoading && !response}
              icon={<BrainIcon className="h-6 w-6 text-brand-primary" />}
            />
          </div>
        </div>
      )}
    </div>
  );
};