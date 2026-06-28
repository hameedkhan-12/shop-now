import Link from "next/link"
import { PRODUCT_CATEGORIES } from "@repo/shared"
import { fetchProducts } from "@/lib/api"
import ProductCard from "@/components/cards/ProductCard"

interface HomeProps {
  searchParams: Promise<{ page?: string; category?: string }>
}
export default async function Page({ searchParams }: HomeProps) {
  const { page: pageParam, category } = await searchParams
  const page = Number(pageParam || 1)
  const {
    data: products,
    total,
    totalPages,
  } = await fetchProducts(page, category)
  return (
    <div className="mx-auto px-4 py-8">
      <div className="mb-10 text-center">
        <h1 className="mb-2 text-4xl font-bold text-neutral-300">
          Welcome to ShopNow
        </h1>
        <p className="text-lg text-neutral-200">
          Discover {total} products accross all categories
        </p>
      </div>

      <div>
        <Link
          href={"/"}
          className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${!category ? "border-gray-900 bg-gray-900 text-white" : "border-gray-300 bg-white text-gray-600 hover:border-gray-500"}`}
        >
          All
        </Link>
        {PRODUCT_CATEGORIES.map((cat) => (
          <Link
            key={cat}
            href={`/?category=${cat}`}
            className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
              category === cat
                ? "border-gray-900 bg-gray-900 text-white"
                : "border-gray-300 bg-white text-gray-600 hover:border-gray-500"
            }`}
          >
            {cat}
          </Link>
        ))}
      </div>

      {products.length === 0 ? (
        <p>No products found</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md: grid-cols-3 lg:grid-cols-4 gap-2 mt-10">
          {products.map((product) => (
            <ProductCard product={product} key={product.id} />
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-10">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <Link
              key={page}
              href={`/?page=${page}${category ? `&category=${category}` : ""}`}
              className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
                page === Number(pageParam)
                  ? "border-gray-900 bg-gray-900 text-white"
                  : "border-gray-300 bg-white text-gray-600 hover:border-gray-500"
              }`}
            >
              {page}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
