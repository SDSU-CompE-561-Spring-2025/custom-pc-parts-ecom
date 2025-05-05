"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import Footer from "@/components/Footers"
import { cpuCoolerProducts } from "@/data/sample-products"
import { StarRating } from "@/components/star-rating"
import Navbar from "@/components/Navbar" // If you have one

export default function ProductDetailPage() {
  const params = useParams()
  const productId = params.id as string
  
  const [product, setProduct] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  
  useEffect(() => {
    // Find the product by ID from your data source
    const foundProduct = cpuCoolerProducts.find(p => p.id.toString() === productId)
    
    if (foundProduct) {
      setProduct(foundProduct)
    }
    
    setLoading(false)
  }, [productId])
  
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }
  
  const increaseQuantity = () => {
    setQuantity(quantity + 1)
  }
  
  if (loading) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>
  }
  
  if (!product) {
    return <div className="container mx-auto px-4 py-8">Product not found</div>
  }

  return (
    <>
      {/* If you have a Navbar component */}
      {/* <Navbar /> */}
      
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex text-sm text-gray-500 mb-6">
          <Link href="/category" className="hover:underline">Components</Link>
          <span className="mx-2">&gt;</span>
          <Link href="/category/cpu-cooler" className="hover:underline">CPU Coolers</Link>
          <span className="mx-2">&gt;</span>
          <span>{product.title}</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Product Images */}
          <div>
            <div className="bg-white border p-4 rounded-lg">
              <img 
                src={product.image || "/placeholder.svg"} 
                alt={product.title} 
                className="w-full h-auto" 
              />
            </div>
          </div>
          
          {/* Product Details */}
          <div>
            <h1 className="text-2xl font-bold mb-2">{product.title}</h1>
            
            <div className="mb-4">
              <StarRating rating={product.rating} reviews={product.reviews} />
            </div>
            
            <div className="text-2xl font-bold text-gray-900 mb-6">${product.price.toFixed(2)}</div>
            
            <p className="text-gray-700 mb-6">{product.description || "No description available"}</p>
            
            {/* Quantity and Add to Build */}
            <div className="flex items-center space-x-4 mb-6">
              <div className="flex border rounded-md overflow-hidden">
                <button 
                  className="px-3 py-1 bg-gray-100 hover:bg-gray-200"
                  onClick={decreaseQuantity}
                >
                  -
                </button>
                <input 
                  type="text" 
                  className="w-12 text-center" 
                  value={quantity} 
                  readOnly 
                />
                <button 
                  className="px-3 py-1 bg-gray-100 hover:bg-gray-200"
                  onClick={increaseQuantity}
                >
                  +
                </button>
              </div>
              
              <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-md">
                Add to Build
              </button>
            </div>
            
            <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md w-full mb-4">
              Check Compatibility
            </button>
            
            {/* Specifications if available */}
            {product.specs && (
              <>
                <h3 className="text-xl font-semibold mt-6 mb-2">Specifications</h3>
                <div className="grid grid-cols-2 gap-2">
                  {product.specs.map((spec: any, index: number) => (
                    <div key={index} className="flex justify-between p-2 border-b">
                      <span className="font-medium">{spec.label}:</span>
                      <span>{spec.value}</span>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}