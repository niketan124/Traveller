import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import morgan from 'morgan'
import userRouter from './routes/route_user.js'
import tourRouter from './routes/user_tours.js'
import dotenv from 'dotenv'
dotenv.config()


const app = express()


app.use(morgan("dev"))
app.use(express.json({ limit: '30mb', extended: true }))
app.use(express.urlencoded({ limit: '30mb', extended: true }))
app.use(cors())


app.use('/users/', userRouter)
app.use('/tour', tourRouter)

app.get('/', (req, res) => {
    res.send("Welcome to our Tour API ----------> Dev By Niketan!")
})



mongoose.connect(process.env.MONGODB_URL).then(() => {
    app.listen(process.env.PORT || 5000, () => {
        console.log(`Server is running on port ${process.env.PORT || 5000}....`);
    })
}).catch((error) => console.log(`${error} did not connect`))