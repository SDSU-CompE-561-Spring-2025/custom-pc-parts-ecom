"use client"

import { useState, useEffect } from "react"
import { CategoryPage, type Product } from "@/components/category"
import { caseProducts } from "@/data/sample-products"
import { caseFilters } from "@/data/filter-configs"
import Footer from "@/components/Footers"
import { api } from "@/lib/auth"

export default function CasePage() {
  const [currentPage, setCurrentPage] = useState(1)
  const [paginatedProducts, setPaginatedProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [apiProducts, setApiProducts] = useState<Product[]>([])
  
  // Define how many products to show per page
  const productsPerPage = 9
  
    // Fetch products from API
    useEffect(() => {
      const fetchComponents = async () => {
        try {
          const response = await api.get("/components?category=Case")
          // Convert API response to Product format
          const formattedProducts: Product[] = response.data.items.map((Case: any) => ({
            id: Case.id,
            title: Case.name,
            image: Case.image_url || "https://placehold.co/200x200?text=CASE",
            price: Case.price,
            rating: Case.rating || 4.5,
            reviews: Case.reviews || 10,
            category: "case"
          }));
          setApiProducts(formattedProducts);
        } catch (error) {
          console.error("Failed to fetch components:", error)
          // Fall back to sample data if API fails
          setApiProducts(caseProducts);
        } finally {
          setLoading(false)
        }
      }
  
      fetchComponents()
    }, [])
    
    // Calculate total pages dynamically based on data length
    const totalPages = Math.ceil((apiProducts.length || caseProducts.length) / productsPerPage)
    
    // Update displayed products when page changes or when products are loaded
    useEffect(() => {
      if (apiProducts.length > 0 || caseProducts) {
        const products = apiProducts.length > 0 ? apiProducts : caseProducts;
        const startIndex = (currentPage - 1) * productsPerPage;
        const endIndex = startIndex + productsPerPage;
        setPaginatedProducts(products.slice(startIndex, endIndex));
      }
    }, [currentPage, apiProducts]);
  
    const handlePageChange = (page: number) => {
      setCurrentPage(page)
      // Scroll to top when changing pages for better UX
      window.scrollTo(0, 0)
    }
  
    if (loading) {
      return (
        <div className="flex flex-col min-h-screen">
          <div className="flex-grow p-4 text-center">Loading...</div>
          <Footer />
        </div>
      )
    }

  return (
      <div className="flex flex-col min-h-screen">
        <div className="flex-grow">
          <CategoryPage
            title="Cases"
            products={paginatedProducts}
            filters={caseFilters}
            announcement={{
              text: "Build better, Build Smarter | Our New CPUs Just Arrived!",
              actionText: "Build Now",
              actionUrl: "#",
            }}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            categorySlug="case"
          />
        </div>
        <Footer />
      </div>
  )
}