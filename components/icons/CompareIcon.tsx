import React from 'react';

export const CompareIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-brand-primary" {...props}>
    <rect x="2" y="3" width="20" height="18" rx="2" />
    <path d="M12 3v18" />
    <path d="M7 8h2" />
    <path d="M7 12h2" />
    <path d="M7 16h2" />
    <path d="M15 8h2" />
    <path d="M15 12h2" />
    <path d="M15 16h2" />
  </svg>
);
