import { NextResponse } from 'next/server';
import { generateCsvFromAnalysis } from '@/lib/csv/index';
import path from 'path';

export async function POST() {
  try {
    const csvPath = await generateCsvFromAnalysis();
    const filename = path.basename(csvPath);
    return NextResponse.json({ success: true, file: filename });
  } catch (error) {
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
  }
}
