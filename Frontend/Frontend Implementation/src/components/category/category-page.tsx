import type { ReactNode } from "react"
import { FilterSidebar, type FilterConfig } from "@/components/category/filter-sidebar"
import { ProductGrid } from "@/components/category/product-grid"
import { Pagination } from "@/components/category/pagination"

export interface Product {
  id: number | string
  title: string
  image: string
  price: number
  rating: number
  reviews: number
  category?: string
}

interface CategoryPageProps {
  title: string
  products: Product[]
  filters: FilterConfig
  announcement?: {
    text: string
    actionText?: string
    actionUrl?: string
  }
  currentPage?: number
  totalPages?: number
  onPageChange?: (page: number) => void
  children?: ReactNode
}

export function CategoryPage({
  title,
  products,
  filters,
  announcement,
  currentPage = 1,
  totalPages = 10,
  onPageChange,
  children,
}: CategoryPageProps) {
  return (
    <div className="bg-white">
      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Filters */}
          <FilterSidebar config={filters} />

          {/* Product Grid */}
          <div className="flex-1">
            <h1 className="text-2xl font-bold mb-6">{title}</h1>

            {/* Optional custom content */}
            {children}

            {/* Products */}
            <ProductGrid products={products} />

            {/* Pagination */}
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
          </div>
        </div>
      </div>
    </div>
  )
}
