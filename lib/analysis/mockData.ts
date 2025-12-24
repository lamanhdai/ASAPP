import { ProductStats, KeywordStats } from './types';

export const mockProducts: ProductStats[] = Array.from({ length: 50 }, (_, i) => ({
  asin: `B0MOCK${i.toString().padStart(4, '0')}`,
  title: `Mock Product ${i + 1}`,
  affiliateLink: `https://www.amazon.com/dp/B0MOCK${i.toString().padStart(4, '0')}?tag=affiliate-20`,
  imageUrl: `https://picsum.photos/seed/${i}/400/400`,
  price: `$${(Math.random() * 100 + 10).toFixed(2)}`,
  rating: parseFloat((Math.random() * 5).toFixed(1)),
  reviewCount: Math.floor(Math.random() * 5000),
  salesRank: Math.floor(Math.random() * 10000) + 1,
  description: `This is a mock description for product ${i + 1}.`,
  state: ['CA', 'TX', 'NY', 'FL', 'IL'][i % 5],
}));

export const mockKeywords: KeywordStats[] = Array.from({ length: 30 }, (_, i) => ({
  keyword: `mock keyword ${i + 1}`,
  searchVolume: Math.floor(Math.random() * 20000) + 500,
}));
