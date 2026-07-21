import type {
  ApiResponse,
  Product,
  PaginatedProducts,
  CreateProductInput,
  UpdateProductInput,
} from "@repo/shared"

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api"
const ADMIN_KEY = process.env.NEXT_PUBLIC_ADMIN_KEY!

async function fetcher<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      "x-admin-key": ADMIN_KEY
    },
    cache: "no-store",
    ...options,
  })
  const json: ApiResponse<T> = await res.json()
  if (!json.success) throw new Error(json.error || "Request Failed")
  return json.data as T
}

export const api = {
  getProducts: (page = 1) =>
    fetcher<PaginatedProducts>(`/products?page=${page}&limit=20`),
  getProduct: (id: string) => fetcher<Product>(`/products/${id}`),
  createProduct: (data: CreateProductInput) => fetcher<Product>("/products", {
    method: "POST",
    body: JSON.stringify(data)
  }),

  updateProduct: (id: string, data: UpdateProductInput) => fetcher<Product>(`/products/${id}`, {
      method: "PUT",
      body: JSON.stringify(data)
  }),

  deleteProduct: (id: string) => fetcher<void>(`/products/${id}`, {
      method: "DELETE"
  }),
}
