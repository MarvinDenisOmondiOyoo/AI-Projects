
import React from 'react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { CheckCircleIcon } from '../components/icons/CheckCircleIcon';
import { ChevronRightIcon } from '../components/icons/ChevronRightIcon';
import { AnalyzeIcon } from '../components/icons/AnalyzeIcon';
import { ImageIcon } from '../components/icons/ImageIcon';
import { TextIcon } from '../components/icons/TextIcon';
import type { Page } from '../types';

interface LandingPageProps {
  navigate: (page: Page) => void;
}

const Feature: React.FC<{ icon: React.ReactNode; title: string; children: React.ReactNode }> = ({ icon, title, children }) => (
  <div className="flex items-start gap-4">
    <div className="flex-shrink-0 bg-brand-light p-3 rounded-full">
      {icon}
    </div>
    <div>
      <h3 className="text-lg font-semibold text-slate-800 mb-1">{title}</h3>
      <p className="text-slate-600">{children}</p>
    </div>
  </div>
);

const ToolCard: React.FC<{ icon: React.ReactNode; title: string; children: React.ReactNode; onClick: () => void }> = ({ icon, title, children, onClick }) => (
  <div onClick={onClick} className="cursor-pointer group">
    <Card className="text-center flex flex-col items-center transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-2">
      <div className="mb-4 text-brand-primary">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-slate-800 mb-2">{title}</h3>
      <p className="text-slate-500">{children}</p>
    </Card>
  </div>
);

export const LandingPage: React.FC<LandingPageProps> = ({ navigate }) => {
  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="text-center py-20 lg:py-28 bg-white">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-extrabold text-brand-dark tracking-tighter mb-4 animate-slide-in-up">
            PocketDoc
          </h1>
          <p className="max-w-3xl mx-auto text-lg md:text-xl text-slate-600 mb-8 animate-slide-in-up" style={{ animationDelay: '200ms' }}>
            Your AI-powered assistant for radiology analysis. An interactive suite of tools for students, researchers, and medical professionals.
          </p>
          <div className="animate-slide-in-up" style={{ animationDelay: '400ms' }}>
            <Button onClick={() => document.getElementById('tools')?.scrollIntoView({ behavior: 'smooth' })} className="text-lg px-8 py-4">
              Explore Tools
              <ChevronRightIcon className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Tools Section */}
       <section id="tools" className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4">
           <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-dark">Our Analysis Tools</h2>
            <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">Leverage specialized AI models for different analysis tasks.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <ToolCard icon={<TextIcon className="h-12 w-12"/>} title="Text Analysis" onClick={() => navigate('text-analysis')}>
              Analyze radiology reports, clinical notes, or ask complex questions.
            </ToolCard>
            <ToolCard icon={<ImageIcon className="h-12 w-12"/>} title="Image Analysis" onClick={() => navigate('image-analysis')}>
              Upload a DICOM, JPEG, or PNG and get AI-driven insights on the image.
            </ToolCard>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 lg:py-24 bg-brand-light/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-dark">Why This Platform?</h2>
            <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">Explore the tangible benefits of generative AI in a specialized domain like radiology.</p>
          </div>
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-x-12 gap-y-10">
            <Feature icon={<CheckCircleIcon className="h-6 w-6 text-brand-primary" />} title="Multimodal Analysis">
              Go beyond text. Upload and analyze radiological images with our new vision-capable AI model.
            </Feature>
            <Feature icon={<CheckCircleIcon className="h-6 w-6 text-brand-primary" />} title="Local & Secure">
              All processing happens on your local machine via Ollama, ensuring data privacy and security.
            </Feature>
            <Feature icon={<CheckCircleIcon className="h-6 w-6 text-brand-primary" />} title="Educational Insights">
              Ideal for students and professionals to understand AI's nuances in medical text and image analysis.
            </Feature>
            <Feature icon={<CheckCircleIcon className="h-6 w-6 text-brand-primary" />} title="Open-Source Powered">
              Built with powerful open-source models, demonstrating accessible AI capabilities.
            </Feature>
          </div>
        </div>
      </section>
    </div>
  );
};
