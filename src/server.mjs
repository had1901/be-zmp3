import express from 'express'
import cors from 'cors'
import musicRouter from './routers/music.mjs'
import userRouter from './routers/user.mjs'
import connection from './connect/index.mjs'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';
import imagesRouter from './routers/images.mjs'
dotenv.config()

const app = express()
const port = process.env.PORT || 9999

// middleware
app.use(cors({ 
  origin : process.env.ORIGIN_HOSTNAME,
  credentials: true
}
))
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended : true }))

// connect to Database
connection()



// API routes
musicRouter(app)
userRouter(app)
imagesRouter(app)



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

