import dotenv from 'dotenv'
dotenv.config()
import db from '../models/index.js'



const userController = {
    getUsers: async (req, res) => {
        try {
            const users = await db.User.findAll({
                attributes: ['id','username', 'password'],
                include: [
                    { 
                        model: db.Group ,
                        attributes: ['group_name'],
                    },
                ]
            })
            console.log(users)
            if(!users) {
                return res.status(404).json({
                    message: 'Song album not found',
                    ec: 1,
                })
            }
            return res.status(200).json({
                message: 'Song album ok',
                ec: 0,
                dt: users
            })
        } catch (err) {
            console.error(err)
            return res.status(500).json({
                message: 'Connect did not work',
                ec: -1,
            })
        }
    },
    createUser: async (req, res) => {
        const data = req.body
        console.log('data', data)
        return res.status(201).json({
            mess: 'create ok'
        })
        // try {
        //     const userDeleted = await db.User.create({
        //         where: { id: id }
        //     })
        //     console.log(userDeleted)
        //     if(!userDeleted) {
        //         return res.status(404).json({
        //             message: 'User not found',
        //             ec: 1,
        //         })
        //     }
        //     return res.status(200).json({
        //         message: 'Deleted',
        //         ec: 0,
        //         dt: id
        //     })
        // } catch (err) {
        //     console.error(err)
        //     return res.status(500).json({
        //         message: 'Connect did not work',
        //         ec: -1,
        //     })
        // }
    },
    deleteUsers: async (req, res) => {
        const { id } = req.params
        console.log('deleteUsers', id)
        try {
            const userDeleted = await db.User.destroy({
                where: { id: id }
            })
            console.log(userDeleted)
            if(!userDeleted) {
                return res.status(404).json({
                    message: 'User not found',
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



export default userController



