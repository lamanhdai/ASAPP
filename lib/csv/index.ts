// lib/csv/index.ts
import { getTopProductsByReviews } from '@/lib/analysis/engine';
import { writeCsv } from './writer';

/**
 * Runs the analysis engine and writes a CSV file.
 * Returns absolute path to the generated CSV.
 */
export async function generateCsvFromAnalysis(): Promise<string> {
  const topProducts = await getTopProductsByReviews();
  const csvPath = await writeCsv(topProducts);
  return csvPath;
}
