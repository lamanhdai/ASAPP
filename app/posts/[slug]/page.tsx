import { getPostBySlug, getPostSlugs } from '@/lib/mdx';
import { MDXRemote } from 'next-mdx-remote/rsc'; // Use RSC version for Next.js App Router
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { ProductCard } from '@/components/mdx/ProductCard';

type Props = {
  params: Promise<{ slug: string }>;
};

// Map of components available in MDX
const components = {
  ProductCard,
  // Add other shared components here (e.g. YouTubeEmbed, Callout)
};

export async function generateStaticParams() {
  const slugs = getPostSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: post.metadata.title,
    description: post.metadata.description,
    openGraph: {
      title: post.metadata.title,
      description: post.metadata.description,
      type: 'article',
      publishedTime: post.metadata.date,
    },
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <article>
      <header className="mb-10 text-center">
        <div className="text-sm font-medium text-primary-600 mb-3 uppercase tracking-wider">
          Article
        </div>
        <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-gray-50 mb-6 leading-tight">
          {post.metadata.title}
        </h1>
        <div className="text-gray-500 dark:text-gray-400 flex items-center justify-center gap-4 text-sm">
          <time dateTime={post.metadata.date}>
            {new Date(post.metadata.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </time>
          <span>•</span>
          <span>5 min read</span>
        </div>
      </header>

      <div className="prose prose-lg dark:prose-invert mx-auto focus:outline-none mb-16">
        <MDXRemote source={post.content} components={components} />
      </div>
    </article>
  );
}
