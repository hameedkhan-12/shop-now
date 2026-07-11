import "./env.js";           // ← MUST be first import, loads dotenv before anything else

import express from "express"
import productRoutes from "./routes/product.routes.js"
const app = express()
import cors from "cors"
import { getEnvConfig } from "@repo/shared"

// Load .env only in development
const env = getEnvConfig()
// Validate all required environment variables
console.log(env.databaseUrl)

const PORT = process.env.PORT || 4000

app.use(express.json())
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3001"],
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
