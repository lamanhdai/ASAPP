'use client'

import { CSVList } from '@/components/csv/CSVList'

export default function AdminDashboard() {
  return (
    <section className="p-8">
      <h1 className="text-2xl font-bold mb-8">Generated CSV Files</h1>
      <CSVList />
    </section>
  )
}
