"use client"

import { useState } from "react"
import { Star } from "lucide-react"
import Image from "next/image"
import { Slider } from "@/components/ui/slider"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import Footer from "@/components/Footers"

export default function CPUCoolerPage() {
  // Add state for current page
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = 10
  
  // Add handler function for page changes
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    // Here you would typically fetch products for the new page
    console.log(`Fetching page ${page}`)
  }
  
  // Function to handle previous page
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1)
    }
  }
  
  // Function to handle next page
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1)
    }
  }

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="w-full md:w-64 shrink-0">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium">Filters</h2>
              <button className="text-gray-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="4" y1="9" x2="20" y2="9"></line>
                  <line x1="4" y1="15" x2="20" y2="15"></line>
                  <line x1="10" y1="3" x2="8" y2="21"></line>
                  <line x1="16" y1="3" x2="14" y2="21"></line>
                </svg>
              </button>
            </div>

            <Accordion type="multiple" defaultValue={["category"]}>
              <AccordionItem value="category">
                <AccordionTrigger className="py-2">Categories</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2">
                    <CategoryItem label="CPU" active />
                    <CategoryItem label="Video Card" />
                    <CategoryItem label="Motherboard" />
                    <CategoryItem label="Memory" />
                    <CategoryItem label="Power Supply" />
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="price">
                <AccordionTrigger className="py-2">Price</AccordionTrigger>
                <AccordionContent>
                  <div className="px-2 py-4">
                    <Slider defaultValue={[50, 200]} min={0} max={300} step={1} />
                    <div className="flex justify-between mt-2 text-sm">
                      <span>$50</span>
                      <span>$200</span>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="colors">
                <AccordionTrigger className="py-2">Colors</AccordionTrigger>
                <AccordionContent>
                  <div className="grid grid-cols-5 gap-2 py-2">
                    <ColorOption color="bg-green-500" />
                    <ColorOption color="bg-red-500" />
                    <ColorOption color="bg-yellow-400" />
                    <ColorOption color="bg-orange-500" />
                    <ColorOption color="bg-sky-400" />
                    <ColorOption color="bg-blue-500" selected />
                    <ColorOption color="bg-purple-500" />
                    <ColorOption color="bg-pink-500" />
                    <ColorOption color="bg-white border" />
                    <ColorOption color="bg-black" />
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="socket">
                <AccordionTrigger className="py-2">Socket</AccordionTrigger>
                <AccordionContent>
                  <div className="grid grid-cols-3 gap-2 py-2">
                    <SocketOption label="AM1" />
                    <SocketOption label="AM3" />
                    <SocketOption label="sTR4" />
                    <SocketOption label="LGA1151" />
                    <SocketOption label="AM4" selected />
                    <SocketOption label="FM2" />
                    <SocketOption label="sTRx" />
                    <SocketOption label="LGA2011" />
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="series">
                <AccordionTrigger className="py-2">Series</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2">
                    <SeriesItem label="AMD R3" />
                    <SeriesItem label="AMD Ryzen 5" />
                    <SeriesItem label="AMD Ryzen 7" />
                    <SeriesItem label="AMD Ryzen 9" />
                    <SeriesItem label="Intel Core i7" />
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <button className="w-full bg-black text-white py-3 rounded-md mt-6">Apply Filter</button>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <h1 className="text-2xl font-bold mb-6">CPU Cooler</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <ProductCard price={145} rating={3.5} />
              <ProductCard price={180} rating={4.5} />
              <ProductCard price={120} rating={5} />
              <ProductCard price={240} rating={3.5} />
              <ProductCard price={180} rating={4.5} />
              <ProductCard price={130} rating={3.5} />
              <ProductCard price={212} rating={5} />
              <ProductCard price={145} rating={4.5} />
              <ProductCard price={80} rating={3} />
            </div>

            <div className="flex justify-between items-center mt-10">
              {/* Previous button with click handler */}
              <button 
                className={`flex items-center gap-2 px-4 py-2 border rounded-md ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
                Previous
              </button>

              {/* Pagination buttons */}
              <div className="flex gap-1">
                {/* Generate pagination buttons */}
                {[...Array(totalPages)].map((_, i) => {
                  const pageNumber = i + 1;
                  
                  // Show first 3 pages, last 3 pages, and current page with neighbors
                  if (
                    pageNumber <= 3 || 
                    pageNumber > totalPages - 3 || 
                    (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
                  ) {
                    return (
                      <PaginationButton 
                        key={pageNumber} 
                        number={pageNumber} 
                        active={currentPage === pageNumber} 
                        onClick={() => handlePageChange(pageNumber)}
                      />
                    );
                  } else if (
                    pageNumber === 4 && currentPage > 5 || 
                    pageNumber === totalPages - 3 && currentPage < totalPages - 4
                  ) {
                    // Add ellipsis
                    return (
                      <span key={`ellipsis-${pageNumber}`} className="flex items-center justify-center w-8 h-8">...</span>
                    );
                  }
                  
                  return null;
                })}
              </div>

              {/* Next button with click handler */}
              <button 
                className={`flex items-center gap-2 px-4 py-2 border rounded-md ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
              >
                Next
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Full-width Footer outside the container */}
      <Footer />
    </>
  )
}

function CategoryItem({ label, active = false }: { label: string; active?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <span className={active ? "font-medium" : "text-gray-600"}>{label}</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="9 18 15 12 9 6"></polyline>
      </svg>
    </div>
  )
}

function ColorOption({ color, selected = false }: { color: string; selected?: boolean }) {
  return (
    <button className={`w-8 h-8 rounded-full ${color} ${selected ? "ring-2 ring-offset-2 ring-blue-500" : ""}`}>
      {selected && (
        <svg className="w-full h-full text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M5 12L10 17L20 7"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </button>
  )
}

function SocketOption({ label, selected = false }: { label: string; selected?: boolean }) {
  return (
    <button
      className={`px-2 py-1 text-xs rounded-md ${selected ? "bg-black text-white" : "bg-gray-100 text-gray-800"}`}
    >
      {label}
    </button>
  )
}

function SeriesItem({ label }: { label: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-gray-600">{label}</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="9 18 15 12 9 6"></polyline>
      </svg>
    </div>
  )
}

function ProductCard({ price, rating }: { price: number; rating: number }) {
  const fullStars = Math.floor(rating)
  const hasHalfStar = rating % 1 !== 0

  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="bg-gray-50 p-4">
        <Image src="https://placehold.co/200x200" alt="CPU Cooler" width={200} height={200} className="mx-auto" />
      </div>
      <div className="p-4">
        <div className="text-sm font-medium mb-1">CPU</div>
        <div className="flex items-center mb-2">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={16}
              className={
                i < fullStars
                  ? "fill-yellow-400 text-yellow-400"
                  : i === fullStars && hasHalfStar
                    ? "fill-yellow-400 text-yellow-400 half-star"
                    : "text-gray-300"
              }
            />
          ))}
          <span className="text-xs text-gray-500 ml-1">{rating}/5</span>
        </div>
        <div className="font-bold">${price}</div>
      </div>
    </div>
  )
}

// Updated PaginationButton to include onClick handler
function PaginationButton({ 
  number, 
  active = false, 
  onClick 
}: { 
  number: number; 
  active?: boolean; 
  onClick: () => void;
}) {
  return (
    <button
      className={`w-8 h-8 flex items-center justify-center rounded-md ${active ? "bg-black text-white" : "border"}`}
      onClick={onClick}
    >
      {number}
    </button>
  )
}