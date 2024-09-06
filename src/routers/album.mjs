import express  from 'express'
import albumController from '../controller/albumController.mjs';
const router = express.Router()

const albumRouter = (app) => {
    router.post('/:categoryAlbum', albumController.getSongAlbum)
   
    
    
    return app.use('/album', router)
    
}

export default albumRouter