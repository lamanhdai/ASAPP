export class AffiliateLinkBuilder {
  private trackingTag: string;
  private marketplace: string;

  constructor() {
    this.trackingTag = process.env.AMAZON_AFFILIATE_TAG || 'default-tag-20';
    this.marketplace = process.env.AMAZON_MARKETPLACE || 'amazon.com';
  }

  /**
   * Builds a clean affiliate link from an ASIN.
   */
  public buildProductLink(asin: string): string {
    return `https://www.${this.marketplace}/dp/${asin}?tag=${this.trackingTag}&linkCode=ll2&language=${process.env.AMAZON_DEFAULT_LANGUAGE || 'en_US'}`;
  }

  /**
   * Converts a raw Amazon URL into a clean affiliate link.
   * Extracts ASIN and rebuilds the URL to ensure no other tracking params exist.
   */
  public buildProductLinkFromUrl(url: string): string {
    const asinMatch = url.match(/\/([A-Z0-9]{10})(?:[/?]|$)/);
    if (asinMatch && asinMatch[1]) {
      return this.buildProductLink(asinMatch[1]);
    }
    // Fallback if ASIN not found (shouldn't happen with valid URLs)
    return url;
  }
}
