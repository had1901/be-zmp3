import dotenv from 'dotenv'
dotenv.config()
import db from '../models/index.js'



const imagesController = {
    getImageSlide: async (req, res) => {
        try {
            const imagesSlide = await db.Image_Slide.findAll({ raw: true})
            if(!imagesSlide) {
                return res.status(404).json({
                    message: 'Image-slide not found',
                    ec: 1,
                })
            }
            return res.status(200).json({
                message: 'Image-slide ok',
                ec: 0,
                dt: imagesSlide
            })
        } catch (err) {
            console.error(err)
            return res.status(500).json({
                message: 'Connect did not work',
                ec: -1,
            })
        }
    },
}



export default imagesController



