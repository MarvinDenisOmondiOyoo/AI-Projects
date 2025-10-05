
import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className }) => {
  return (
    <div className={`bg-slate-800/70 backdrop-blur-md p-6 rounded-xl shadow-lg border border-slate-700 ${className}`}>
      {children}
    </div>
  );
};