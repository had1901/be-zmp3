import express  from 'express'
import musicController from '../controller/musicController.mjs';
const router = express.Router()

const musicRouter = (app) => {
    router.post('/songs', musicController.getSongs)

    router.get('/list', musicController.getListSong)
    router.post('/create', musicController.createSong)
    router.put('/update/:id', musicController.updateSong)
    router.delete('/delete/:id', musicController.deleteSong)
   
    
    
    return app.use('/music', router)
    
}

export default musicRouter