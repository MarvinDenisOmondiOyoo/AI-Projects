
import React from 'react';
import { Card } from '../components/ui/Card';
import { BrainIcon } from '../components/icons/BrainIcon';
import { CheckCircleIcon } from '../components/icons/CheckCircleIcon';

export const AboutPage: React.FC = () => {
  return (
    <div className="animate-fade-in">
      <section className="py-16 lg:py-24 bg-transparent">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-block bg-brand-light p-4 rounded-full mb-4">
              <BrainIcon className="h-10 w-10 text-brand-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-100 tracking-tighter mb-4">
              About PocketDoc
            </h1>
            <p className="text-lg md:text-xl text-slate-300">
              PocketDoc is a proof-of-concept designed to explore the intersection of generative AI and medical imaging analysis in an accessible and educational way.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-slate-800/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="grid md:grid-cols-1 gap-12">
            <div>
              <h2 className="text-2xl font-bold text-slate-200 mb-4">Our Mission</h2>
              <p className="text-slate-300 leading-relaxed mb-4">
                Our goal is to provide a hands-on tool for students, medical professionals, and AI enthusiasts to understand both the capabilities and limitations of modern AI models in the specialized field of radiology. By offering tools for both text and image analysis, we aim to foster a deeper appreciation for how this technology might shape the future of healthcare diagnostics and reporting.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-slate-200 mb-4">Technology Stack</h2>
              <p className="text-slate-300 leading-relaxed mb-4">
                This application is built entirely on open-source technologies to promote transparency and accessibility.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircleIcon className="h-6 w-6 text-green-500 flex-shrink-0 mt-1" />
                  <span><strong>Ollama:</strong> All AI inference is run locally on your machine through Ollama. This ensures complete data privacy and security, as no medical data ever leaves your computer.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircleIcon className="h-6 w-6 text-green-500 flex-shrink-0 mt-1" />
                  <span><strong>Open-Source Models:</strong> We utilize powerful, publicly available large language models (LLMs) and multimodal models (LMMs), such as those from the Mistral and LLaVA families.</span>
                </li>
                 <li className="flex items-start gap-3">
                  <CheckCircleIcon className="h-6 w-6 text-green-500 flex-shrink-0 mt-1" />
                  <span><strong>React & Tailwind CSS:</strong> The frontend is a modern, responsive web application built with industry-standard technologies for a seamless user experience.</span>
                </li>
              </ul>
            </div>
             <div>
                <h2 className="text-2xl font-bold text-slate-200 mb-4">Medical Disclaimer</h2>
                <Card className="bg-yellow-900/50 border border-yellow-700/80">
                    <p className="text-yellow-300 font-semibold">
                        This application is for educational and informational purposes only. It is a proof-of-concept and is NOT a medical device. The AI-generated output has not been validated for clinical use and may contain inaccuracies. Do not use this tool for actual medical diagnosis, treatment, or any clinical decision-making. Always consult with a qualified healthcare professional for any medical concerns.
                    </p>
                </Card>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
};