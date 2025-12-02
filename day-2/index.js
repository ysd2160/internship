
import express from 'express'
import { connectDb } from './db.js'
import router from './userRouter.js'
const app = express()


app.use(express.json())
connectDb()

app.use("/api/v1/user",router)
app.get("/", (req, res) => {
    res.send("welcome to live server")

})

app.listen(3000)