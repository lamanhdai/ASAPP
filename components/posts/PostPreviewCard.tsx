import Link from 'next/link'
import { PostMetadata } from '@/lib/posts-service'

interface PostPreviewCardProps {
  post: PostMetadata
}

export function PostPreviewCard({ post }: PostPreviewCardProps) {
  const { title, description, date, slug } = post

  return (
    <Link href={`/posts/${slug}`} className="group block">
      <article className="h-full rounded-xl border bg-white p-6 shadow-sm transition-all hover:shadow-md dark:bg-gray-800 dark:border-gray-700">
        <div className="flex flex-col h-full">
          <header>
            <time dateTime={date} className="text-sm text-gray-500 dark:text-gray-400">
              {new Date(date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </time>
            <h3 className="mt-2 text-xl font-bold text-gray-900 group-hover:text-primary-600 dark:text-gray-100 dark:group-hover:text-primary-400">
              {title}
            </h3>
          </header>

          <p className="mt-3 flex-grow text-base text-gray-600 dark:text-gray-300 line-clamp-3">
            {description}
          </p>

          <div className="mt-4 flex items-center text-sm font-medium text-primary-600 dark:text-primary-400">
            Read article
            <svg className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>
        </div>
      </article>
    </Link>
  )
}
