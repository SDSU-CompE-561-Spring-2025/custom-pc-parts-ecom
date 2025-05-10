// pages/user-builds.tsx

"use client"

import { useEffect, useState } from "react"
import { Eye, Plus, Trash2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import Footer from "@/components/Footers"
import { api } from "@/lib/auth"
import {
  Card,
  CardHeader,
  CardTitle,
  CardFooter
} from "@/components/ui/card"

interface Build {
  id: number
  name: string
}

export default function UserBuildsPage() {
  const router = useRouter()
  const [builds, setBuilds] = useState<Build[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchBuilds = async () => {
      try {
        const response = await api.get<Build[]>("/builds")
        setBuilds(response.data)
        setError(null)
      } catch (err: any) {
        console.error("Failed to fetch builds:", err)
        setError(err.response?.data?.detail || "Failed to fetch builds")
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
    } catch (err: any) {
      console.error("Delete failed:", err)
      alert(err.response?.data?.detail || "Failed to delete build")
    }
  }

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <main className="flex-1 container mx-auto px-4 py-8">
          <p className="text-center py-10">Loading builds...</p>
        </main>
        <Footer />
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col min-h-screen">
        <main className="flex-1 container mx-auto px-4 py-8">
          <div className="text-center py-10 text-red-500">{error}</div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Your Builds</h1>
          <Button
            className="bg-purple-600 hover:bg-purple-700"
            onClick={() => router.push("/builder")}
          >
            <Plus className="mr-2 h-4 w-4" />
            New Build
          </Button>
        </div>

        {builds.length === 0 ? (
          <div className="text-center py-10 text-gray-500">
            No builds found. Create your first build!
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {builds.map((build) => (
              <Card
                key={build.id}
                className="shadow-md hover:shadow-lg transition-all duration-200"
              >
                <CardHeader className="flex justify-between items-center">
                  <CardTitle className="truncate max-w-[85%] text-lg font-medium">
                    {build.name}
                  </CardTitle>
                  <button
                    className="text-gray-500 hover:text-red-600"
                    onClick={() => handleDelete(build.id)}
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </CardHeader>

                <CardFooter className="flex justify-end px-6">
                  <Button
                    variant="outline"
                    onClick={() => router.push(`/user-builds/${build.id}`)}
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    Details
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
