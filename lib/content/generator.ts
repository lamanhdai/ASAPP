import fs from 'fs';
import path from 'path';
import { generateProductSchema } from '@/lib/seo/schema';

export async function generatePostsFromCsv(csvPath: string) {
  const data = fs.readFileSync(csvPath, 'utf-8');
  const lines = data.split('\n').filter(Boolean);
  const header = lines[0].split(',');

  const postsDir = path.join(process.cwd(), 'generated', 'posts');
  if (!fs.existsSync(postsDir)) fs.mkdirSync(postsDir, { recursive: true });

  for (const line of lines.slice(1)) {
    const cols = line.split(',');
    const record: any = {};
    header.forEach((h, i) => (record[h] = cols[i] ?? ''));

    const postContent = buildMarkdownPost(record);
    const slug = slugify(record.title);
    const filePath = path.join(postsDir, `${slug}.md`);
    fs.writeFileSync(filePath, postContent, 'utf-8');
  }
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function buildMarkdownPost(row: Record<string, string>): string {
  const schema = generateProductSchema({
    title: row.title,
    image: row.imageUrl,
    price: row.price,
    description: row.description,
    affiliateLink: row.affiliateLink,
  });

  return `---
title: "${row.title}"
date: "${new Date().toISOString()}"
description: "${row.description}"
image: "${row.imageUrl}"
price: "${row.price}"
affiliateLink: "${row.affiliateLink}"
schema: ${JSON.stringify(schema)}
---

# ${row.title}

![Product Image](${row.imageUrl})

**Price:** ${row.price}  

**Affiliate Link:** [Buy on Amazon](${row.affiliateLink})

${row.description}
`;
}
