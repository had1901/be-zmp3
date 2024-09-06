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
            console.error('Error:', err.message); // In thông báo lỗi chi tiết
            console.error('Stack Trace:', err.stack)
            return res.status(500).json({
                message: 'Connect did not work',
                ec: -1,
            })
        }
    },
    getListSong: async (req, res) => {
        // const tabName = req.body.genre
        try {
            const listSong = await db.Song.findAll({ 
                raw: true,
                limit: 3,
                offset: 1
            })
            if(!listSong) {
                return res.status(404).json({
                    message: 'Song not found',
                    ec: 1,
                })
            }
            return res.status(200).json({
                message: 'Song ok',
                ec: 0,
                dt: listSong
            })
        } catch (err) {
            console.error(err)
            console.error('Error:', err.message); // In thông báo lỗi chi tiết
            console.error('Stack Trace:', err.stack)
            return res.status(500).json({
                message: 'Connect did not work',
                ec: -1,
            })
        }
    },
   
}



export default musicController



