
import express from 'express'
import { connectDb } from './db.js'
const app = express()


app.use(express.json())
connectDb()

app.get("/", (req, res) => {
    res.send("welcome to live server")

})
app.listen(3000)