import ProductForm from "@/components/ProductForm"
import Link from "next/link"

const page = () => {
  return (
    <div className="max-w-2xl">
      <div className="mb-6">
        <Link
          href={"/products"}
          className="text-sm text-gray-600 hover:text-gray-800"
        >
          ← Back to products
        </Link>
        <h1 className="mt-2 text-2xl font-bold dark:text-gray-200">
          Add a new product
        </h1>
      </div>
      <ProductForm />
    </div>
  )
}

export default page
