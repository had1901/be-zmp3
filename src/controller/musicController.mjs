import dotenv from 'dotenv'
dotenv.config()
import db from '../models/index.js'



const musicController = {
    getSongs: async (req, res) => {
        const tabName = req.body?.genre
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
    createSong: async (req, res) => {
        const {title, artist, genre, duration, thumbnail, releaseDate, url, url_mp4} = req.body
        try {
            if(title, artist, genre, duration, thumbnail, releaseDate, url, url_mp4) {
                await db.User.create({
                    title: title,
                    artist: artist,
                    genre: genre,
                    duration: duration,
                    thumbnail: thumbnail,
                    releaseDate: releaseDate,
                    albumId: 1,
                    artistId: 1,
                    genreId: 1,
                    url: url,
                    url_mp4: url_mp4,
                })
                return res.status(200).json({
                    message: 'Tạo bài hát thành công',
                    ec: 0,
                    dt: null
                })
            } else {
                return res.status(304).json({
                    message: 'Không tạo được bài hát',
                    ec: 1,
                    dt: null
                })
            }
            
        } catch (err) {
            console.error(err)
            return res.status(500).json({
                message: 'Connect did not work',
                ec: -1,
            })
        }
    },
    updateSong: async (req, res) => {
        const { id } = req.params
        const {title, artist, genre, duration, thumbnail, releaseDate, url, url_mp4} = req.body
        try {
            if(id) {
                const [updateDeleted] = await db.Song.update({
                        title: title,
                        artist: artist,
                        genre: genre,
                        duration: duration,
                        thumbnail: thumbnail,
                        releaseDate: releaseDate,
                        url: url,
                        url_mp4: url_mp4,
                    },
                    { where: { id: id }},
                )
                if(updateDeleted === 0) {
                    return res.status(404).json({
                        message: 'Song not found',
                        ec: 1,
                    })
                }
                return res.status(200).json({
                    message: 'Updated successfully',
                    ec: 0,
                    dt: id
                })
            } else {
                return res.status(304).json({
                    message: 'Not found song',
                    ec: 1,
                    dt: null
                })
            }
            
        } catch (err) {
            console.error(err)
            return res.status(500).json({
                message: 'Connect did not work',
                ec: -1,
            })
        }
    },
    deleteSong: async (req, res) => {
        const { id } = req.params
        try {
            const deletedSong = await db.Song.destroy({
                where: { id: id }
            })
            if(!deletedSong) {
                return res.status(404).json({
                    message: 'Song not found',
                    ec: 1,
                })
            }
            return res.status(200).json({
                message: 'Deleted',
                ec: 0,
                dt: id
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



