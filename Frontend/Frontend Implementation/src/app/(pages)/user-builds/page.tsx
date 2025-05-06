// pages/user-builds.tsx

"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Eye, Plus, Trash2 } from "lucide-react"
import Footer from "@/components/Footers"
import { Button } from "@/components/ui/button"
import { api } from "@/lib/auth"
import { useRouter } from "next/navigation"

interface Build {
  id: number
  name: string
  price: number
  image_url?: string
}

export default function UserBuildsPage() {
  const router = useRouter()
  const [builds, setBuilds] = useState<Build[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBuilds = async () => {
      try {
        const response = await api.get<Build[]>("/builds")
        setBuilds(response.data)
      } catch (err) {
        console.error("Failed to fetch builds", err)
      } finally {
        setLoading(false)
      }
    }

    fetchBuilds()
  }, [])

  const handleDelete = async (id: number) => {
    try {
      await api.delete(`/builds/${id}`)
      setBuilds((prev) => prev.filter((b) => b.id !== id))
    } catch (err) {
      console.error("Delete failed", err)
    }
  }

  if (loading) {
    return <p className="text-center py-10">Loading builds...</p>
  }

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Your Builds</h1>
          <Button className="bg-purple-600 hover:bg-purple-700">
            <Plus className="mr-2 h-4 w-4" /> New Build
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {builds.map((build) => (
            <div
              key={build.id}
              className="bg-gray-100 rounded-lg overflow-hidden"
            >
              <div className="relative p-4">
                <button
                  className="absolute top-2 right-2 p-1 z-10"
                  onClick={() => handleDelete(build.id)}
                >
                  <Trash2 className="h-5 w-5" />
                </button>
                <div className="aspect-square relative">
                  <Image
                    src={build.image_url || "/placeholder.svg"}
                    alt={build.name}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              <Button
                variant="default"
                className="w-full rounded-t-none flex items-center justify-center gap-2 bg-black hover:bg-gray-800"
                onClick={() => router.push(`/builds/${build.id}`)}
              >
                <Eye className="h-5 w-5" />
                <span>Details</span>
              </Button>

              <div className="p-4">
                <h3 className="font-medium">{build.name}</h3>
                <p className="text-red-600 font-medium">${build.price}</p>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  )
}
