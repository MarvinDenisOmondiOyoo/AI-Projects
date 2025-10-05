
import React from 'react';
import type { Page } from '../types';
import { TextIcon } from './icons/TextIcon';
import { ImageIcon } from './icons/ImageIcon';
import { InfoIcon } from './icons/InfoIcon';


interface HeaderProps {
  currentPage: Page;
  navigate: (page: Page) => void;
}

const NavLink: React.FC<{
  target: Page;
  current: Page;
  navigate: (page: Page) => void;
  children: React.ReactNode;
  icon: React.ReactNode;
}> = ({ target, current, navigate, children, icon }) => {
  const isActive = target === current;
  return (
    <button
      onClick={() => navigate(target)}
      className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
        isActive
          ? 'bg-brand-light text-brand-dark'
          : 'text-slate-500 hover:bg-slate-100 hover:text-slate-700'
      }`}
      aria-current={isActive ? 'page' : undefined}
    >
      {icon}
      {children}
    </button>
  );
};


export const Header: React.FC<HeaderProps> = ({ currentPage, navigate }) => {
  return (
    <header className="bg-white/80 backdrop-blur-lg shadow-sm sticky top-0 z-10">
      <div className="container mx-auto px-4 md:px-6 py-3 flex items-center justify-between">
        <div 
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => navigate('landing')}
          aria-label="Go to homepage"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && navigate('landing')}
        >
          <div className="bg-brand-primary p-2 rounded-lg group-hover:scale-105 transition-transform duration-300">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M12 6V4m0 16v-2M8 12a4 4 0 118 0 4 4 0 01-8 0z" />
             </svg>
          </div>
          <div>
            <h1 className="text-xl font-bold text-brand-dark tracking-tight">PocketDoc</h1>
          </div>
        </div>
        <nav className="hidden md:flex items-center gap-2">
          <NavLink target="text-analysis" current={currentPage} navigate={navigate} icon={<TextIcon className="h-4 w-4" />}>
            Text Analysis
          </NavLink>
          <NavLink target="image-analysis" current={currentPage} navigate={navigate} icon={<ImageIcon className="h-4 w-4" />}>
            Image Analysis
          </NavLink>
          <NavLink target="about" current={currentPage} navigate={navigate} icon={<InfoIcon className="h-4 w-4" />}>
            About
          </NavLink>
        </nav>
      </div>
    </header>
  );
};
