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
    <div className="bg-white p-6 rounded-xl shadow-lg flex flex-col min-h-[400px]">
      <div className="flex items-center gap-3 mb-4">
        {icon}
        <div>
            <h3 className="text-lg font-bold text-slate-800">{title}</h3>
            <p className="text-xs text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full inline-block">{modelName}</p>
        </div>
      </div>
      <div className="flex-grow prose prose-sm max-w-none prose-p:text-slate-600 prose-headings:text-slate-700 overflow-y-auto">
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