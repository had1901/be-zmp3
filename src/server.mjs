import express from 'express'
import cors from 'cors'
import musicRouter from './routers/music.mjs'
import userRouter from './routers/user.mjs'
import connection from './connect/index.mjs'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';
import imagesRouter from './routers/images.mjs'
import albumRouter from './routers/album.mjs'
dotenv.config()

const app = express()
const port = process.env.PORT || 9999

// middleware
const whitelist = process.env.NODE_ENV === 'production' 
  ? [process.env.ORIGIN_HOSTNAME]  
  : ['http://localhost:3000']

  const corsOptions = {
    origin: function (origin, callback) {
      if (whitelist.indexOf(origin) !== -1 || !origin) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    },
    credentials: true,
  }  

app.use(cors(corsOptions))
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended : true }))

// connect to Database
connection()



// API routes
musicRouter(app)
userRouter(app)
imagesRouter(app)
albumRouter(app)

app.get('/', (req, res) => {
  res.status(200).json({ message: 'API is running' })
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

