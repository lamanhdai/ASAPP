import Link from 'next/link';

export default function Home() {
  return (
    <div className="py-20 flex flex-col items-center">
      <h2 className="text-4xl font-extrabold mb-6 text-center">
        Amazon US Trend Analysis <br />
        <span className="text-primary-600">& Affiliate Platform</span>
      </h2>
      <p className="text-lg text-gray-600 dark:text-gray-400 mb-10 text-center max-w-2xl">
        A professional engine to track what's hot on Amazon US, generate Pinterest-ready data,
        and auto-author SEO-optimized articles for your affiliate blog.
      </p>
      <div className="flex gap-4">
        <Link
          href="/admin"
          className="px-8 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition font-semibold"
        >
          View Dashboard
        </Link>
        <Link
          href="/generate"
          className="px-8 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition font-semibold"
        >
          Generate Posts
        </Link>
      </div>

      <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 w-full px-6">
        <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm border">
          <h3 className="text-xl font-bold mb-2">Trend Analysis</h3>
          <p className="text-gray-500">Auto-analyze keywords, best sellers, and state-level consumption trends.</p>
        </div>
        <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm border">
          <h3 className="text-xl font-bold mb-2">Pinterest Ready</h3>
          <p className="text-gray-500">Export analyzed data into CSV format specifically for Pinterest bulk uploads.</p>
        </div>
        <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm border">
          <h3 className="text-xl font-bold mb-2">SEO Optimized</h3>
          <p className="text-gray-500">One-click generation of product articles with full schema.org integration.</p>
        </div>
      </div>
    </div>
  );
}
