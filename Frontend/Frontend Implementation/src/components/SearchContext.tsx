"use client"

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Product } from "@/components/category/category-page";
// Correct the import path to the actual location of your sample-products.ts file
import { 
  cpuProducts, 
  cpuCoolerProducts, 
  motherboardProducts,
  memoryProducts,
  storageProducts,
  videoCardProducts,
  caseProducts,
  powerSupplyProducts,
  osProducts,
  monitorProducts
} from '@/data/sample-products';

// Combine all product arrays
const allProducts = [
  ...cpuProducts,
  ...cpuCoolerProducts,
  ...motherboardProducts,
  ...memoryProducts,
  ...storageProducts,
  ...videoCardProducts,
  ...caseProducts,
  ...powerSupplyProducts,
  ...osProducts,
  ...monitorProducts
];

type SearchContextType = {
  searchQuery: string;
  searchResults: Product[];
  isSearching: boolean;
  setSearchQuery: (query: string) => void;
  clearSearch: () => void;
};

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider = ({ children }: { children: ReactNode }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  // Update search results whenever search query changes
  React.useEffect(() => {
    if (searchQuery.trim() === '') {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    
    // Enhanced search implementation
    const query = searchQuery.toLowerCase();
    
    // First find exact matches in title
    let exactTitleMatches = allProducts.filter(product => 
      product.title.toLowerCase().includes(query)
    );
    
    // Then find category matches
    let categoryMatches = allProducts.filter(product => 
      (product.category as string).toLowerCase().replace(/-/g, ' ').includes(query) &&
      !exactTitleMatches.includes(product)
    );
    
    // Sort exact matches by rating and price
    exactTitleMatches.sort((a, b) => {
      // First by rating (descending)
      if (b.rating !== a.rating) {
        return b.rating - a.rating;
      }
      // Then by number of reviews (descending)
      if (b.reviews !== a.reviews) {
        return b.reviews - a.reviews;
      }
      // Finally by price (ascending)
      return a.price - b.price;
    });
    
    // Combine results with exact matches first
    const results = [...exactTitleMatches, ...categoryMatches];
    
    setSearchResults(results);
  }, [searchQuery]);

  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
    setIsSearching(false);
  };

  return (
    <SearchContext.Provider value={{ 
      searchQuery, 
      searchResults, 
      isSearching,
      setSearchQuery, 
      clearSearch 
    }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = (): SearchContextType => {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};