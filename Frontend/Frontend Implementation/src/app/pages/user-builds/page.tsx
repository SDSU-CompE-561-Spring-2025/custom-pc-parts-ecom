import Link from "next/link"
import Image from "next/image"
import { Eye, Plus, Trash2 } from 'lucide-react'
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footers"
import { Button } from "@/components/ui/button"

export default function Home() {
  // Sample build data
  const builds = [
    {
      id: 1,
      name: "My first build",
      price: 960,
      image: "/images/build1.png"
    },
    {
      id: 2,
      name: "Rainbow themed build",
      price: 1960,
      image: "/images/build2.png"
    },
    {
      id: 3,
      name: "CyberPowerPC Gamer Theme",
      price: 960,
      image: "/images/build3.png",
      highlighted: true
    },
    {
      id: 4,
      name: "Current Build",
      price: 960,
      image: "/images/build4.png"
    }
  ]

  return (
    <div className="flex flex-col min-h-screen">
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Your Builds</h1>
          <Button className="bg-purple-600 hover:bg-purple-700">
            <Plus className="mr-2 h-4 w-4" /> Cart
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {builds.map((build) => (
            <div 
              key={build.id} 
              className={`bg-gray-100 rounded-lg overflow-hidden ${
                build.highlighted ? 'ring-2 ring-purple-500' : ''
              }`}
            >
              <div className="relative p-4">
                <button className="absolute top-2 right-2 p-1 z-10">
                  <Trash2 className="h-5 w-5" />
                </button>
                <div className="aspect-square relative">
                  <Image
                    src={build.image || "/placeholder.svg"}
                    alt={build.name}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              
              <Button variant="default" className="w-full rounded-t-none flex items-center justify-center gap-2 bg-black hover:bg-gray-800">
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
