
import express from 'express'
import { connectDb } from './db.js'
import router from './routes/userRouter.js'
import resourceRouter from './routes/resourceRoutes.js'
import cookieParser from 'cookie-parser'
const app = express()


app.use(express.json())
connectDb()
app.use(cookieParser())
app.use("/api/v1/user",router)

app.use("/api/v1/resources", resourceRouter);
app.get("/", (req, res) => {

    res.send("welcome to live server")

})

app.listen(3000)