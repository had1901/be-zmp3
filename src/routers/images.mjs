import express  from 'express'
import imagesController from '../controller/imagesController.mjs';
const router = express.Router()

const imagesRouter = (app) => {
    router.get('/image-slide', imagesController.getImageSlide)
   
    
    
    return app.use('/images', router)
    
}

export default imagesRouter