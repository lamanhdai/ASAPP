import { NextResponse } from 'next/server';
import { getTopKeywords, getTopProductsByReviews, getTopBestSellers, getTopStates } from '@/lib/analysis/engine';

export async function GET() {
  const data = {
    topKeywords: await getTopKeywords(),
    topProductsByReviews: await getTopProductsByReviews(),
    topBestSellers: await getTopBestSellers(),
    topStates: await getTopStates(),
  };
  return NextResponse.json(data);
}
