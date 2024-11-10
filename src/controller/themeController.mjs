import dotenv from 'dotenv'
dotenv.config()
import db from '../models/index.js'



const themeController = {
    getListTheme: async (req, res) => {
        try {
            const listTheme = await db.Theme.findAll({ 
                raw: true,
                offset: 0,
                limit: 10,
            })
            if(!listTheme) {
                return res.status(404).json({
                    message: 'Theme not found',
                    ec: 1,
                })
            }
            return res.status(200).json({
                message: 'Theme ok',
                ec: 0,
                dt: listTheme
            })
        } catch (err) {
            console.error(err)
            console.error('Error:', err.message)
            console.error('Stack Trace:', err.stack)
            return res.status(500).json({
                message: 'Connect did not work',
                ec: -1,
            })
        }
    },
    createTheme: async (req, res) => {
        const {name, genre, url} = req.body
        console.log(req.body)
        try {
            if(name, genre, url) {
                await db.Theme.create({
                    name: name,
                    genre: genre,
                    url: url,
                })
                return res.status(200).json({
                    message: 'Tạo thành công',
                    ec: 0,
                    dt: null
                })
            } else {
                return res.status(304).json({
                    message: 'Không tạo được',
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
    updateTheme: async (req, res) => {
        const { id } = req.params
        const {name, genre, url} = req.body
        try {
            if(id) {
                const [updateDeleted] = await db.Theme.update({
                        name: name,
                        genre: genre,
                        url: url,
                    },
                    { where: { id: id }},
                )
                if(updateDeleted === 0) {
                    return res.status(404).json({
                        message: 'Theme not found',
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
                    message: 'Not found Theme',
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
    deleteTheme: async (req, res) => {
        const { id } = req.params
        try {
            const deletedTheme = await db.Theme.destroy({
                where: { id: id }
            })
            if(!deletedTheme) {
                return res.status(404).json({
                    message: 'Theme not found',
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



export default themeController



