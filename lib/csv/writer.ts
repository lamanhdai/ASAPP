import { createObjectCsvWriter } from 'csv-writer';
import { generateCsvFilename } from './filename';
import path from 'path';
import fs from 'fs';
import { ProductStats } from '@/lib/analysis/types';

export async function writeCsv(rows: ProductStats[]): Promise<string> {
  const filename = generateCsvFilename();

  // Use /tmp in production (Vercel), valid for serverless environment
  // In specific Vercel cases, process.env.NODE_ENV is 'production'
  const isProduction = process.env.NODE_ENV === 'production';
  const generatedDir = isProduction
    ? path.join('/tmp', 'generated')
    : path.join(process.cwd(), 'generated');

  if (!fs.existsSync(generatedDir)) {
    fs.mkdirSync(generatedDir, { recursive: true });
  }

  const outputPath = path.join(generatedDir, filename);
  const csvWriter = createObjectCsvWriter({
    path: outputPath,
    header: [
      { id: 'keyword', title: 'keyword' },
      { id: 'title', title: 'title' },
      { id: 'affiliateLink', title: 'affiliateLink' },
      { id: 'imageUrl', title: 'imageUrl' },
      { id: 'price', title: 'price' },
      { id: 'description', title: 'description' },
    ],
  });

  const records = rows.map((p) => ({
    keyword: '',
    title: p.title,
    affiliateLink: p.affiliateLink,
    imageUrl: p.imageUrl,
    price: p.price,
    description: p.description,
  }));

  await csvWriter.writeRecords(records);
  return outputPath;
}
