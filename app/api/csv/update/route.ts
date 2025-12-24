import { NextResponse } from 'next/server';
import { writeFileSync, existsSync } from 'fs';
import path from 'path';

export async function POST(request: Request) {
  const { file, rows } = await request.json();
  if (!file || !Array.isArray(rows)) return NextResponse.json({ error: 'Invalid' }, { status: 400 });

  const filePath = path.join(process.cwd(), 'generated', file);
  if (!existsSync(filePath)) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  const header = Object.keys(rows[0]).join(',');
  const content = [header, ...rows.map(r => Object.values(r).join(','))].join('\n');

  writeFileSync(filePath, content, 'utf-8');
  return NextResponse.json({ success: true });
}
