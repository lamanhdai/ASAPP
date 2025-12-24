"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/Button';
import { LoadingSpinner } from '@/components/LoadingSpinner';

export default function GenerateContent() {
  const [files, setFiles] = useState<{ name: string }[]>([]);
  const [selectedFile, setSelectedFile] = useState<string>('');
  const [generating, setGenerating] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('/api/csv/list')
      .then(res => res.json())
      .then(data => setFiles(data.files));
  }, []);

  const startGeneration = async () => {
    if (!selectedFile) return;
    setGenerating(true);
    setMessage('');
    try {
      const res = await fetch('/api/content/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ file: selectedFile }),
      });
      const data = await res.json();
      setMessage(data.message || 'Generation complete!');
    } catch (err) {
      setMessage('Error during generation.');
    } finally {
      setGenerating(false);
    }
  };

  return (
    <section className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-2">Generate SEO Blog Posts</h1>
      <p className="text-gray-500 mb-8">Select a target CSV file to convert each row into a markdown-based affiliate article.</p>

      <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm border">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Target CSV Generation
        </label>
        <select
          className="w-full border rounded-lg p-3 mb-6 bg-gray-50 dark:bg-gray-900 focus:ring-2 focus:ring-primary-500 outline-none transition"
          value={selectedFile}
          onChange={(e) => setSelectedFile(e.target.value)}
        >
          <option value="">-- Choose a CSV file --</option>
          {files.map((f) => (
            <option key={f.name} value={f.name}>
              {f.name}
            </option>
          ))}
        </select>

        <Button onClick={startGeneration} disabled={!selectedFile || generating} className="w-full">
          {generating ? <><LoadingSpinner /><span className="ml-2">Processing...</span></> : 'Generate Articles'}
        </Button>

        {message && (
          <div className={`mt-6 p-4 rounded-lg text-center ${message.includes('Error') ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>
            {message}
          </div>
        )}
      </div>
    </section>
  );
}
