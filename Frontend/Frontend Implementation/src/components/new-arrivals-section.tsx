"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useState, useEffect } from "react"
import axios from "axios"

interface ComponentItem {
  id: number
  name: string
  category: string
  price: number
  brand?: string
  image_url?: string
}

export default function NewArrivalsSection() {
  const [components, setComponents] = useState<ComponentItem[]>([])
  const [error, setError] = useState(false)

  useEffect(() => {
    async function fetchComponents() {
      try {
        const response = await axios.get<{ items: ComponentItem[] }>("http://localhost:8000/components?page=1&per_page=8", {
          withCredentials: true,
        })
        if (response.data.items.length > 0) {
          setComponents(response.data.items)
        } else {
          setError(true)
        }
      } catch (error) {
        console.warn("Backend not available or no components found.")
        setError(true)
      }
    }

    fetchComponents()
  }, [])

  return (
    <section className="p-4 mt-8">
      <div className="border-l-4 border-red-500 pl-2 mb-4">
        <h3 className="text-sm text-red-500 font-medium">Featured</h3>
      </div>
      <h2 className="text-2xl font-bold mb-4">New Arrivals</h2>

      {error ? (
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
                <Button variant="outline" className="text-white border-white hover:bg-gray-800">
                  Browse Now
                </Button>
              </div>
              <div className="mt-8">
                <Image
                  src={item.image_url || "/placeholder.svg"}
                  alt={item.name}
                  width={400}
                  height={200}
                  className="w-full object-contain"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}