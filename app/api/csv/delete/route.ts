import { NextResponse } from 'next/server';
import { existsSync, unlinkSync } from 'fs';
import path from 'path';

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const file = searchParams.get('file');
  if (!file) return NextResponse.json({ error: 'Missing file' }, { status: 400 });

  const filePath = path.join(process.cwd(), 'generated', file);
  if (existsSync(filePath)) {
    unlinkSync(filePath);
    return NextResponse.json({ success: true });
  }
  return NextResponse.json({ error: 'File not found' }, { status: 404 });
}
