"use client"

import { useState } from "react"
import { CategoryPage } from "@/components/category"
import { powerSupplyProducts } from "@/data/sample-products"
import { powerSupplyFilters } from "@/data/filter-configs"
import Footer from "@/components/Footers"

export default function PowerSupplyPage() {
  const [currentPage, setCurrentPage] = useState(1)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    // Here you would typically fetch products for the new page
    console.log(`Fetching page ${page}`)
  }

  return (
    <><CategoryPage
      title="Power Supplies"
      products={powerSupplyProducts}
      filters={powerSupplyFilters}
      announcement={{
        text: "Build better, Build Smarter | Our New RTX 9090 Just Dropped!",
        actionText: "Build Now",
        actionUrl: "#",
      }}
      currentPage={currentPage}
      totalPages={10}
      onPageChange={handlePageChange} /><Footer /></>
  )
}
