import { getAllPostPreviews } from '@/lib/posts-service'
import { PostPreviewCard } from '@/components/posts/PostPreviewCard'

export const metadata = {
  title: 'Blog - Affiliate Strategy',
  description: 'Latest articles and product reviews.',
}

export default function PostsPage() {
  const posts = getAllPostPreviews()

  return (
    <div className="container mx-auto px-4 py-12">
      <header className="mb-12 text-center">
        <h1 className="text-3xl font-bold md:text-5xl text-gray-900 dark:text-white">Latest Articles</h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
          Explore our latest insights, reviews, and affiliate strategies.
        </p>
      </header>

      {posts.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          No posts found. Generate some content to get started!
        </div>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostPreviewCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </div>
  )
}
