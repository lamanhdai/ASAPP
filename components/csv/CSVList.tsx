'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import dayjs from 'dayjs'
import { Button } from '@/components/Button'
import { getCSVList, deleteCSV, triggerAnalysis, CSVFile } from '@/lib/csv-service'

export function CSVList() {
  const [files, setFiles] = useState<CSVFile[]>([])
  const [loading, setLoading] = useState(true)
  const [analyzing, setAnalyzing] = useState(false)
  const [error, setError] = useState('')

  const fetchFiles = async () => {
    setLoading(true)
    try {
      const data = await getCSVList()
      setFiles(data)
    } catch (error) {
      console.error('Failed to fetch files:', error)
      setError('Failed to load CSV files')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchFiles()
  }, [])

  const handleForceAnalyze = async () => {
    setAnalyzing(true)
    setError('')
    try {
      await triggerAnalysis()
      await fetchFiles()
    } catch (error) {
      setError(`Analysis failed: ${(error as Error).message}`)
    } finally {
      setAnalyzing(false)
    }
  }

  const handleDelete = async (filename: string) => {
    if (confirm(`Delete ${filename}?`)) {
      await deleteCSV(filename)
      setFiles(files.filter(f => f.name !== filename))
    }
  }

  if (loading && !analyzing) return <p className="p-8 text-center text-gray-500">Scanning for reports...</p>

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Files</h2>
        <Button
          onClick={handleForceAnalyze}
          variant="primary"
          disabled={analyzing}
        >
          {analyzing ? 'Analyzing...' : 'Force Analyze Now'}
        </Button>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg">
          {error}
        </div>
      )}

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
                  onClick={() => handleDelete(file.name)}
                >
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
