"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

const images = [
  {
    src: "https://www.nvidia.com/content/dam/en-zz/Solutions/geforce/graphic-cards/50-series/rtx-5090/geforce-rtx-5090-learn-more-og-1200x630.jpg",
    title: "GeForce RTX 5090",
    description: "Game Changer",
  },
  {
    src: "https://tpucdn.com/review/intel-core-i9-14900k/images/title.jpg",
    title: "Intel Core i9-14900K",
    description: "Ultimate Performance",
  },
  {
    src: "https://c1.neweggimages.com/BizIntell/item/CPU/Processors%20-%20Desktops/19-113-841b/Ryzen9_9950X_01b.jpg",
    title: "Ryzen 9 9950X",
    description: "Unmatched Power",
  },
]

export default function HeroSection() {
  const [currentImage, setCurrentImage] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="p-4">
      <div className="relative bg-black text-white rounded-lg overflow-hidden w-full max-w-7xl mx-auto">
        <div className="p-8 flex flex-col md:flex-row items-center justify-between h-full w-full">
          <div className="md:w-1/2 space-y-4 z-10">
            <h2 className="text-3xl font-bold">{images[currentImage].title}</h2>
            <p className="text-xl">{images[currentImage].description}</p>
            <Button className="bg-green-500 hover:bg-green-600 text-white">
              Learn More
            </Button>
          </div>
          <div className="md:w-1/2 flex justify-center items-center">
            <div className="relative w-[600px] h-[315px]">
              <Image
                src={images[currentImage].src}
                alt={images[currentImage].title}
                fill
                className="object-contain rounded-lg"
                priority
                sizes="600px"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
