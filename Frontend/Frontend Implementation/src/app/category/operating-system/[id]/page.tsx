"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import Footer from "@/components/Footers"
import { osProducts } from "@/data/sample-products"
import { StarRating } from "@/components/star-rating"

// Mock reviews data
const mockReviews = [
  {
    id: "1",
    author: "Samantha D.",
    rating: 4.5,
    verified: true,
    content: "This was one of the best ones I've used.",
  },
  {
    id: "2",
    author: "Alex M.",
    rating: 4,
    verified: true,
    content: "Exceeded my expectations",
  },
  {
    id: "3",
    author: "Ethan R.",
    rating: 3.5,
    verified: true,
    content: "Perfect for gamers! But the delivery was late.",
  },
  {
    id: "4",
    author: "Olivia P.",
    rating: 5,
    verified: true,
    content: "Really functional",
  },
  {
    id: "5",
    author: "Liam K.",
    rating: 4,
    verified: true,
    content: "Amazing",
  },
  {
    id: "6",
    author: "Ava H.",
    rating: 4.5,
    verified: true,
    content: "One of the best I've used",
  }
]

export default function ProductDetailPage() {
  const params = useParams()
  const productId = params.id as string
  
  const [product, setProduct] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    // Find the product by ID from the osProducts array
    const foundProduct = osProducts.find(p => p.id.toString() === productId)
    
    if (foundProduct) {
      setProduct(foundProduct)
    }
    
    setLoading(false)
  }, [productId])
  
  
  if (loading) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>
  }
  
  if (!product) {
    return <div className="container mx-auto px-4 py-8">Product not found</div>
  }

  // Function to render stars
  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(
          <svg
            key={`full-${i}`}
            className="w-6 h-6 text-yellow-400 fill-yellow-400"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        );
      } else if (i - 0.5 <= rating) {
        // Half star
        stars.push(
          <svg
            key={`half-${i}`}
            className="w-6 h-6 text-yellow-400"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            <path d="M12 2v15.77" stroke="none" fill="currentColor" />
            <path d="M12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" stroke="none" fill="currentColor" />
          </svg>
        );
      } else {
        stars.push(
          <svg
            key={`empty-${i}`}
            className="w-6 h-6 text-yellow-400"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        );
      }
    }
    return stars;
  };

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex text-sm text-gray-500 mb-6">
          <Link href="/browse-components" className="hover:underline">Components</Link>
          <span className="mx-2">&gt;</span>
          <Link href="/category/operating-system" className="hover:underline">Operating System</Link>
          <span className="mx-2">&gt;</span>
          <span>{product.title}</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Product Images */}
          <div>
            <div className="bg-white border p-4 rounded-lg">
              <div className="h-[400px] flex items-center justify-center">
                <Image 
                  src={product.image || "/placeholder.svg"} 
                  alt={product.title} 
                  width={400}
                  height={400}
                  className="object-contain max-h-full"
                  style={{
                    width: "auto",
                    height: "auto",
                    maxWidth: "100%",
                    maxHeight: "100%",
                  }}
                />
              </div>
            </div>
          </div>
          
          {/* Product Details */}
          <div>
            <h1 className="text-2xl font-bold mb-2">{product.title}</h1>
            
            <div className="mb-4">
              <StarRating rating={product.rating} reviews={product.reviews} />
            </div>
            
            <div className="text-2xl font-bold text-gray-900 mb-6">${product.price.toFixed(2)}</div>
            
            <p className="text-gray-700 mb-6">{product.description || "A high-quality PC Operating System designed for optimal airflow and component compatibility."}</p>
            
            {/* Quantity and Add to Build */}
            <div className="flex items-center space-x-4 mb-6">

              
              <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-md">
                Add to Build
              </button>
            </div>
            
            
            {/* Generate specs from product data */}
            <h3 className="text-xl font-semibold mt-6 mb-2">Specifications</h3>
            <div className="grid grid-cols-2 gap-2">
              <div className="flex justify-between p-2 border-b">
                <span className="font-medium">Brand:</span>
                <span>{product.category === "operating-system" ? product.title.split(" ")[0] : "Generic"}</span>
              </div>
              <div className="flex justify-between p-2 border-b">
                <span className="font-medium">Category:</span>
                <span>Operating System</span>
              </div>
              <div className="flex justify-between p-2 border-b">
                <span className="font-medium">Rating:</span>
                <span>{product.rating} out of 5</span>
              </div>
              <div className="flex justify-between p-2 border-b">
                <span className="font-medium">Reviews:</span>
                <span>{product.reviews}</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Reviews Section - Styled like the image */}
        <div className="mt-16">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-bold">All Reviews</h2>
              <span className="text-gray-500">({product.reviews || 451})</span>
            </div>
            
            <div className="flex items-center gap-4">
              <button className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="21" y1="10" x2="3" y2="10"></line>
                  <line x1="21" y1="6" x2="3" y2="6"></line>
                  <line x1="21" y1="14" x2="3" y2="14"></line>
                  <line x1="21" y1="18" x2="3" y2="18"></line>
                </svg>
              </button>
              
              <div className="relative">
                <button className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-md">
                  <span>Latest</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </button>
              </div>
              
              <button className="bg-black text-white hover:bg-gray-800 px-4 py-2 rounded-full">
                Write a Review
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mockReviews.map((review) => (
              <div key={review.id} className="border rounded-lg p-6 relative">
                <div className="flex flex-col">
                  <div className="flex items-center mb-2">
                    {renderStars(review.rating)}
                  </div>
                  
                  <div className="flex items-center mb-3">
                    <h3 className="text-lg font-medium">{review.author}</h3>
                    {review.verified && (
                      <div className="ml-2 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </div>
                    )}
                  </div>
                  
                  <p className="text-gray-700">{review.content}</p>
                </div>
                
                <button className="absolute top-4 right-4 text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="1"></circle>
                    <circle cx="19" cy="12" r="1"></circle>
                    <circle cx="5" cy="12" r="1"></circle>
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <Footer />
    </>
  )
}