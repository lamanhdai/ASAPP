export interface ProductSchema {
  '@context': string;
  '@type': string;
  name: string;
  image: string;
  description: string;
  sku: string;
  brand: { '@type': string; name: string };
  offers: {
    '@type': string;
    priceCurrency: string;
    price: string;
    url: string;
    availability: string;
  };
}

export function generateProductSchema(params: {
  title: string;
  image: string;
  price: string;
  description: string;
  affiliateLink: string;
}): ProductSchema {
  return {
    '@context': 'https://schema.org/',
    '@type': 'Product',
    name: params.title,
    image: params.image,
    description: params.description,
    sku: '',
    brand: { '@type': 'Brand', name: 'Amazon' },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'USD',
      price: params.price.replace('$', ''),
      url: params.affiliateLink,
      availability: 'https://schema.org/InStock',
    },
  };
}
