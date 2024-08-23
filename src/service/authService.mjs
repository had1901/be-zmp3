import db from '../models/index.js'
import { checkPassword } from '../middleware/auth.mjs'
import bcrypt from 'bcrypt'
import jwt from  'jsonwebtoken'


const authService = {
    register: async (data) => {
        // check user exists before creating
        const checkUserExist = await db.User.findOne({
            where: { username: data.username },
        })

        if(checkUserExist) {
            return res.status(401).json({
                message: 'Người dùng đã tồn tại',
                ec: 1,
            })
        }
       
        // create new user 
        const hashPassword = await bcrypt.hash(data.password, saltRounds)
        await db.User.create({
            username: data.username,
            password: hashPassword,
            groupID: 1,
          })
        
        return res.status(200).json({
            message: 'Đăng ký thành công',
            ec: 0,
            dt: data.username
        })
    },
    login: async (data) => {
        const user = await db.User.findOne({
            where: { username: data.username },
            attributes: ['id','username', 'password'],
            include: { 
                model: db.Group ,
                attributes: ['id', 'group_name']
            },
            raw: true,
            nest: true
        })
        if(user) {
            const payload = {
                id: user.id,
                username: user.username
            }
            
            const token = jwt.sign(payload, secretKey, { expiresIn: '1h' })
            console.log('login: ===', user)
            const result = {
                username: user.username,
                groupID: user.groupID,
                token: token
            }
            res.setHeader('Set-Cookie', `token=${token}, httpOnly; Secure; SameSite=None; Expires=${new Date(Date.now() + 360000).toUTCString()}; Path=/` )
            const isCheckPassword = await checkPassword(data.password, user.password)
            console.log('isCheckPassword: ===', isCheckPassword)
            if(!isCheckPassword) {
                return res.status(401).json({
                    message: 'Username or password not true',
                    ec: 1,
                 })
            }
            return res.status(200).json({
                message: 'Đăng nhập thành công',
                ec: 0, 
                dt: result
             })
        } else {
            return res.status(404).json({
                message: 'Not find user',
                ec: 1
             })
        }
    }
}

export default authService