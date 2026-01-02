'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/Button'
import { LoadingSpinner } from '@/components/LoadingSpinner'
import { getCSVList, CSVFile } from '@/lib/csv-service'
import { generateContent } from '@/lib/content-service/client'

export function GeneratorForm() {
  const [files, setFiles] = useState<CSVFile[]>([])
  const [selectedFile, setSelectedFile] = useState<string>('')
  const [generating, setGenerating] = useState(false)
  const [message, setMessage] = useState('')
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    getCSVList()
      .then(setFiles)
      .catch(console.error)
  }, [])

  const startGeneration = async () => {
    if (!selectedFile) return
    setGenerating(true)
    setMessage('')
    setIsError(false)

    try {
      const msg = await generateContent(selectedFile)
      setMessage(msg)
    } catch (err) {
      setIsError(true)
      setMessage('Error during generation.')
    } finally {
      setGenerating(false)
    }
  }

  return (
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
        <div className={`mt-6 p-4 rounded-lg text-center ${isError ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>
          {message}
        </div>
      )}
    </div>
  )
}
