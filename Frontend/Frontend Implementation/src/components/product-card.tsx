"use client"

import type { FC } from "react"
import { StarRating } from "@/components/star-rating"
import Link from "next/link"
import { UuidProvider } from "@/components/UuidProvider"

interface ProductCardProps {
  title: string
  image: string
  price: number
  rating: number
  reviews: number
  id: number | string
  category?: string
  categorySlug?: string // Added this prop
}

// Regular ProductCard that handles the case where we already have a UID
export const ProductCard: FC<ProductCardProps> = (props) => {
  return (
    <UuidProvider id={props.id}>
      {(uid) => <ProductCardInner {...props} uid={uid} />}
    </UuidProvider>
  )
}

// Inner component that receives the generated UUID
interface ProductCardInnerProps extends ProductCardProps {
  uid: string
}
const ProductCardInner: FC<ProductCardInnerProps> = ({
  title,
  image,
  price,
  rating,
  reviews,
  id,
  uid, // This comes from UuidProvider
  category,
  categorySlug
}) => {
  // Create the dynamic path based on whether we have a categorySlug
  const categoryPath = categorySlug || (category?.toLowerCase().replace(/\s+/g, '-') || 'product');
  const productPath = `/category/${categoryPath}/${uid}`;
  
  console.log('ProductCard props:', { categorySlug, category, id, uid, productPath });

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
      <Link href={productPath}>
        <div className="p-4">
          <img src={image || "/placeholder.svg"} alt={title} className="w-full h-48 object-contain" />
          <div className="mt-4">
            <div className="text-sm text-gray-600">{title}</div>
            <div className="mt-1">
              <StarRating rating={rating} reviews={reviews} />
            </div>
            <div className="font-bold mt-1">${price.toFixed(2)}</div>
          </div>
        </div>
      </Link>
    </div>
  )
}

