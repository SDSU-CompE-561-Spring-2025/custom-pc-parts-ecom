"use client"

import React, { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { useSearch } from '@/components/SearchContext'
import Footer from '@/components/Footers'

const SearchPage = () => {
  const searchParams = useSearchParams()
  const query = searchParams.get('q') || ''
  const { searchResults, setSearchQuery } = useSearch()

  // Set search query from URL parameter
  useEffect(() => {
    setSearchQuery(query)
  }, [query, setSearchQuery])

  return (
    <>
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">
        Search Results for "{query}"
      </h1>

      {searchResults.length === 0 ? (
        <div className="text-center py-12">
          <h2 className="text-xl font-medium mb-4">No results found</h2>
          <p className="text-gray-600 mb-8">
            We couldn't find any products matching your search. Please try different keywords.
          </p>
          <Link 
            href="/"
            className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700"
          >
            Back to Home
          </Link>
        </div>
      ) : (
        <div>
          <p className="text-gray-600 mb-6">{searchResults.length} products found</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {searchResults.map((product) => (
              <Link 
                href={`/category/${product.category}/${product.id}`}
                key={`${product.category}-${product.id}`}
                className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="h-48 bg-gray-200">
                  {product.image && (
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-contain"
                    />
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-lg mb-1 line-clamp-2">{product.title}</h3>
                  <p className="text-blue-600 font-bold">${product.price.toFixed(2)}</p>
                  <div className="flex items-center mt-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <svg 
                          key={i} 
                          className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`} 
                          fill="currentColor" 
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-gray-500 text-sm ml-2">({product.reviews})</span>
                  </div>
                  <div className="mt-2">
                    <span className="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded-full">
                      {(product.category as string).replace(/-/g, ' ')}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
    <div className="w-full">
    <Footer />
  </div>
  
</>
  )
}

export default SearchPage