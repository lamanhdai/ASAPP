import './globals.css';
import { ReactNode } from 'react';

export const metadata = {
  title: 'Amazon Trend Affiliate Platform',
  description: 'Analyze Amazon trends and generate affiliate content.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 antialiased font-sans">
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
      </body>
    </html>
  );
}
