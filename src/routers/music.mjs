import express  from 'express'
import musicController from '../controller/musicController.mjs';
const router = express.Router()

const musicRouter = (app) => {
    router.post('/songs', musicController.getSongs)
   
    
    
    return app.use('/music', router)
    
}

export default musicRouter