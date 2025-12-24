"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import dayjs from 'dayjs';
import { Button } from '@/components/Button';

export default function AdminDashboard() {
  const [files, setFiles] = useState<{ name: string; mtime: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [analyzing, setAnalyzing] = useState(false);

  const fetchFiles = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/csv/list');
      const data = await res.json();
      setFiles(data.files || []);
    } catch (error) {
      console.error('Failed to fetch files:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  const handleForceAnalyze = async () => {
    setAnalyzing(true);
    try {
      const res = await fetch('/api/csv', { method: 'POST' });
      if (res.ok) {
        await fetchFiles();
      } else {
        const data = await res.json();
        alert(`Analysis failed: ${data.error || 'Unknown error'}`);
      }
    } catch (error) {
      alert(`Error: ${(error as Error).message}`);
    } finally {
      setAnalyzing(false);
    }
  };

  if (loading && !analyzing) return <p className="p-8 text-center text-gray-500">Scanning for reports...</p>;

  return (
    <section className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Generated CSV Files</h1>
        <Button
          onClick={handleForceAnalyze}
          variant="primary"
          disabled={analyzing}
        >
          {analyzing ? 'Analyzing...' : 'Force Analyze Now'}
        </Button>
      </div>

      {files.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 p-12 rounded-xl text-center border dashed">
          <p className="text-gray-500">No CSV files found. Run an analysis to get started.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {files.map((file) => (
            <div key={file.name} className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border flex items-center justify-between">
              <div>
                <p className="font-semibold text-lg">{file.name}</p>
                <p className="text-sm text-gray-500">Generated on {dayjs(file.mtime).format('MMMM D, YYYY HH:mm')}</p>
              </div>
              <div className="flex gap-2">
                <Link href={`/admin/${file.name}`}>
                  <Button variant="secondary">View & Edit</Button>
                </Link>
                <Button
                  variant="danger"
                  onClick={async () => {
                    if (confirm(`Delete ${file.name}?`)) {
                      await fetch(`/api/csv/delete?file=${file.name}`, { method: 'DELETE' });
                      window.location.reload();
                    }
                  }}
                >
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
