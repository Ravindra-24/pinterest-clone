import jwt from 'jsonwebtoken'
import logger from '../logger'

// const resetPassSecret = 
// const authSecrett = 

export const generateToken = (payload) => {
    return jwt.sign(payload,process.env.AUTH_SECRET,{expiresIn:'1d'})
}

export const generateResetToken = (payload) => {
    return jwt.sign(payload,process.env.RESET_PASSWORD_SECRET,{expiresIn:'5m'})
}
export const verifyResetToken = (token) => {
    try {
        const payload = jwt.verify(token,process.env.RESET_PASSWORD_SECRET)
        return payload
    } catch (error) {
        logger.log(error)
        return false
    }
}