import express from "express"
import productRoutes from './routes/product.routes.js'
const app = express()
const PORT = process.env.PORT || 4000

app.use("/api/products", productRoutes)

app.get("/health", (_req, res) => {
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
  })
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
