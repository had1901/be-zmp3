import dotenv from 'dotenv'
dotenv.config()
import db from '../models/index.js'
import { where } from 'sequelize'



const albumController = {
    getSongAlbum: async (req, res) => {
        const { categoryAlbum } = req.params
        try {
            const album = await db.Album.findOne({ 
                where: { title: categoryAlbum },
                include: {
                    raw: true,
                    model: db.Song,
                    where: { album: categoryAlbum }
                }

            })
            console.log(album)
            if(!album) {
                return res.status(404).json({
                    message: 'Song album not found',
                    ec: 1,
                })
            }
            return res.status(200).json({
                message: 'Song album ok',
                ec: 0,
                dt: album
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



export default albumController



