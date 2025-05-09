"use client"

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Eye, Trash2 } from "lucide-react"
import { useState, useEffect } from "react"
import { api, isAuthenticated } from "@/lib/auth"
import Link from "next/link"

interface Build {
  id: number
  name: string
}

export default function YourBuildsSection() {
  const [builds, setBuilds] = useState<Build[]>([])
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(true)
  const [currentIndex, setCurrentIndex] = useState(0)
  const itemsPerPage = 4

  useEffect(() => {
    async function fetchBuilds() {
      if (!isAuthenticated()) {
        setError(true)
        setLoading(false)
        return
      }

      try {
        const response = await api.get<Build[]>("/builds/")
        setBuilds(response.data)
      } catch (error) {
        console.warn("Failed to fetch builds.", error)
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    fetchBuilds()
  }, [])

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev + itemsPerPage >= builds.length ? 0 : prev + itemsPerPage
    )
  }

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev - itemsPerPage < 0 ? Math.max(0, builds.length - itemsPerPage) : prev - itemsPerPage
    )
  }

  const handleDeleteBuild = async (buildId: number) => {
    try {
      await api.delete(`/builds/${buildId}`)
      setBuilds(builds.filter(build => build.id !== buildId))
    } catch (error) {
      console.error("Failed to delete build", error)
    }
  }

  const visibleBuilds = builds.slice(currentIndex, currentIndex + itemsPerPage)

  if (loading) {
    return (
      <section className="p-4 mt-8">
        <div className="border-l-4 border-red-500 pl-2 mb-4">
          <h3 className="text-sm text-red-500 font-medium">Keep Building</h3>
        </div>
        <h2 className="text-2xl font-bold mb-4">Your Builds</h2>
        <p className="text-center text-gray-500 py-12 text-lg font-semibold">Loading your builds...</p>
      </section>
    )
  }

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

      {error || builds.length === 0 ? (
        <p className="text-center text-gray-500 py-12 text-lg font-semibold">
          {!isAuthenticated() ? (
            <>
              Please <Link href="/login" className="text-red-500 underline">log in</Link> to view your builds.
            </>
          ) : (
            "No builds found."
          )}
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {visibleBuilds.map((build) => (
            <Card key={build.id}>
              <CardContent className="p-4 pb-0 relative">
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 text-gray-500 hover:text-red-600"
                  onClick={() => handleDeleteBuild(build.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
                <h3 className="text-base font-semibold">{build.name}</h3>
              </CardContent>
              <CardFooter className="p-4">
                <Button
                  size="sm"
                  variant="secondary"
                  className="w-full justify-center"
                  asChild
                >
                  <Link href={`/user-builds/${build.id}`}>
                    <Eye className="mr-2 h-4 w-4" />
                    Details
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      <div className="flex justify-center mt-6">
        <Button variant="destructive" className="bg-red-500 hover:bg-red-600">
          <Link href="/builder" className="text-white">Build New PC</Link>
        </Button>
      </div>
    </section>
  )
}
