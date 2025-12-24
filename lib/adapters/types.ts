import { Keyword, Product } from '../models/product';

export interface DataSourceAdapter {
  searchProducts(query: string, maxResults?: number): Promise<Product[]>;
  getBestSellers(category?: string): Promise<Product[]>;
  getTrendingKeywords(): Promise<Keyword[]>;
}
