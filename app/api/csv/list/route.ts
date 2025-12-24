import { NextResponse } from 'next/server';
import { readdirSync, existsSync, statSync } from 'fs';
import path from 'path';

export async function GET() {
  const generatedDir = path.join(process.cwd(), 'generated');
  if (!existsSync(generatedDir)) return NextResponse.json({ files: [] });

  const files = readdirSync(generatedDir)
    .filter(f => f.endsWith('.csv'))
    .map(f => ({
      name: f,
      mtime: statSync(path.join(generatedDir, f)).mtime
    }));

  return NextResponse.json({ files });
}
