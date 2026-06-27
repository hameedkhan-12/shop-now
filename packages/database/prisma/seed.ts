import { PrismaPg } from "@prisma/adapter-pg"
import { PrismaClient } from "../generated/prisma/client.js"
import "dotenv/config"

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
})

const prisma = new PrismaClient({ adapter })

async function main() {
  console.log("Seeding database...")

  await prisma.product.deleteMany()

  await prisma.product.createMany({
    data: [
      {
        name: "Wireless Headphones",
        description:
          "Premium noise-cancelling wireless headphones with 30hr battery life.",
        price: 129.99,
        stock: 50,
        category: "Electronics",
        imageUrl:
          "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
      },
      {
        name: "Running Shoes",
        description:
          "Lightweight and breathable running shoes for daily training.",
        price: 89.99,
        stock: 100,
        category: "Sports",
        imageUrl:
          "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400",
      },
      {
        name: "JavaScript: The Good Parts",
        description:
          "A must-read book covering the best features of JavaScript.",
        price: 24.99,
        stock: 200,
        category: "Books",
        imageUrl:
          "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400",
      },
      {
        name: "Mechanical Keyboard",
        description:
          "TKL mechanical keyboard with RGB backlighting and blue switches.",
        price: 79.99,
        stock: 30,
        category: "Electronics",
        imageUrl:
          "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400",
      },
      {
        name: "Yoga Mat",
        description: "Non-slip, eco-friendly yoga mat with alignment lines.",
        price: 34.99,
        stock: 75,
        category: "Sports",
        imageUrl:
          "https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=400",
      },
      {
        name: "Desk Plant",
        description: "Low-maintenance succulent perfect for your workspace.",
        price: 14.99,
        stock: 150,
        category: "Home & Garden",
        imageUrl:
          "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400",
      },
    ],
  })

  console.log("Seeding complete!")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
