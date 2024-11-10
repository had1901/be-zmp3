import express  from 'express'
import themeController from '../controller/themeController.mjs';
const router = express.Router()

const themeRouter = (app) => {
    router.get('/list', themeController.getListTheme)
    router.post('/create', themeController.createTheme)
    router.put('/update/:id', themeController.updateTheme)
    router.delete('/delete/:id', themeController.deleteTheme)
   
    
    return app.use('/theme', router)
    
}

export default themeRouter