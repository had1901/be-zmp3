import express  from 'express'
import db from '../models/index.js'
import authController from '../controller/authController.mjs'
import { verifyToken } from '../middleware/auth.mjs'
import upload from '../middleware/uploadCloudinary.mjs'
const router = express.Router()



const userRouter = (app) => {
    router.all('*', verifyToken)
    router.post('/register', authController.register)
    router.post('/login', authController.login)
    router.post('/logout', authController.logout)
    router.post('/refreshToken', authController.refresh)
    
    // private route
    // router.post('/home', verifyToken, authController.home)
    router.post('/libraries', verifyToken, authController.libraries)
    router.post('/zing-chart', verifyToken, authController.zingChart)
    router.post('/upload', verifyToken, authController.upload)

    // upload file on Cloudinary
    router.post('/upload-file', upload.single('audio'), authController.uploadFile)
    router.get('/get-file', authController.getFile)
    
    return app.use('/auth', router)
}




export default userRouter