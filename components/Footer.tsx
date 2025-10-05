
import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-800 text-slate-300">
      <div className="container mx-auto px-4 md:px-6 py-6">
        <div className="text-center">
          <p>PocketDoc &copy; {new Date().getFullYear()}</p>
          <p className="text-xs text-slate-400 mt-2 max-w-2xl mx-auto">
            Disclaimer: This is a proof-of-concept application designed for educational and illustrative purposes only. 
            It should not be used for actual medical diagnosis or clinical decision-making.
          </p>
        </div>
      </div>
    </footer>
  );
};
