"use client"

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useState } from "react"

const searchHistory = [
  {
    id: 1,
    name: "AMD Ryzen 7 7800X3D 4.2 GHz 8-Core Processor",
    image: "https://ae01.alicdn.com/kf/S9b92491ef5a045668d13a032b0e0db79K.png",
    rating: 4.5,
    reviews: 445,
  },
  {
    id: 2,
    name: "Kingston 80mm Silent fan",
    image: "https://m.media-amazon.com/images/I/51nAfud0cSL._AC_UF894,1000_QL80_.jpg",
    rating: 5,
    reviews: 65,
  },
  {
    id: 3,
    name: "RGB liquid CPU Cooler",
    image: "https://i5.walmartimages.com/seo/CORSAIR-NAUTILUS-360-RS-ARGB-Liquid-CPU-Cooler-RS120-ARGB-Fans-Fits-Intel-LGA-1851-AMD-AM5-AM4-Simple-Daisy-Chain-Connections-Direct-Motherboard-Conn_287aac40-83dc-4721-9e99-c988a16cf187.b180ca1178499f3d984ddcf08c93501a.png",
    rating: 4,
    reviews: 95,
  },
  {
    id: 4,
    name: "Computer Cockpit Chair",
    image: "https://m.media-amazon.com/images/I/61VgYeMWKaL._AC_UF894,1000_QL80_.jpg",
    rating: 4.5,
    reviews: 48,
  },
]

export default function SearchHistorySection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const itemsPerPage = 4
  const totalPages = Math.ceil(searchHistory.length / itemsPerPage)

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + itemsPerPage >= searchHistory.length ? 0 : prevIndex + itemsPerPage))
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex - itemsPerPage < 0 ? Math.max(0, searchHistory.length - itemsPerPage) : prevIndex - itemsPerPage,
    )
  }

  const visibleItems = searchHistory.slice(currentIndex, currentIndex + itemsPerPage)

  const renderStars = (rating: number) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <svg
          key={`full-${i}`}
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="#FFD700"
          stroke="#FFD700"
          strokeWidth="1"
          className="h-4 w-4"
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>,
      )
    }

    if (hasHalfStar) {
      stars.push(
        <svg
          key="half"
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="#FFD700"
          stroke="#FFD700"
          strokeWidth="1"
          className="h-4 w-4"
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          <path d="M12 2 L12 17.77 L5.82 21.02 L7 14.14 L2 9.27 L8.91 8.26 Z" fill="white" stroke="none" />
        </svg>,
      )
    }

    const emptyStars = 5 - stars.length
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <svg
          key={`empty-${i}`}
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#FFD700"
          strokeWidth="1"
          className="h-4 w-4"
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>,
      )
    }

    return stars
  }

  return (
    <section className="p-4 mt-8">
      <div className="border-l-4 border-red-500 pl-2 mb-4">
        <h3 className="text-sm text-red-500 font-medium">Recent</h3>
      </div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Search History</h2>
        <div className="flex gap-2">
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {visibleItems.map((item) => (
          <Card key={item.id} className="overflow-hidden h-full flex flex-col">
            <CardContent className="p-4 flex justify-center items-center h-48">
              <div className="relative w-full h-full flex items-center justify-center">
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  width={150}
                  height={150}
                  className="object-contain max-h-full"
                  style={{ 
                    width: "auto", 
                    height: "auto", 
                    maxWidth: "100%", 
                    maxHeight: "100%" 
                  }}
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col items-start p-4 mt-auto">
              <h3 className="text-sm font-medium line-clamp-2 mb-1">{item.name}</h3>
              <div className="flex items-center gap-1 mb-1">{renderStars(item.rating)}</div>
              <p className="text-xs text-gray-500">({item.reviews})</p>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  )
}