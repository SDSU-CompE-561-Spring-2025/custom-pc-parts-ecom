"use client"

import { useState } from "react"
import { CategoryPage } from "@/components/category"
import { motherboardProducts } from "@/data/sample-products"
import { motherboardFilters } from "@/data/filter-configs"
import Footer from "@/components/Footers"

export default function MotherboardPage() {
  const [currentPage, setCurrentPage] = useState(1)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    // Here you would typically fetch products for the new page
    console.log(`Fetching page ${page}`)
  }

  return (
    <><CategoryPage
    title="Motherboards"
    products={motherboardProducts}
    filters={motherboardFilters}
    categorySlug="motherboards" // Add this line to specify the correct URL path
    announcement={{
      text: "Build better, Build Smarter | Our New RTX 9090 Just Dropped!",
      actionText: "Build Now",
      actionUrl: "#",
    }}
    currentPage={currentPage}
    totalPages={10}
    onPageChange={handlePageChange}
  /><Footer /></>
  )
}
