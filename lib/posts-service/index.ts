import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const POSTS_PATH = path.join(process.cwd(), 'content/posts')

// Ensure directory exists
if (!fs.existsSync(POSTS_PATH)) {
  fs.mkdirSync(POSTS_PATH, { recursive: true })
}

export interface PostMetadata {
  title: string
  description: string
  date: string
  slug: string
  price?: string
  schema: any
  [key: string]: any
}

export interface Post {
  metadata: PostMetadata
  content: string
}

export function getPostSlugs(): string[] {
  return fs.readdirSync(POSTS_PATH)
    .filter((path) => /\.mdx?$/.test(path))
    .map((path) => path.replace(/\.mdx?$/, ''))
}

export function getPostBySlug(slug: string): Post | null {
  const realSlug = slug.replace(/\.mdx?$/, '')
  const fullPath = path.join(POSTS_PATH, `${realSlug}.mdx`)

  if (!fs.existsSync(fullPath)) {
    return null
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  return {
    metadata: {
      ...data,
      slug: realSlug,
    } as PostMetadata,
    content,
  }
}

export function getAllPosts(): Post[] {
  const slugs = getPostSlugs()
  const posts = slugs
    .map((slug) => getPostBySlug(slug))
    .filter((post): post is Post => post !== null)
    .sort((a, b) => (new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime()))
  return posts
}

export function getPostMetadata(slug: string): PostMetadata | null {
  const realSlug = slug.replace(/\.mdx?$/, '')
  const fullPath = path.join(POSTS_PATH, `${realSlug}.mdx`)

  if (!fs.existsSync(fullPath)) {
    return null
  }

  // Optimize: Read only the beginning of the file to capture frontmatter
  // 2KB should be enough for most frontmatters
  const fileDescriptor = fs.openSync(fullPath, 'r');
  const buffer = Buffer.alloc(2048);
  fs.readSync(fileDescriptor, buffer, 0, 2048, 0);
  fs.closeSync(fileDescriptor);

  const content = buffer.toString('utf8');
  const { data } = matter(content)

  return {
    ...data,
    slug: realSlug,
  } as PostMetadata
}

export function getAllPostPreviews(): PostMetadata[] {
  const slugs = getPostSlugs()
  const previews = slugs
    .map((slug) => getPostMetadata(slug))
    .filter((meta): meta is PostMetadata => meta !== null)
    .sort((a, b) => (new Date(b.date).getTime() - new Date(a.date).getTime()))
  return previews
}
