export interface CSVFile {
  name: string
  mtime: string
}

export async function getCSVList(): Promise<CSVFile[]> {
  const res = await fetch('/api/csv/list')
  if (!res.ok) throw new Error('Failed to fetch CSV list')
  const data = await res.json()
  return data.files || []
}

export async function deleteCSV(filename: string): Promise<boolean> {
  const res = await fetch(`/api/csv/delete?file=${filename}`, { method: 'DELETE' })
  return res.ok
}

export async function triggerAnalysis(): Promise<void> {
  const res = await fetch('/api/csv', { method: 'POST' })
  if (!res.ok) {
    const data = await res.json()
    throw new Error(data.error || 'Analysis failed')
  }
}
