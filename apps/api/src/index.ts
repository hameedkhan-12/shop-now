import express from "express"

const app = express()
const PORT = process.env.PORT || 4000

app.use("/api/routes", productRoutes)

app.get("health", (_req, res) => {
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
  })
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
