"use client"

import { useState, useEffect } from "react"
import { CategoryPage, type Product } from "@/components/category"
import {monitorProducts } from "@/data/sample-products"
import {monitorFilters } from "@/data/filter-configs"
import Footer from "@/components/Footers"
import { api } from "@/lib/auth"

export default function CpuCategoryPage() {
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
        const response = await api.get("/components?category=Monitor")
        // Convert API response to Product format
        const formattedProducts: Product[] = response.data.items.map((monitor: any) => ({
          id: monitor.id,
          title: monitor.name,
          image: monitor.image_url || "https://placehold.co/200x200?text=Monitor",
          price: monitor.price,
          rating: monitor.rating || 4.5,
          reviews: monitor.reviews || 10,
          category: "monitor"
        }));
        setApiProducts(formattedProducts);
      } catch (error) {
        console.error("Failed to fetch components:", error)
        // Fall back to sample data if API fails
        setApiProducts(monitorProducts);
      } finally {
        setLoading(false)
      }
    }

    fetchComponents()
  }, [])
  
  // Calculate total pages dynamically based on data length
  const totalPages = Math.ceil((apiProducts.length || monitorProducts.length) / productsPerPage)
  
  // Update displayed products when page changes or when products are loaded
  useEffect(() => {
    if (apiProducts.length > 0 || monitorProducts) {
      const products = apiProducts.length > 0 ? apiProducts : monitorProducts;
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
            title="Monitors"
            products={paginatedProducts}
            filters={monitorFilters}
            announcement={{
              text: "Build better, Build Smarter | Our New Monitors Just Arrived!",
              actionText: "Build Now",
              actionUrl: "#",
            }}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            categorySlug="monitor"
          />
        </div>
        <Footer />
      </div>
    )
  }