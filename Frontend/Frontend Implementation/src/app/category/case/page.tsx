"use client"

import { useState, useEffect } from "react"
import { CategoryPage, type Product } from "@/components/category"
import { caseProducts } from "@/data/sample-products"
import { caseFilters } from "@/data/filter-configs"
import Footer from "@/components/Footers"

export default function CasePage() {
  const [currentPage, setCurrentPage] = useState(1)
  const [paginatedProducts, setPaginatedProducts] = useState<Product[]>([])
  
  // Define how many products to show per page
  const productsPerPage = 9
  
  // Calculate total pages dynamically based on data length
  const totalPages = Math.ceil(caseProducts.length / productsPerPage)
  
  // Update displayed products when page changes
  useEffect(() => {
    const startIndex = (currentPage - 1) * productsPerPage
    const endIndex = startIndex + productsPerPage
    setPaginatedProducts(caseProducts.slice(startIndex, endIndex))
  }, [currentPage])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo(0, 0)
  }

  return (
    <>
      <CategoryPage
        title="Cases"
        products={paginatedProducts} // Pass only the paginated products
        filters={caseFilters}
        announcement={{
          text: "Build better, Build Smarter | Our New RTX 9090 Just Dropped!",
          actionText: "Build Now",
          actionUrl: "#",
        }}
        currentPage={currentPage}
        totalPages={totalPages} // Dynamic total pages
        onPageChange={handlePageChange}
      />
      <Footer />
    </>
  )
}