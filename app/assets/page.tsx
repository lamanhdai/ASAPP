'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Download } from 'lucide-react';

export default function AssetsPage() {
  const [items, setItems] = useState<{ type: string, url: string, fromId: string, style?: string }[]>([]);
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedUrl, setGeneratedUrl] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    setIsGenerating(true);
    try {
      const response = await fetch('/api/generate-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();
      if (data.imageUrl) {
        setGeneratedUrl(data.imageUrl);
      } else {

        alert(data.error || 'Failed to generate image');
      }
    } catch (err) {
      console.error(err);
      alert('Error connecting to the generation service');
    } finally {
      setIsGenerating(false);
    }
  };

  useEffect(() => {
    const saved = localStorage.getItem('anime_gallery');
    if (saved) {
      const gallery = JSON.parse(saved);
      const allItems: any[] = [];

      gallery.forEach((char: any) => {
        Object.entries(char.layers).forEach(([type, url]) => {
          if (url) {
            allItems.push({
              type,
              url,
              fromId: char.id,
              style: char.params.style
            });
          }
        });
      });

      setItems(allItems);
    }
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6 md:p-12">
      <div className="max-w-7xl mx-auto">
        <header className="flex items-center gap-4 mb-12">
          <Link
            href="/"
            className="p-2 bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold">Asset Library</h1>
            <p className="text-slate-400">Individual layers extracted from your characters.</p>
          </div>
        </header>

        <section className="mb-12 bg-slate-800 p-6 rounded-xl border border-slate-700">
          <h2 className="text-xl font-bold mb-4">AI Image Generator</h2>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <textarea
                className="w-full h-24 bg-slate-900 border border-slate-700 rounded-lg p-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                placeholder="Describe the image you want to generate..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />
              <button
                onClick={handleGenerate}
                disabled={isGenerating || !prompt.trim()}
                className="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-700 disabled:cursor-not-allowed rounded-lg font-semibold transition-colors flex items-center gap-2"
              >
                {isGenerating ? 'Generating...' : 'Generate Image'}
              </button>
            </div>
            <div className="md:w-64 aspect-square bg-slate-900 border border-slate-700 rounded-lg flex items-center justify-center overflow-hidden">
              {generatedUrl ? (
                <img src={generatedUrl} alt="Generated" className="w-full h-full object-cover" />
              ) : (
                <p className="text-slate-500 text-sm text-center px-4">Generated image will appear here</p>
              )}
            </div>
          </div>
        </section>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {items.map((item, idx) => (
            <div key={idx} className="bg-slate-800 rounded-lg p-2 border border-slate-700 hover:border-slate-600 transition-colors">
              <div className="aspect-square bg-slate-900/50 rounded-md mb-2 overflow-hidden flex items-center justify-center relative group">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={item.url as string} alt={item.type} className="w-full h-full object-contain" />

                <a
                  href={item.url as string}
                  download={`anime_${item.type}.png`}
                  className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Download className="w-6 h-6" />
                </a>
              </div>
              <div className="px-1">
                <p className="text-sm font-semibold text-slate-200 capitalize">{item.type}</p>
                <p className="text-xs text-slate-500 capitalize">{item.style}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
