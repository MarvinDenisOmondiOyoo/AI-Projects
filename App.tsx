import React, { useState } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { LandingPage } from './pages/LandingPage';
import { TextAnalysisPage } from './pages/PocPage';
import { ImageAnalysisPage } from './pages/ImageAnalysisPage';
import { AboutPage } from './pages/AboutPage';
import type { Page } from './types';

const App: React.FC = () => {
  const [page, setPage] = useState<Page>('landing');

  const navigate = (targetPage: Page) => {
    setPage(targetPage);
    window.scrollTo(0, 0); // Scroll to top on page change for a smoother UX
  };

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Header currentPage={page} navigate={navigate} />
      
      <div className="flex-grow">
        {page === 'landing' && <LandingPage navigate={navigate} />}
        {page === 'text-analysis' && <TextAnalysisPage />}
        {page === 'image-analysis' && <ImageAnalysisPage />}
        {page === 'about' && <AboutPage />}
      </div>
      
      <Footer />
    </div>
  );
};

export default App;