import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function NewArrivalsSection() {
  return (
    <section className="p-4 mt-8">
      <div className="border-l-4 border-red-500 pl-2 mb-4">
        <h3 className="text-sm text-red-500 font-medium">Featured</h3>
      </div>
      <h2 className="text-2xl font-bold mb-4">New Arrivals</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-black text-white p-6 rounded-lg">
          <div className="mb-4">
            <h3 className="text-2xl font-bold mb-4">GPU</h3>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="text-xs bg-gray-800 px-2 py-1 rounded">RTX 5090</span>
              <span className="text-xs bg-gray-800 px-2 py-1 rounded">RTX 4090</span>
              <span className="text-xs bg-gray-800 px-2 py-1 rounded">RTX 4070 Ti</span>
              <span className="text-xs bg-gray-800 px-2 py-1 rounded">RTX 4070</span>
            </div>
            <p className="text-sm mb-4">Check out new GPU options from all over the marketplace.</p>
            <Button variant="outline" className="text-white border-white hover:bg-gray-800">
              Browse Now
            </Button>
          </div>
          <div className="mt-8">
            <Image src="/placeholder.svg?height=200&width=400" alt="GPU" width={400} height={200} className="w-full" />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          <div className="bg-blue-900 text-white p-6 rounded-lg flex items-center">
            <div className="flex-1">
              <h3 className="text-2xl font-bold mb-2">CPU</h3>
              <p className="text-sm mb-4">Check out new CPU options from all over the marketplace.</p>
              <Button variant="outline" className="text-white border-white hover:bg-blue-800">
                Browse Now
              </Button>
            </div>
            <div className="w-1/2">
              <Image
                src="/placeholder.svg?height=150&width=150"
                alt="CPU"
                width={150}
                height={150}
                className="w-full"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-900 text-white p-4 rounded-lg">
              <h3 className="text-xl font-bold mb-2">Keyboards</h3>
              <p className="text-xs mb-4">Browse our selection</p>
              <Button variant="link" className="text-white p-0 h-auto">
                Browse Now
              </Button>
              <div className="mt-2">
                <Image
                  src="/placeholder.svg?height=100&width=150"
                  alt="Keyboards"
                  width={150}
                  height={100}
                  className="w-full"
                />
              </div>
            </div>

            <div className="bg-gray-800 text-white p-4 rounded-lg">
              <h3 className="text-xl font-bold mb-2">Gaming Chairs</h3>
              <p className="text-xs mb-4">Browse our selection</p>
              <Button variant="link" className="text-white p-0 h-auto">
                Browse Now
              </Button>
              <div className="mt-2">
                <Image
                  src="/placeholder.svg?height=100&width=150"
                  alt="Gaming Chairs"
                  width={150}
                  height={100}
                  className="w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
