import { ProductCard } from "@/components/product-card"
import type { Product } from "@/components/category/category-page"

interface ProductGridProps {
  products: Product[]
  columns?: number
}

export function ProductGrid({ products, columns = 3 }: ProductGridProps) {
  const columnClasses = {
    1: "grid-cols-1",
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
  }

  return (
    <div className={`grid ${columnClasses[columns as keyof typeof columnClasses]} gap-6`}>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          id={product.id}
          title={product.title}
          image={product.image}
          price={product.price}
          rating={product.rating}
          reviews={product.reviews}
          category={product.category}
        />
      ))}
    </div>
  )
}
