import express  from 'express'
import musicController from '../controller/musicController.mjs';
const router = express.Router()

const musicRouter = (app) => {
    router.post('/songs', musicController.getSongs)
    router.get('/list-song', musicController.getListSong)
   
    
    
    return app.use('/music', router)
    
}

export default musicRouter