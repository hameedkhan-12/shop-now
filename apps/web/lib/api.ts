"use server"
import type { ApiResponse, PaginatedProducts, Product } from "@repo/shared"

const BASE_URL = process.env.NEXT_PUBLIC_API_URL! || "http://localhost:4000/api";

export async function fetcher<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    cache: "no-store",
  })
  if (!res.ok) throw new Error(`Api error: ${res.status}`)
  const json: ApiResponse<T> = await res.json()
  if (!json.success || !json.data)
    throw new Error(json.error || "Unknown error")

  return json.data;
}

export async function fetchProducts(
  page = 1,
  category?: string
): Promise<PaginatedProducts> {
  const params = new URLSearchParams({ page: String(page), limit: "12" })
  if (category) params.set("category", category)

  return fetcher<PaginatedProducts>(`/products?${params}`)
}

export async function fetchProduct(id: string): Promise<Product> {
  return fetcher<Product>(`/products/${id}`)
}
