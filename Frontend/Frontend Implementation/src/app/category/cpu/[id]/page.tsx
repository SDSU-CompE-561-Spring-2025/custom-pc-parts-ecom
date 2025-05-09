"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import Footer from "@/components/Footers"
import { api } from "@/lib/auth" 

// Sample mock reviews
const mockReviews = [
  { id: "1", author: "Samantha D.", rating: 4.5, verified: true, content: "This was one of the best ones I've used." },
  { id: "2", author: "Alex M.", rating: 4, verified: true, content: "Exceeded my expectations" },
  { id: "3", author: "Ethan R.", rating: 3.5, verified: true, content: "Perfect for gamers! But the delivery was late." },
  { id: "4", author: "Olivia P.", rating: 5, verified: true, content: "Really functional" },
  { id: "5", author: "Liam K.", rating: 4, verified: true, content: "Amazing" },
  { id: "6", author: "Ava H.", rating: 4.5, verified: true, content: "One of the best I've used" }
]

export default function ProductDetailPage() {
  const { id } = useParams()
  const [product, setProduct] = useState<any>(null)
  const [loading, setLoading] = useState(true)

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
    if (id) fetchComponent()
  }, [id])

  if (loading) return <div className="container mx-auto px-4 py-8">Loading...</div>
  if (!product) return <div className="container mx-auto px-4 py-8">Product not found</div>

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
              <button className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 transition">
                Add to Build
              </button>
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
            {mockReviews.map((review) => (
              <div key={review.id} className="bg-white border rounded-lg p-6 shadow-sm hover:shadow-md transition">
                <div className="mb-2 font-semibold">{review.author}</div>
                <div className="text-gray-700">{review.content}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}
