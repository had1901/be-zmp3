
import jwt from  'jsonwebtoken'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'

const environment = process.env.NODE_ENV || 'development'
dotenv.config({ path: `.env.${environment}` })


const checkPassword = async (password, hashPassword) => {
    const check = await bcrypt.compare(password, hashPassword)
    return check
} 
 
const verifyToken = (req, res, next) => {
    const paths = ['/auth/register', '/auth/login', '/auth/logout', '/auth/refreshToken' ]
    if(!paths.includes(req.originalUrl)) {
        const token = req.cookies.token?.split(', ')[0]
        if (!token) {
           return res.status(403).json({
               message: 'Token is not provided',
               ec: -1,
               isToken: false
           })
       }
       jwt.verify(token, process.env.ACCESS_SECRET_KEY, (err, decoded) => {
           if (err) {
               if(err.name === 'TokenExpiredError') {
                   return res.status(401).json({
                       message: 'Token has expired',
                       ec: 1,
                       isHasExpired: true
                   })
               }
               return res.status(403).json({
                   message: 'Token invalid',
                   ec: -1,
                   isValid: false
               })
           }
           req.user = decoded
           next()
       })
    } else {
        next()
    }
    
}

const checkExpired = (req, res) => {
    const token = req.user
    console.log('--- checkExpired ===', token)

   jwt.verify(token, process.env.ACCESS_SECRET_KEY, (err, decoded) => {
       if (err) {
        console.log(err)

           return res.status(401).json({
               message: 'Token invalid',
               ec: -1,
           })
       }
       req.user = decoded
       next()
   })
}
const verifyTokenLogout = (req, res, next) => {
    const token = req.cookies.token?.split(', ')[0]
    if(!token) {
        return res.json({
            message: 'Token required',
            ec: 1,
            isToken: false
        })
    }
    jwt.verify(token, process.env.ACCESS_SECRET_KEY, (err, user) => {
        if (err) {
            return res.json({
                message: 'Token invalid',
                ec: 1,
                isValid: false
            })
        }
        req.user = user
        req.accessToken = token
        next()
    })
}



export {
    verifyToken,
    verifyTokenLogout,
    checkPassword
}