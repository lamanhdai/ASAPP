"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/Button';
import { Table } from '@/components/Table';
import { useRouter } from 'next/navigation';

export default function CsvDetail({ params }: { params: Promise<{ file: string }> }) {
  const router = useRouter();
  const [rows, setRows] = useState<any[]>([]);
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [loading, setLoading] = useState(true);
  const [fileName, setFileName] = useState<string>('');

  useEffect(() => {
    params.then((p) => {
      setFileName(p.file);
      fetch(`/api/csv/read?file=${p.file}`)
        .then(res => res.json())
        .then(data => {
          setRows(data.rows);
          setLoading(false);
        });
    });
  }, [params]);

  const toggleSelect = (idx: number) => {
    const newSet = new Set(selected);
    if (newSet.has(idx)) newSet.delete(idx);
    else newSet.add(idx);
    setSelected(newSet);
  };

  const deleteRows = async () => {
    if (!selected.size || !fileName) return;
    const remaining = rows.filter((_, i) => !selected.has(i));

    await fetch('/api/csv/update', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ file: fileName, rows: remaining }),
    });
    setRows(remaining);
    setSelected(new Set());
    router.refresh();
  };

  if (loading) return <p className="p-8">Loading CSV data...</p>;

  return (
    <section className="p-8">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Edit CSV: {fileName}</h1>
          <p className="text-gray-500 text-sm">Select rows to delete from this generation.</p>
        </div>
        <Button variant="danger" onClick={deleteRows} disabled={!selected.size}>
          Delete Selected ({selected.size})
        </Button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border p-1">
        <Table
          rows={rows}
          selected={selected}
          onRowSelect={toggleSelect}
        />
      </div>
    </section>
  );
}
