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
    <section className="w-full">
      <div className="relative bg-black text-white rounded-lg overflow-hidden h-[400px]">
        {/* Background image with overlay */}
        <div className="absolute inset-0">
          <Image
            src={images[currentImage].src}
            alt="background"
            fill
            className="object-cover opacity-30"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent"></div>
        </div>
        
        {/* Content container with fixed dimensions */}
        <div className="relative h-full z-10 p-8 flex flex-col md:flex-row items-center">
          {/* Text content */}
          <div className="md:w-1/2 space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold">{images[currentImage].title}</h2>
            <p className="text-xl">{images[currentImage].description}</p>
            <Button className="bg-red-500 hover:bg-red-600 text-white mt-4">
              Learn More
            </Button>
          </div>
          
          {/* Image container with aspect ratio */}
          <div className="md:w-1/2 flex justify-center items-center p-4">
            <div className="relative w-full max-w-[400px] aspect-[16/9]">
              <Image
                src={images[currentImage].src}
                alt={images[currentImage].title}
                fill
                className="object-contain rounded-lg"
                priority
                sizes="(max-width: 768px) 100vw, 400px"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}