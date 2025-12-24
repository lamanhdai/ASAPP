export interface Product {
  asin: string;
  title: string;
  price: number;
  rating: number;
  reviewCount: number;
  imageUrl: string;
  productUrl: string;
  affiliateUrl: string;
  category: string;
  isBestSeller: boolean;
  salesRank?: number;
}

export interface Keyword {
  keyword: string;
  searchVolume: number; // approximate monthly volume
  competition?: number; // 0-1 score
}
