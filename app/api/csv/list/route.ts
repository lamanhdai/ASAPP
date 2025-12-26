import { NextResponse } from 'next/server';
import { readdirSync, existsSync, statSync } from 'fs';
import path from 'path';

export async function GET() {
  const isProduction = process.env.NODE_ENV === 'production';
  const generatedDir = isProduction
    ? path.join('/tmp', 'generated')
    : path.join(process.cwd(), 'generated');

  if (!existsSync(generatedDir)) return NextResponse.json({ files: [] });

  const files = readdirSync(generatedDir)
    .filter(f => f.endsWith('.csv'))
    .map(f => ({
      name: f,
      mtime: statSync(path.join(generatedDir, f)).mtime
    }));

  return NextResponse.json({ files });
}
