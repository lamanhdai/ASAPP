export interface KeywordStats {
  keyword: string;
  searchVolume: number;
}

export interface ProductStats {
  asin: string;
  title: string;
  affiliateLink: string;
  imageUrl: string;
  price: string;
  rating: number;
  reviewCount: number;
  salesRank: number;
  description: string;
  state?: string;
}
