import type { FC } from "react"
import { StarRating } from "@/components/star-rating"
import Link from "next/link"

interface ProductCardProps {
  title: string
  image: string
  price: number
  rating: number
  reviews: number
  id: number | string
  category?: string
}

export const ProductCard: FC<ProductCardProps> = ({ title, image, price, rating, reviews, id, category }) => {
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
      <Link href={`/product/${id}`}>
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
