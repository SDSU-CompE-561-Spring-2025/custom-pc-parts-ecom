"use client"

import { useState, useEffect } from "react"
import { api, isAuthenticated } from "@/lib/auth"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import Footer from "@/components/Footers"

interface Component {
  id: number
  name: string
  category: string
  price: number
  brand?: string
  image_url?: string
}

export default function BuildYourPC() {
  const [components, setComponents] = useState<Component[]>([])
  const [selectedComponents, setSelectedComponents] = useState<{ [category: string]: Component | null }>({})
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    async function fetchComponents() {
      try {
        const response = await api.get("/components?page=1&per_page=50")
        setComponents(response.data.items)
        setLoading(false)
      } catch (error) {
        console.error("Failed to fetch components", error)
        setLoading(false)
      }
    }
    fetchComponents()
  }, [])

  function handleSelectComponent(category: string, component: Component) {
    setSelectedComponents(prev => ({ ...prev, [category]: component }))
  }

  const subtotal = Object.values(selectedComponents).reduce((sum, item) => {
    return item ? sum + item.price : sum
  }, 0)

  const shipping = "-"
  const total = subtotal

  async function handleSubmitBuild() {
    if (!isAuthenticated()) {
      router.push("/login")
      return
    }

    const selectedIds = Object.values(selectedComponents)
      .filter(item => item !== null)
      .map(item => item!.id)

    const payload = {
      component_ids: selectedIds,
      name: "Custom Build " + new Date().toLocaleDateString()
    }

    try {
      const response = await api.post("/builds/", payload)

      if (response.status === 200 || response.status === 201) {
        alert("Build submitted successfully!")
        router.push("/")
      } else {
        console.error("Failed to submit build")
      }
    } catch (error) {
      console.error("Error submitting build", error)
    }
  }

  if (loading) {
    return <div className="container mx-auto px-4 py-6">Loading components...</div>
  }

  return (
    <>
      <main className="container mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link href="/" className="hover:text-foreground">
            Home
          </Link>
          <span>/</span>
          <span>Build Your PC</span>
        </div>

        {/* Component Selector */}
        <div className="space-y-6">
          {["CPU", "Motherboard", "Graphics Card", "Hard Drive", "Monitor", "Power Supply", "Case", "CPU Cooler"].map(category => (
            <div key={category} className="space-y-2">
              <h3 className="font-semibold">{category}</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {components
                  .filter(comp => comp.category === category)
                  .map(comp => (
                    <div
                      key={comp.id}
                      className={`border p-4 rounded cursor-pointer ${selectedComponents[category]?.id === comp.id ? "border-red-500" : ""}`}
                      onClick={() => handleSelectComponent(category, comp)}
                    >
                      <Image src={comp.image_url || "/placeholder.svg"} alt={comp.name} width={60} height={60} className="object-contain mb-2" />
                      <div>{comp.name}</div>
                      <div className="text-sm text-muted-foreground">${comp.price}</div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>

        {/* Build Total */}
        <div className="mt-8 border rounded-md p-6 max-w-md ml-auto">
          <h2 className="text-xl font-semibold mb-4">Build Total</h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>${subtotal}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping:</span>
              <span>{shipping}</span>
            </div>
            <Separator className="my-2" />
            <div className="flex justify-between font-semibold">
              <span>Total:</span>
              <span>${total}</span>
            </div>
          </div>
          <Button onClick={handleSubmitBuild} className="w-full mt-4 bg-red-500 hover:bg-red-600 text-white">
            Save Build
          </Button>
        </div>
      </main>
      <Footer />
    </>
  )
}
