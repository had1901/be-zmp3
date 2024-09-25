import express  from 'express'
import musicController from '../controller/musicController.mjs';
const router = express.Router()

const musicRouter = (app) => {
    router.post('/songs', musicController.getSongs)

    router.get('/list-song', musicController.getListSong)
    router.post('/create-song', musicController.createSong)
    router.put('/update-song/:id', musicController.updateSong)
    router.delete('/delete-song/:id', musicController.deleteSong)
   
    
    
    return app.use('/music', router)
    
}

export default musicRouter