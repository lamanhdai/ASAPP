'use client'

import { GeneratorForm } from '@/components/content/GeneratorForm'

export default function GenerateContent() {
  return (
    <section className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-2">Generate SEO Blog Posts</h1>
      <p className="text-gray-500 mb-8">Select a target CSV file to convert each row into a markdown-based affiliate article.</p>

      <GeneratorForm />
    </section>
  )
}
