"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useState, useEffect } from "react"
import { api } from "@/lib/auth"

interface ComponentItem {
  id: number
  name: string
  category: string
  price: number
  brand?: string
  image_url?: string
}

interface ComponentResponse {
  items: ComponentItem[]
  total: number
  page: number
  per_page: number
}

export default function NewArrivalsSection() {
  const [components, setComponents] = useState<ComponentItem[]>([])
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchComponents() {
      try {
        console.log('Fetching components from:', api.defaults.baseURL + '/components?page=1&per_page=4')
        const response = await api.get<ComponentResponse>("/components?page=1&per_page=4")
        console.log('Response received:', response.data)
        if (response.data.items.length > 0) {
          setComponents(response.data.items)
        } else {
          console.warn('No components found in response')
          setError(true)
        }
      } catch (error: any) {
        console.error("Error fetching components:", {
          message: error.message,
          response: error.response?.data,
          status: error.response?.status,
          headers: error.response?.headers
        })
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    fetchComponents()
  }, [])

  if (loading) {
    return (
      <section className="p-4 mt-8">
        <div className="border-l-4 border-red-500 pl-2 mb-4">
          <h3 className="text-sm text-red-500 font-medium">Featured</h3>
        </div>
        <h2 className="text-2xl font-bold mb-4">New Arrivals</h2>
        <div className="text-center text-gray-500 py-12 text-lg font-semibold">
          Loading components...
        </div>
      </section>
    )
  }

  return (
    <section className="p-4 mt-8">
      <div className="border-l-4 border-red-500 pl-2 mb-4">
        <h3 className="text-sm text-red-500 font-medium">Featured</h3>
      </div>
      <h2 className="text-2xl font-bold mb-4">New Arrivals</h2>

      {error || components.length === 0 ? (
        <div className="text-center text-gray-500 py-12 text-lg font-semibold">
          No components found.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {components.map((item) => (
            <div key={item.id} className="bg-black text-white p-6 rounded-lg flex flex-col">
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-4">{item.name}</h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="text-xs bg-gray-800 px-2 py-1 rounded">{item.category}</span>
                  {item.brand && (
                    <span className="text-xs bg-gray-800 px-2 py-1 rounded">{item.brand}</span>
                  )}
                  <span className="text-xs bg-gray-800 px-2 py-1 rounded">${item.price}</span>
                </div>
                <p className="text-sm mb-4">Discover new {item.category} from top brands.</p>
                <Button variant="outline" className="text-red-500 border-white hover:bg-gray-800 hover:text-white">
                   Browse Now
                </Button>
              </div>

              <div className="mt-8 h-[200px] w-full relative">
                {item.image_url ? (
                  <Image
                    src={item.image_url}
                    alt={item.name}
                    fill
                    className="object-contain mx-auto"
                  />
                ) : (
                  <Image
                    src="/placeholder.svg"
                    alt="No Image"
                    fill
                    className="object-contain mx-auto"
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
