"use client"

import { useState, useEffect } from "react"
import { CategoryPage, type Product } from "@/components/category"
import { cpuCoolerProducts } from "@/data/sample-products"
import { cpuCoolerFilters } from "@/data/filter-configs"
import Footer from "@/components/Footers"

export default function CPUCoolerPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const [paginatedProducts, setPaginatedProducts] = useState<Product[]>([])
  
  // Define how many products to show per page
  const productsPerPage = 9
  
  // Calculate total pages dynamically based on data length
  const totalPages = Math.ceil(cpuCoolerProducts.length / productsPerPage)
  
  // Update displayed products when page changes
  useEffect(() => {
    const startIndex = (currentPage - 1) * productsPerPage
    const endIndex = startIndex + productsPerPage
    setPaginatedProducts(cpuCoolerProducts.slice(startIndex, endIndex))
  }, [currentPage])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    // Scroll to top when changing pages for better UX
    window.scrollTo(0, 0)
  }

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow">
        <CategoryPage
          title="CPU Coolers"
          products={paginatedProducts} // Pass only the paginated products
          filters={cpuCoolerFilters}
          announcement={{
            text: "Build better, Build Smarter | Our New RTX 9090 Just Dropped!",
            actionText: "Build Now",
            actionUrl: "#",
          }}
          currentPage={currentPage}
          totalPages={totalPages} // Dynamic total pages
          onPageChange={handlePageChange}
          categorySlug="cpu-cooler"
        />
      </div>
      <Footer />
    </div>
  )
}