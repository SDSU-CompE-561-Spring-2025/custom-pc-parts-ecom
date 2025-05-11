"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import Footer from "@/components/Footers"
import { api } from "@/lib/auth" 

type Review = {
  id: number
  user_id: number
  component_id: number | null
  rating: number
  title?: string
  content?: string
  verified: boolean
  status: string
  created_at?: string
  updated_at?: string
  // Include user data if you have it in the API response
  user?: {
    username: string
  }}

export default function ProductDetailPage() {
  const { id } = useParams()
  const [product, setProduct] = useState<any>(null)
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const [displayCount, setDisplayCount] = useState(6) // Set initial display count to 6
  
  const shuffleArray = (array: any) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  useEffect(() => {
    async function fetchComponent() {
      try {
        const res = await api.get(`/components/${id}`)
        setProduct(res.data)
      } catch (error) {
        console.error("Failed to fetch component", error)
      } finally {
        setLoading(false)
      }
    }
    async function fetchReviews() {
      try {
        // Add trailing slash to match the FastAPI route definition
        const reviewsRes = await api.get('/api/v1/reviews');
        console.log('Reviews fetched successfully:', reviewsRes.data);
        
        // Shuffle the reviews array using Fisher-Yates algorithm
        const shuffledReviews = shuffleArray(reviewsRes.data || []);
        setReviews(shuffledReviews);
      } catch (error) {
        console.error('Failed to fetch reviews:', error);
        setReviews([]); // Set empty array on error
      }
    }
    // Keep the original fetchComponent call
    if (id) {
      fetchComponent()
      fetchReviews() // Add this line to fetch reviews
    }
  }, [id])
  
  // Function to display more reviews
  const handleLoadMore = () => {
    setDisplayCount(prevCount => prevCount + 6);
  }

  if (loading) return <div className="container mx-auto px-4 py-8">Loading...</div>
  if (!product) return <div className="container mx-auto px-4 py-8">Product not found</div>

  // Get only the first 6 (or displayCount) reviews for display
  const displayedReviews = reviews.slice(0, displayCount);
  const hasMoreReviews = reviews.length > displayCount;

  return (
    <>
      <div className="container mx-auto px-4 py-10">
        {/* Breadcrumb */}
        <div className="text-sm text-gray-500 mb-6 flex items-center gap-2">
          <Link href="/" className="hover:underline">Components</Link>
          <span>&gt;</span>
          <Link href="/category/cpu" className="hover:underline">CPU</Link>
          <span>&gt;</span>
          <span>{product.name}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          {/* Product Image */}
          <div className="border rounded-lg p-6 shadow-sm hover:shadow-md transition">
            <Image
              src={product.image_url || "/placeholder.svg"}
              alt={product.name}
              width={400}
              height={400}
              className="object-contain mx-auto max-h-[300px]"
            />
          </div>

          {/* Product Details */}
          <div>
            <h1 className="text-2xl font-bold mb-2">{product.name}</h1>

            <p className="text-xl font-semibold text-gray-800 mb-2">${product.price?.toFixed(2)}</p>

            <p className="text-gray-500 italic mb-4">
              {product.description || "No description available."}
            </p>

            <div className="mt-6 flex justify-start">
            <a href="/builder" className="inline-block">
              <button className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 transition">
                Create A Build
              </button>
            </a>

            </div>

            {/* Specifications */}
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4">Specifications</h2>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-600 font-medium">Brand:</span>
                  <span>{product.brand || "N/A"}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-600 font-medium">Category:</span>
                  <span>{product.category || "N/A"}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews */}
        <div className="mt-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">All Reviews</h2>
            <button className="bg-black text-white px-4 py-2 rounded-full hover:bg-gray-800 transition">
              Write a Review
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {displayedReviews.length > 0 ? (
              displayedReviews.map((review) => (
                <div key={review.id} className="bg-white border rounded-lg p-6 shadow-sm hover:shadow-md transition">
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-semibold">
                      {review.user?.username || `User ${review.user_id}`}
                    </div>
                    <div className="flex items-center">
                      <span className="text-amber-500 mr-1">★</span>
                      <span>{review.rating}</span>
                      {review.verified && (
                        <span className="ml-2 text-xs text-green-600 bg-green-100 px-2 py-0.5 rounded-full">Verified</span>
                      )}
                    </div>
                  </div>
                  {review.title && (
                    <div className="font-medium mb-1">{review.title}</div>
                  )}
                  <div className="text-gray-700">{review.content}</div>
                </div>
              ))
            ) : (
              <div className="col-span-2 text-center py-8 text-gray-500">
                No reviews available for this product.
              </div>
            )}
          </div>
          
          {/* Show "Load More" button if there are more reviews */}
          {hasMoreReviews && (
            <div className="text-center mt-8">
              <button 
                onClick={handleLoadMore}
                className="bg-gray-200 text-gray-800 px-6 py-2 rounded-md hover:bg-gray-300 transition"
              >
                Load More Reviews
              </button>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  )
}