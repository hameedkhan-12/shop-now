import "./env.js"

import express from "express"
import productRoutes from "./routes/product.routes.js"
const app = express()
import cors from "cors"
import { getApiConfig } from "@repo/shared"

const env = getApiConfig()
console.log(env.readDatabaseUrl)

const PORT = process.env.PORT || 4000

app.use(express.json())
app.use(
  cors({
    origin: [
      "https://shop-now-web.vercel.app",
      "https://shop-now-admin-s1j6.vercel.app",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
)
app.use("/api/products", productRoutes)

app.get("/health", (_req, res) => {
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
  })
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
