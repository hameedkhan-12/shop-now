import { Prisma, readDB, writeDB } from "@repo/db"
import type { CreateProductInput, UpdateProductInput } from "@repo/shared"

class ProductRepository {
  async getProducts(page: number, limit: number, category?: string) {
    const skip = (page - 1) * limit
    const where = category ? { category } : {}

    const [data, total] = await Promise.all([
      readDB.product.findMany({
        where,
        skip,
        take: limit,
        orderBy: {
          createdAt: "desc",
        },
      }),
      readDB.product.count({ where }),
    ])

    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    }
  }

  async getProductById(productId: string) {
    return await readDB.product.findUnique({
      where: {
        id: productId,
      },
    })
  }

  async createProduct(data: CreateProductInput) {
    return writeDB.product.create({
      data,
    })
  }

  async updateProduct(id: string, data: UpdateProductInput) {
    try {
      return await writeDB.product.update({
        where: {
          id,
        },
        data,
      })
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2025"
      ) {
        return null
      }
      throw error
    }
  }

  async deleteProduct(id: string) {
    try {
      return await writeDB.product.delete({
        where: {
          id,
        },
      })
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2025"
      ) {
        return false
      }
      throw error
    }
  }
}

export const productRepository = new ProductRepository()
