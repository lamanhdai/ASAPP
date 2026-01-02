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
        {children}
      </body>
    </html>
  );
}
