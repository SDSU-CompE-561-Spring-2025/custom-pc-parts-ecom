"use client"

import { useState } from "react"
import { CategoryPage } from "@/components/category"
import { memoryProducts } from "@/data/sample-products"
import { memoryFilters } from "@/data/filter-configs"

export default function MemoryPage() {
  const [currentPage, setCurrentPage] = useState(1)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    // Here you would typically fetch products for the new page
    console.log(`Fetching page ${page}`)
  }

  return (
    <CategoryPage
      title="Memory (RAM)"
      products={memoryProducts}
      filters={memoryFilters}
      announcement={{
        text: "Build better, Build Smarter | Our New RTX 9090 Just Dropped!",
        actionText: "Build Now",
        actionUrl: "#",
      }}
      currentPage={currentPage}
      totalPages={10}
      onPageChange={handlePageChange}
    />
  )
}
