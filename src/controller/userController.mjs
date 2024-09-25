import dotenv from 'dotenv'
dotenv.config()
import db from '../models/index.js'
import bcrypt from 'bcrypt'
import { hashPassword } from '../middleware/auth.mjs'

const environment = process.env.NODE_ENV || 'development'
dotenv.config({ path: `.env.${environment}` })
const saltRounds = parseInt(process.env.SALT_ROUNDS)

const userController = {
    getUsers: async (req, res) => {
        try {
            const users = await db.User.findAll({
                attributes: ['id','username', 'password', 'groupID'],
                include: [
                    { 
                        model: db.Group ,
                        attributes: ['group_name'],
                        order: [
                            ['group_name', 'DESC'],
                        ],
                    },
                    
                ],
                raw: true,
                nest: true,
            })
            const countUser = await db.User.findAndCountAll({
                attributes: ['id','username', 'password', 'groupID'],
                offset: 0,
                limit: 2,
                raw: true
            })
            console.log({ row: countUser.rows?.length, count: countUser.count})
            if(!users) {
                return res.status(404).json({
                    message: 'Song album not found',
                    ec: 1,
                })
            }
            return res.status(200).json({
                message: 'Song album ok',
                ec: 0,
                dt: users,
                count: countUser
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
        const {username, password, role} = req.body
        console.log(username, password, role)
        try {
            // check user exists before creating
            const checkUserExist = await db.User.findOne({
                where: { username: username },
            })

            if(checkUserExist) {
                return res.status(401).json({
                    message: 'Người dùng đã tồn tại',
                    ec: 1,
                })
            }
            // create a new user
            const hashPass = await hashPassword(password, saltRounds) 
            await db.User.create({
                username: username,
                password: hashPass,
                groupID: role || 1,
            })
            
            return res.status(200).json({
                message: 'Tạo tài khoản thành công',
                ec: 0,
                dt: null
            })
        } catch (err) {
            console.error(err)
            return res.status(500).json({
                message: 'Connect did not work',
                ec: -1,
            })
        }
    },
    updateUser: async (req, res) => {
        const { id } = req.params
        const {password, role} = req.body
        try {
            const hashPassword = await bcrypt.hash(password, saltRounds)
            console.log('hashPassword', hashPassword)

            const [updateDeleted] = await db.User.update({
                password: hashPassword,
                groupID: role
            },
            { where: { id: id }},
            
            )
            console.log('updateDeleted', updateDeleted)
            if(updateDeleted === 0) {
                return res.status(404).json({
                    message: 'User not found',
                    ec: 1,
                })
            }
            return res.status(200).json({
                message: 'Updated successfully',
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
    deleteUser: async (req, res) => {
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



