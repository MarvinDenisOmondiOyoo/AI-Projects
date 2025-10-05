import React from 'react';
import { Loader } from './ui/Loader';

interface ResultCardProps {
  title: string;
  modelName: string;
  response: string;
  isLoading: boolean;
  icon: React.ReactNode;
}

export const ResultCard: React.FC<ResultCardProps> = ({ title, modelName, response, isLoading, icon }) => {
  return (
    <div className="bg-slate-800/70 backdrop-blur-md p-6 rounded-xl shadow-lg flex flex-col min-h-[400px] border border-slate-700">
      <div className="flex items-center gap-3 mb-4">
        {icon}
        <div>
            <h3 className="text-lg font-bold text-slate-100">{title}</h3>
            <p className="text-xs text-slate-400 bg-slate-700 px-2 py-0.5 rounded-full inline-block">{modelName}</p>
        </div>
      </div>
      <div className="flex-grow prose prose-sm prose-invert max-w-none prose-p:text-slate-300 prose-headings:text-slate-200 overflow-y-auto">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <Loader />
          </div>
        ) : (
          <p className="whitespace-pre-wrap">{response || "No response generated."}</p>
        )}
      </div>
    </div>
  );
};