"use client"

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Eye, Trash2 } from "lucide-react"
import Image from "next/image"
import { useState, useEffect } from "react"
import axios from "axios"

interface Build {
  id: number
  name: string
  price: string
  image: string
}

export default function YourBuildsSection() {
  const [builds, setBuilds] = useState<Build[]>([])
  const [error, setError] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const itemsPerPage = 4

  useEffect(() => {
    async function fetchBuilds() {
      try {
        const response = await axios.get<Build[]>("http://localhost:8000/builds/", {
          withCredentials: true,
        })
        if (response.data && response.data.length > 0) {
          setBuilds(response.data)
        } else {
          setError(true)
        }
      } catch (error) {
        console.warn("Backend not available or no builds found.")
        setError(true)
      }
    }

    fetchBuilds()
  }, [])

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + itemsPerPage >= builds.length ? 0 : prevIndex + itemsPerPage))
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex - itemsPerPage < 0 ? Math.max(0, builds.length - itemsPerPage) : prevIndex - itemsPerPage
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

      {/* Display either builds or error message */}
      {error || builds.length === 0 ? (
        <div className="text-center text-gray-500 py-12 text-lg font-semibold">
          No builds found.
        </div>
      ) : (
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
      )}

      <div className="flex justify-center mt-6">
        <Button variant="destructive" className="bg-red-500 hover:bg-red-600">
          View All Builds
        </Button>
      </div>
    </section>
  )
}
