import express  from 'express'
import musicController from '../controller/musicController.mjs';
const router = express.Router()

const themeRouter = (app) => {
    router.get('/list-theme', musicController.getListTheme)
    router.post('/create-theme', musicController.createTheme)
    router.put('/update-theme/:id', musicController.updateTheme)
    router.delete('/delete-theme/:id', musicController.deleteTheme)
   
    
    
    return app.use('/theme', router)
    
}

export default themeRouter