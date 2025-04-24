import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function HeroSection() {
  return (
    <section className="p-4">
      <div className="relative bg-black text-white rounded-lg overflow-hidden">
        <div className="p-8 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 space-y-4 z-10">
            <h2 className="text-3xl font-bold">GeForce RTX 5090</h2>
            <p className="text-xl">Game Changer</p>
            <Button className="bg-green-500 hover:bg-green-600 text-white">Learn More</Button>
          </div>
          <div className="md:w-1/2 flex justify-end">
            <Image
              src="/placeholder.svg?height=300&width=500"
              alt="GeForce RTX 5090"
              width={500}
              height={300}
              className="object-contain"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  )
}
