import { ProductsTable } from "@/components/ProductsTable";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { api } from "../../lib/api";

export default async function AdminProductsPage() {
  const { data: products, total } = await api.getProducts();

  return (
    <div className="w-full px-12">
      <div className="flex items-center justify-between mb-6">
        <div className="m-4">
          <h1 className="text-2xl font-bold">Products</h1>
          <p className="text-sm text-neutral-900 dark:text-gray-200 mt-1">{total} total products</p>
        </div>
        <Link href="/products/new">
          <Button>+ Add Product</Button>
        </Link>
      </div>

      <ProductsTable products={products} />
    </div>
  );
}