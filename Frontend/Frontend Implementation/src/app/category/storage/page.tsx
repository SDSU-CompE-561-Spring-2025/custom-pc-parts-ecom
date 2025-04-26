"use client"

import { useState } from "react"
import { CategoryPage } from "@/components/category"
import { storageProducts } from "@/data/sample-products"
import { storageFilters } from "@/data/filter-configs"
import Footer from "@/components/Footers"

export default function StoragePage() {
  const [currentPage, setCurrentPage] = useState(1)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    // Here you would typically fetch products for the new page
    console.log(`Fetching page ${page}`)
  }

  return (
    <><CategoryPage
      title="Storage"
      products={storageProducts}
      filters={storageFilters}
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
