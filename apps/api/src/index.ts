import "./env.js";    

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
    origin: ["https://shop-now-web.vercel.app", "http://localhost:3001"],
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
