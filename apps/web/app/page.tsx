import Link from "next/link"
import { PRODUCT_CATEGORIES} from "@repo/shared"
import { fetchProducts } from "@/lib/api";
import ProductCard from "@/components/cards/ProductCard";

interface HomeProps {
  searchParams: { page?: string; category?: string }
}
export default async function Page({ searchParams }: HomeProps) {
  const page = Number(searchParams.page) || 1;
  const category = searchParams.category;
  const {data: products, total, totalPages } = await fetchProducts(page, category);
  return (
    <div className="mx-auto px-4 py-8">
      <div className="mb-10 text-center">
        <h1 className="mb-2 text-4xl font-bold text-neutral-300">
          Welcome to ShopNow
        </h1>
        <p className="text-lg text-neutral-200">
          Discover products accross all categories
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
         <Link key={cat}
            href={`/?category=${cat}`}
            className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
              category === cat
                ? "bg-gray-900 text-white border-gray-900"
                : "bg-white text-gray-600 border-gray-300 hover:border-gray-500"
            }`}
          >
            {cat}
         </Link>
        ))}
      </div>

      {products.length === 0 ? (
        <p>
          No products found
        </p>
      ) : (
        <div>
          {products.map(product => (
            <ProductCard product={product} key={product.id}/>
          ))}
        </div>
      )}
    </div>
  )
}
