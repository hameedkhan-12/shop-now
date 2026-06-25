import express from "express"
import {prisma} from "@repo/db"
const app = express()

app.get("/", (req, res) => {
    res.send("Hello from API!")
})

app.listen(4000, () => console.log("API listening on port 4000"))