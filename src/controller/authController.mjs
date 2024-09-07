import db from '../models/index.js'
import bcrypt from 'bcrypt'
import jwt from  'jsonwebtoken'
import { checkPassword } from '../middleware/auth.mjs'
import dotenv from 'dotenv'
import cloudinary from '../config/cloudinaryConfig.mjs'
dotenv.config()
import path from 'path'
import fs from 'fs'

const saltRounds = parseInt(process.env.SALT_ROUNDS)
const access_secret_key = process.env.ACCESS_SECRET_KEY
const refresh_secret_key = process.env.REFRESH_SECRET_KEY


const authController = {
    register: async (req, res) => {
        const { data } = req.body
        console.log('Request ===', data )
        try {

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

        } catch (err) {
            return res.status(500).json({
                message: err.message,
                ec: -1,
            })
        }
    },
    login: async (req, res) => {
        const { data } = req.body
        try {
            const user = await db.User.findOne({
                where: { username: data.username },
                attributes: ['id','username', 'password'],
                include: [
                    { 
                        model: db.Group ,
                        attributes: ['group_name'],
                        include: { 
                            model: db.Role ,
                            attributes: ['role_url'],
                            through: { attributes: [] }
                        }
                    },
                    { 
                        model: db.Avatar ,
                        attributes: ['url'],
                        
                    },
                ],
                raw: true,
                nest: true
            })
            if(user) {
                const payload = {
                    id: user.id,
                    username: user.username,
                    group: user.Group,
                    avatarUrl: user.Avatar.url,
                    isLogging: true,
                }
                
                const access_token = jwt.sign(payload, access_secret_key, { expiresIn: '1m' })
                const refresh_token = jwt.sign(payload, refresh_secret_key, { expiresIn: '7d' })
                console.log('login: ===', user)
                const result = {
                    ...payload,
                    access_token: access_token,
                }
                res.setHeader('Set-Cookie', 
                    [
                        `token=${access_token}; HttpOnly; Secure; SameSite:'none', Path=/`,
                        `refreshToken=${refresh_token}; HttpOnly; Secure; SameSite:'none', Expires=${new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toUTCString()}; Path=/`
                    ])
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
            
        } catch (err) {
            console.log(err)
            return res.status(500).json({
                message: 'Can not connect to DB',
                ec: -1
             })
        }
    },
    logout: async (req, res) => {
        try{
            res.clearCookie('token', { httpOnly: true, path: '/' })
            res.clearCookie('refreshToken', { httpOnly: true, path: '/' })
            return res.status(201).json({
                message: 'User logged',
                ec: 0,
                isLogout: true,
            })
        }catch(e){
            return res.status(500).json({
                message: 'Logout is wrong',
                ec: -1,
            })    
        }
    },
    me: async (req, res) => {
        try {
            const user = await db.User.findOne({
                where: { 
                    id: req.user.id,
                    username: req.user.username 
                },
                attributes: ['id','username'],
                include: { 
                    model: db.Group ,
                    attributes: ['group_name'],
                    include: { 
                        model: db.Role ,
                        attributes: ['role_url'],
                        through: { attributes: [] }
                    }
                },
                raw: true,
                nest: true
            })
            if(!user) {
                return res.status(401).json({
                    message: 'Bạn không có quyền truy cập',
                    ec: 1,
                    dt: ''
                })
            } else {
                return res.status(200).json({
                    message: 'Bạn có quyền truy cập',
                    ec: 0,
                    dt: user
                })
            }
            
        } catch (err) {
            return res.status(500).json({
                message: err.message,
                ec: -1,
            })
        }
    },
    refresh: async (req, res) => {
        const refreshToken = req.cookies.refreshToken

        try {
            if(!refreshToken) {
                return res.status(403).json({
                    message: 'Token not found',
                    ec: 1
                })
            } 
            jwt.verify(refreshToken, refresh_secret_key, (err, user) => {
                if(err) {
                    return res.status(403).json({ 
                        message: 'Forbidden',
                        ec: 1 
                    })
                }
                const { exp, iat, ...newUser } = user
                const newAccessToken = jwt.sign(newUser, access_secret_key, { expiresIn: '1m' })
                const newRefreshToken = jwt.sign(newUser, refresh_secret_key, { expiresIn: '7d' })
                
                res.clearCookie('refreshToken', { httpOnly:true, secure:false, path: '/' })
                res.cookie('token', newAccessToken, { httpOnly:true, secure:false, sameSite:'none', path: '/' })
                res.cookie('refreshToken', newRefreshToken, { httpOnly:true, secure:false, sameSite:'none', path: '/', maxAge: 7 * 24 * 60 * 60 * 1000 })

                return res.status(200).json({
                    newAccessToken,
                    newRefreshToken
                })
            })
        } catch (err) {
            return res.status(500).json({
                message: 'Can not access token',
                ec: -1
             })
        }
        
    },

    // private routes
    home: async (req, res) => {
        const user = req.user
        try{
            return res.status(201).json({
                message: 'Access route',
                ec: 0,
                isAccess: true
            })

        }catch(e) {
            return res.status(403).json({
                message: 'Not enter this route',
                ec: -1,
                isAccess: false
            })

        }
    },
    libraries: async (req, res) => {
        const user = req.user
        try{
            return res.status(201).json({
                message: 'Access private route',
                ec: 0,
                isAccess: true
            })

        }catch(e) {
            return res.status(403).json({
                message: 'Not enter this route',
                ec: -1,
                isAccess: false
            })

        }
    },
    zingChart: async (req, res) => {
        const user = req.user
        try{
            return res.status(201).json({
                message: 'Access private route',
                ec: 0,
                isAccess: true
            })

        }catch(e) {
            return res.status(403).json({
                message: 'Not enter this route',
                ec: -1,
                isAccess: false
            })

        }
    },
    upload: async (req, res) => {
        const user = req.user
        console.log('--upload: ', user)
        try{
            const person = await db.User.findOne({
                where: { username: user.username },
                attributes: ['id','username', 'password'],
                include: { 
                    model: db.Group ,
                    attributes: ['group_name'],
                    include: { 
                        model: db.Role ,
                        attributes: ['role_url'],
                        through: { attributes: [] }
                    }
                },
                raw: true,
                nest: true
            })
            console.log('--user: ', person)

            if(!person) {
                return res.status(404).json({
                    message: 'Not found user',
                    ec: 1,
                    isUser: false
                })
            }
            const roleUrl = ['/auth/upload', '/auth/admin']
            if(person.Group.group_name === 'admin' && roleUrl.includes(person.Group.Roles.role_url)) {
                return res.status(201).json({
                    message: 'Access private route admin',
                    ec: 0,
                    isAccess: true
                })
            } else {
                return res.status(201).json({
                    message: 'You not access this route',
                    ec: 1,
                    isAccess: false
                })
            }
            
            

        }catch(e) {
            return res.status(403).json({
                message: 'Not enter this route',
                ec: -1,
                isAccess: false
            })

        }
    },



    // upload image
    uploadFile: async (req, res) => {
        const file = req.file
        try {
            if(!file) {
                return res.status(404).json({
                    message: 'Not found img',
                    ec: 1,
                })
            }
          
            const uploadResult = await cloudinary.uploader.upload(file.path, { 
                        resource_type: "auto",
                        public_id: path.parse(file.originalname).name,
                    })
            console.log('uploadResult: ', uploadResult)
            
            if(uploadResult) {
                fs.unlinkSync(file.path) // remove file in folder
                const optimizeUrl = cloudinary.url(uploadResult.public_id, {
                        resource_type: "video",
                        fetch_format: 'auto',
                        quality: 'auto',
                        crop: 'fill',
                        gravity: 'auto',
                    }
                )
                console.log('optimizeUrl: ', optimizeUrl)
                return res.status(200).json({
                    message: 'Uploading ok',
                    ec: 0,
                    data: { file, uploadResult, optimizeUrl }
                })

            } else {
                return res.status(402).json({
                    message: 'Upload failed',
                    ec: 1,
                })
            }

        } catch(e) {
            if (req.file && req.file.path) {
                fs.unlinkSync(req.file.path)
            }
            return res.status(403).json({
                message: 'Uploading image failed',
                ec: -1,
            })
        }
    },
    getFile: async (req, res) => {
        try {
            const getFileResult = await cloudinary.api.resources_by_asset_folder('mp3-theme')

            if(!getFileResult) {
                return res.status(402).json({
                    message: 'Upload failed',
                    ec: 1,
                })
            }
            console.log('uploadResult: ', getFileResult)
            return res.status(200).json({
                message: 'Get file ok',
                ec: 0,
                dt: getFileResult.resources
            })
            
        } catch (error) {
            console.log(error)
        }
    }



}


export default authController