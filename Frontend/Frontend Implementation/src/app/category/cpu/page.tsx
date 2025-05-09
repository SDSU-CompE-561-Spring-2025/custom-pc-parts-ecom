"use client"

import { useEffect, useState } from "react"
import { api } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface Component {
  id: number
  name: string
  brand: string
  price: number
  image_url?: string
}

export default function CpuCategoryPage() {
  const [components, setComponents] = useState<Component[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchComponents = async () => {
      try {
        const response = await api.get("/components?category=CPU")
        setComponents(response.data.items)
      } catch (error) {
        console.error("Failed to fetch components:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchComponents()
  }, [])

  if (loading) {
    return <div className="p-4 text-center">Loading...</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Available CPUs</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {components.map((cpu) => (
          <div
            key={cpu.id}
            className="border rounded-lg p-4 shadow-sm flex flex-col items-center"
          >
            <img
              src={cpu.image_url}
              alt={cpu.name}
              className="w-40 h-40 object-contain mb-4"
            />
            <h2 className="text-lg font-semibold text-center">{cpu.name}</h2>
            <p className="text-sm text-gray-500">{cpu.brand}</p>
            <p className="mt-1 font-medium">${cpu.price.toFixed(2)}</p>
            <Link href={`/category/cpu/${cpu.id}`}>
              <Button className="mt-4 w-full">View Details</Button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}