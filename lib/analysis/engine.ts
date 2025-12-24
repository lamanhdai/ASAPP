import { AnalysisEngine } from '../analyzer/engine';
import { ProductStats, KeywordStats } from './types';

// Singleton instance of the new engine
const engine = new AnalysisEngine();

// Shim functions to match the existing API expected by the app
// We translate the new 'Product' model to the old 'ProductStats' type if they differ,
// but they are close enough to map directly.

export async function getTopKeywords(): Promise<KeywordStats[]> {
  const kws = await engine.getTopKeywords();
  return kws.map(k => ({
    keyword: k.keyword,
    searchVolume: k.searchVolume
  }));
}

export async function getTopProductsByReviews(): Promise<ProductStats[]> {
  const products = await engine.getTopProductsByReviews();
  return products.map(p => ({
    ...p,
    price: `$${p.price.toFixed(2)}`, // Format price back to string for UI
    description: `Best selling product: ${p.title}`,
    affiliateLink: p.affiliateUrl // Map new model property to old type
  }));
}

export async function getTopBestSellers(): Promise<ProductStats[]> {
  const products = await engine.getTopBestSellers();
  return products.map(p => ({
    ...p,
    price: `$${p.price.toFixed(2)}`,
    description: `Best selling book: ${p.title}`,
    affiliateLink: p.affiliateUrl // Map new model property to old type
  }));
}

export async function getTopStates(): Promise<{ state: string; count: number }[]> {
  return engine.getTopStates();
}
