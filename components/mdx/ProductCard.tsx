"use client";

import React from 'react';
import { Button } from '@/components/Button';

interface ProductCardProps {
  title: string;
  price: string;
  imageUrl: string;
  affiliateLink: string;
  rating?: number;
}

export function ProductCard({ title, price, imageUrl, affiliateLink, rating }: ProductCardProps) {
  return (
    <div className="border rounded-xl p-6 bg-white dark:bg-gray-800 shadow-sm transition hover:shadow-md my-8 not-prose">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-shrink-0 w-full md:w-48 h-48 bg-gray-100 rounded-lg overflow-hidden">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover mix-blend-multiply dark:mix-blend-normal"
          />
        </div>
        <div className="flex-1 flex flex-col">
          <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-gray-100">{title}</h3>
          {rating && (
            <div className="flex items-center mb-3">
              <span className="text-yellow-400 mr-1">★</span>
              <span className="text-sm text-gray-600 dark:text-gray-400">{rating} / 5.0</span>
            </div>
          )}
          <div className="text-2xl font-bold text-primary-600 mb-4">{price}</div>
          <div className="mt-auto">
            <a href={affiliateLink} target="_blank" rel="noopener noreferrer" className="no-underline">
              <Button className="w-full md:w-auto">
                Check Price on Amazon
              </Button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
