"use client"

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Eye, Trash2 } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

const builds = [
  {
    id: 1,
    name: "My first build",
    price: "$999",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 2,
    name: "Rainbow themed build",
    price: "$1050",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 3,
    name: "CyberPowerPC Gamer Theme",
    price: "$899",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 4,
    name: "Current Build",
    price: "$949",
    image: "/placeholder.svg?height=200&width=200",
  },
]

export default function YourBuildsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const itemsPerPage = 4
  const totalPages = Math.ceil(builds.length / itemsPerPage)

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + itemsPerPage >= builds.length ? 0 : prevIndex + itemsPerPage))
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex - itemsPerPage < 0 ? Math.max(0, builds.length - itemsPerPage) : prevIndex - itemsPerPage,
    )
  }

  const visibleBuilds = builds.slice(currentIndex, currentIndex + itemsPerPage)

  return (
    <section className="p-4 mt-8">
      <div className="border-l-4 border-red-500 pl-2 mb-4">
        <h3 className="text-sm text-red-500 font-medium">Keep Building</h3>
      </div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Your Builds</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="icon" onClick={prevSlide} disabled={builds.length <= itemsPerPage}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={nextSlide} disabled={builds.length <= itemsPerPage}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {visibleBuilds.map((build) => (
          <Card key={build.id} className="overflow-hidden">
            <CardContent className="p-0">
              <div className="relative">
                <Image
                  src={build.image || "/placeholder.svg"}
                  alt={build.name}
                  width={200}
                  height={200}
                  className="w-full h-auto"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 bg-white/80 hover:bg-white/90 rounded-full"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col items-start p-4 bg-gray-100">
              <div className="flex items-center gap-2 mb-2">
                <Eye className="h-4 w-4" />
                <span className="text-xs">Details</span>
              </div>
              <h3 className="text-sm font-medium">{build.name}</h3>
              <p className="text-sm font-bold">{build.price}</p>
            </CardFooter>
          </Card>
        ))}
      </div>
      <div className="flex justify-center mt-6">
        <Button variant="destructive" className="bg-red-500 hover:bg-red-600">
          View All Builds
        </Button>
      </div>
    </section>
  )
}
