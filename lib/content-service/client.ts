export interface GenerationResponse {
  message: string
}

export async function generateContent(filename: string): Promise<string> {
  const res = await fetch('/api/content/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ file: filename }),
  })

  const data = await res.json()

  if (!res.ok) {
    throw new Error(data.message || 'Generation failed')
  }

  return data.message || 'Generation complete!'
}
