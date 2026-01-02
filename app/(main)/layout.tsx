import { ReactNode } from 'react';

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <nav className="border-b bg-white dark:bg-gray-800 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold text-primary-600">AmzTrend</h1>
          <div className="space-x-4">
            <a href="/" className="hover:text-primary-600 transition">Home</a>
            <a href="/admin" className="hover:text-primary-600 transition">Admin</a>
            <a href="/generate" className="hover:text-primary-600 transition">Generate</a>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto">
        {children}
      </main>
    </>
  );
}
