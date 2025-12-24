import { Product, Keyword } from '../models/product';
import { DataSourceAdapter } from './types';
import crawledData from '../analysis/crawledData.json';
import { AffiliateLinkBuilder } from '../affiliate/builder';
import { cleanPrice } from '../utils';

// In a real scenario, this would import puppeteer or use an external API.
// For this prototype, we are using the detailed crawled data structure we just built.

export class ScrapingAdapter implements DataSourceAdapter {
  private affiliateBuilder: AffiliateLinkBuilder;

  constructor() {
    this.affiliateBuilder = new AffiliateLinkBuilder();
  }

  async searchProducts(query: string, maxResults = 10): Promise<Product[]> {
    // Simulating search by filtering our best sellers or returning best sellers if no match
    // In production, this would make a request to Amazon search page
    const products = crawledData.amazon_best_sellers_products;
    return products.slice(0, maxResults).map(p => this.mapToProduct(p));
  }

  async getBestSellers(category?: string): Promise<Product[]> {
    const list = category === 'books'
      ? crawledData.amazon_best_sellers_books
      : crawledData.amazon_best_sellers_products;

    return list.map(p => this.mapToProduct(p));
  }

  async getTrendingKeywords(): Promise<Keyword[]> {
    return crawledData.trending_keywords_amazon_2024.map(k => ({
      keyword: k.keyword,
      searchVolume: k.searchVolume,
      competition: 0.5 // mock competition
    }));
  }

  private mapToProduct(raw: any): Product {
    // Extract ASIN from URL
    const asin = raw.productUrl.match(/\/([A-Z0-9]{10})(?:[/?]|$)/)?.[1] || 'UNKNOWN';
    const affiliateUrl = this.affiliateBuilder.buildProductLink(asin); // Use builder!

    return {
      asin,
      title: raw.title,
      price: cleanPrice(raw.price),
      rating: 4.5,
      reviewCount: 1000,
      imageUrl: raw.imageUrl,
      productUrl: raw.productUrl,
      affiliateUrl,
      category: 'General', // Would be extracted in real scrape
      isBestSeller: true
    };
  }
}
