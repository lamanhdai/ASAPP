import React from 'react';

export default function PostsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <header className="bg-white dark:bg-gray-900 border-b sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <a href="/" className="font-bold text-xl tracking-tight text-gray-900 dark:text-white">
            AmazonTrends<span className="text-primary-600">.io</span>
          </a>
          <nav className="hidden md:flex gap-6 text-sm font-medium text-gray-600 dark:text-gray-400">
            <a href="/" className="hover:text-primary-600 transition">Recent</a>
            <a href="/" className="hover:text-primary-600 transition">Reviews</a>
            <a href="/admin" className="hover:text-primary-600 transition">Admin</a>
          </nav>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-12">
        {children}
      </main>

      <footer className="bg-white dark:bg-gray-900 border-t mt-24 py-12">
        <div className="max-w-4xl mx-auto px-4 text-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} Amazon Trends Analysis. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
