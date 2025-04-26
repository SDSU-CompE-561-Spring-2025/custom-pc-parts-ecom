import type { FC } from "react"

interface StarRatingProps {
  rating: number
  maxRating?: number
  reviews?: number
}

export const StarRating: FC<StarRatingProps> = ({ rating, maxRating = 5, reviews }) => {
  return (
    <div className="flex items-center">
      {Array.from({ length: maxRating }).map((_, i) => (
        <svg
          key={i}
          className={`w-4 h-4 fill-current ${i < rating ? "text-yellow-400" : "text-gray-300"}`}
          viewBox="0 0 24 24"
        >
          <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
        </svg>
      ))}
      {reviews && <span className="text-xs text-gray-500 ml-1">{reviews}/5</span>}
    </div>
  )
}
