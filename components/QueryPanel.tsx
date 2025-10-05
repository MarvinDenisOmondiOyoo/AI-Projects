import React from 'react';
import { SAMPLE_QUESTIONS } from '../constants';
import { Button } from './ui/Button';

interface QueryPanelProps {
  query: string;
  setQuery: (query: string) => void;
  onAnalyze: () => void;
  isLoading: boolean;
}

export const QueryPanel: React.FC<QueryPanelProps> = ({ query, setQuery, onAnalyze, isLoading }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg h-full flex flex-col gap-6">
      <div>
        <h2 className="text-lg font-semibold text-slate-700 mb-2">Input Query</h2>
        <p className="text-sm text-slate-500 mb-4">Enter a radiology-related question or select a sample prompt below.</p>
        <textarea
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="e.g., Describe findings for pneumonia on a chest x-ray..."
          className="w-full h-32 p-3 bg-white border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-brand-primary focus:border-brand-primary transition-shadow duration-200 disabled:bg-slate-100 disabled:cursor-not-allowed"
          disabled={isLoading}
        />
      </div>

      <div>
        <h3 className="text-md font-semibold text-slate-600 mb-3">Sample Prompts</h3>
        <div className="flex flex-col gap-2">
          {SAMPLE_QUESTIONS.map((q, index) => (
            <button
              key={index}
              onClick={() => setQuery(q)}
              disabled={isLoading}
              className="text-left text-sm text-brand-primary hover:text-brand-dark hover:bg-brand-light p-2 rounded-md transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {q}
            </button>
          ))}
        </div>
      </div>
      
      <div className="mt-auto pt-4">
        <Button onClick={onAnalyze} disabled={isLoading || !query.trim()} className="w-full">
          {isLoading ? 'Analyzing...' : 'Analyze'}
        </Button>
      </div>
    </div>
  );
};
