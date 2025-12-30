import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const POSTS_PATH = path.join(process.cwd(), 'content/posts');

// Ensure directory exists
if (!fs.existsSync(POSTS_PATH)) {
  fs.mkdirSync(POSTS_PATH, { recursive: true });
}

export interface PostMetadata {
  title: string;
  description: string;
  date: string;
  slug: string;
  price?: string;
  schema: any;
  [key: string]: any;
}

export interface Post {
  metadata: PostMetadata;
  content: string;
}

export function getPostSlugs(): string[] {
  return fs.readdirSync(POSTS_PATH)
    .filter((path) => /\.mdx?$/.test(path))
    .map((path) => path.replace(/\.mdx?$/, ''));
}

export function getPostBySlug(slug: string): Post | null {
  const realSlug = slug.replace(/\.mdx?$/, '');
  const fullPath = path.join(POSTS_PATH, `${realSlug}.mdx`);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    metadata: {
      ...data,
      slug: realSlug,
    } as PostMetadata,
    content,
  };
}

export function getAllPosts(): Post[] {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug))
    .filter((post): post is Post => post !== null)
    .sort((a, b) => (new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime()));
  return posts;
}
