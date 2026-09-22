import userModel from "../models/User.models.js";
import {verifyRefreshToken} from "../utils/auth.js"

const isLogged = async(req , res , next) => {
    const token = req.cookies?.refreshToken;

    if(!token){
        return res.status(401).json({
            success : false,
            message : "unauthorized , token not found"
        })
    }

    const decode = verifyRefreshToken(token)

    const user = await userModel.findById(decode.id)

    if(!user){
        return res.status(404).json({
            success : false,
            message : "user not found"
        })
    }

    req.user = user

    next()
}

export {
    isLogged
}