
import React from 'react';

export const Loader: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <div className="w-8 h-8 border-4 border-brand-primary border-t-transparent rounded-full animate-spin"></div>
      <p className="text-sm text-slate-400">Generating response...</p>
    </div>
  );
};