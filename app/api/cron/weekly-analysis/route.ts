import { NextResponse } from 'next/server';
import { generateCsvFromAnalysis } from '@/lib/csv/index';

export async function GET(request: Request) {
  // Optional: Check for Vercel Cron Secret header here
  try {
    const csvPath = await generateCsvFromAnalysis();
    return NextResponse.json({ success: true, csvPath });
  } catch (error) {
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
  }
}
