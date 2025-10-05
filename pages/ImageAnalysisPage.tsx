import React, { useState, useCallback } from 'react';
import { AnalysisResult } from '../components/ResultsDisplay';
import { streamOllamaImageResponse } from '../services/ollamaService';
import { IMAGE_MODEL_NAME } from '../constants';
import type { OllamaError } from '../types';
import { Button } from '../components/ui/Button';
import { ImageUploader } from '../components/ImageUploader';

const toBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve((reader.result as string).split(',')[1]);
    reader.onerror = (error) => reject(error);
  });


export const ImageAnalysisPage: React.FC = () => {
  const [query, setQuery] = useState<string>('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [response, setResponse] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<OllamaError | null>(null);

  const handleAnalyze = useCallback(async () => {
    if (!query.trim() || !imageFile) return;

    setIsLoading(true);
    setError(null);
    setResponse('');

    try {
      const imageBase64 = await toBase64(imageFile);
      await streamOllamaImageResponse(
        IMAGE_MODEL_NAME,
        query,
        imageBase64,
        (chunk) => setResponse((prev) => prev + chunk)
      );
    } catch (e: unknown) {
      if (e instanceof Error) {
        if(e.message.includes('Failed to fetch')) {
            setError({ 
                message: "Connection to Ollama failed.",
                details: "Please ensure the Ollama service is running on your local machine and accessible at http://localhost:11434."
            });
        } else {
            setError({ message: "An unexpected error occurred.", details: e.message });
        }
      } else {
        setError({ message: "An unknown error occurred.", details: String(e) });
      }
    } finally {
      setIsLoading(false);
    }
  }, [query, imageFile]);

  return (
    <main className="flex-grow container mx-auto p-4 md:p-6 lg:p-8 animate-fade-in">
       <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-brand-dark">Radiology Image Analysis</h1>
          <p className="mt-2 text-lg text-slate-600 max-w-2xl mx-auto">Upload a radiological image and ask a question to get an AI-powered analysis.</p>
      </div>
      <div className="flex flex-col lg:flex-row gap-8">
        <aside className="w-full lg:w-1/3 xl:w-1/4 animate-slide-in-up">
            <div className="bg-white p-6 rounded-xl shadow-lg h-full flex flex-col gap-6">
                <div>
                    <h2 className="text-lg font-semibold text-slate-700 mb-2">1. Upload Image</h2>
                    <ImageUploader onFileSelect={setImageFile} disabled={isLoading} />
                </div>
                 <div>
                    <h2 className="text-lg font-semibold text-slate-700 mb-2">2. Input Query</h2>
                    <p className="text-sm text-slate-500 mb-4">Ask a question about the uploaded image.</p>
                    <textarea
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="e.g., Are there any signs of fractures? What lobe is the opacity in?"
                        className="w-full h-32 p-3 bg-white border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-brand-primary focus:border-brand-primary transition-shadow duration-200 disabled:bg-slate-100 disabled:cursor-not-allowed"
                        disabled={isLoading}
                    />
                </div>
                 <div className="mt-auto pt-4">
                    <Button onClick={handleAnalyze} disabled={isLoading || !query.trim() || !imageFile} className="w-full">
                    {isLoading ? 'Analyzing...' : 'Analyze Image'}
                    </Button>
                </div>
            </div>
        </aside>
        <section className="w-full lg:w-2/3 xl:w-3/4">
          <AnalysisResult
            response={response}
            isLoading={isLoading}
            error={error}
            query={query}
            modelName={IMAGE_MODEL_NAME}
          />
        </section>
      </div>
    </main>
  );
};
