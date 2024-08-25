import dotenv from 'dotenv'
dotenv.config()
import db from '../models/index.js'



const musicController = {
    getSongs: async (req, res) => {
        const tabName = req.body.genre
        try {
            const songs = await db.Song.findAll({ 
                raw: true,
                where: { genre: tabName}
            })
            if(!songs) {
                return res.status(404).json({
                    message: 'Song not found',
                    ec: 1,
                })
            }
            return res.status(200).json({
                message: 'Song ok',
                ec: 0,
                dt: songs
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



export default musicController



