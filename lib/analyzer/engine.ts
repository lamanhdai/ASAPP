import { DataSourceAdapter } from '../adapters/types';
import { ScrapingAdapter } from '../adapters/scrapingAdapter';
import { Product, Keyword } from '../models/product';
import crawledData from '../analysis/crawledData.json'; // Direct import for states still

export class AnalysisEngine {
  private adapter: DataSourceAdapter;

  constructor(adapter?: DataSourceAdapter) {
    this.adapter = adapter || new ScrapingAdapter();
  }

  async getTopKeywords(): Promise<Keyword[]> {
    return this.adapter.getTrendingKeywords();
  }

  async getTopProductsByReviews(): Promise<Product[]> {
    // In our logic, 'Reviews' metric is just best sellers for now
    return this.adapter.getBestSellers();
  }

  async getTopBestSellers(): Promise<Product[]> {
    return this.adapter.getBestSellers('books');
  }

  async getTopStates(): Promise<{ state: string; count: number }[]> {
    // State data is unique and static for now
    return crawledData.top_states_for_reading_usa;
  }
}
