import { NextResponse } from 'next/server';
import { readFileSync, existsSync } from 'fs';
import path from 'path';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const file = searchParams.get('file');
  if (!file) return NextResponse.json({ error: 'Missing file' }, { status: 400 });

  const isProduction = process.env.NODE_ENV === 'production';
  const folder = isProduction ? path.join('/tmp', 'generated') : path.join(process.cwd(), 'generated');
  const filePath = path.join(folder, file);
  if (!existsSync(filePath)) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  const data = readFileSync(filePath, 'utf-8');
  const lines = data.split('\n').filter(Boolean);

  // Robust CSV line parser
  const parseLine = (text: string) => {
    const cols: string[] = [];
    let current = '';
    let inQuote = false;

    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      if (char === '"') {
        inQuote = !inQuote;
        current += char;
      } else if (char === ',' && !inQuote) {
        cols.push(current);
        current = '';
      } else {
        current += char;
      }
    }
    cols.push(current);

    // Clean quotes
    return cols.map(col => {
      const trimmed = col.trim(); // Handle generic whitespace around delimiters
      if (trimmed.startsWith('"') && trimmed.endsWith('"')) {
        return trimmed.slice(1, -1).replace(/""/g, '"');
      }
      return trimmed;
    });
  };

  const header = parseLine(lines[0]);

  const rows = lines.slice(1).map(line => {
    const cols = parseLine(line);
    const obj: any = {};
    header.forEach((h, i) => obj[h] = cols[i]);
    return obj;
  });

  return NextResponse.json({ rows });
}
