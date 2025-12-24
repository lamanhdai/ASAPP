import { NextResponse } from 'next/server';
import { generatePostsFromCsv } from '@/lib/content/generator';
import path from 'path';
import { existsSync } from 'fs';

export async function POST(request: Request) {
  const { file } = await request.json();
  if (!file) return NextResponse.json({ error: 'Missing file' }, { status: 400 });

  const csvPath = path.join(process.cwd(), 'generated', file);
  if (!existsSync(csvPath)) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  await generatePostsFromCsv(csvPath);
  return NextResponse.json({ message: 'Posts generated successfully.' });
}
