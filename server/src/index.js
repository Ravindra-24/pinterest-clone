import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import cors from 'cors'
import logger,{morganMiddleware} from './logger/index'
import cookieParser from 'cookie-parser'
import authRoutes from './routes/auth'
import postRoutes from './routes/post'
import commentRoutes from './routes/comment'
import userRouter from './routes/user'
import { connectDB } from './utils/db.utils'

const app = express()

const PORT = process.env.PORT || 8080

connectDB()
// "https://pinterest-clone-tau.vercel.app"
app.use(cors({
    origin: process.env.CORS_BASE_URL,
    credentials: true
}))
app.use(express.json())
app.use(cookieParser())
app.use(morganMiddleware)
app.use('/auth', authRoutes)
app.use('/post', postRoutes)
app.use('/comment', commentRoutes)
app.use('/user', userRouter)


app.get('/', (req, res) =>{
    res.send(`Server is running`)
})

app.listen(PORT, () => {
    logger.info(`Server version 1.1`)
})