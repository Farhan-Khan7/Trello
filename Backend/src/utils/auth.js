import JWT from "jsonwebtoken";
import config from "../config/config.js"

export function verifyAccessToken(accessToken) {
    const decode = JWT.verify(accessToken , config.ACCESS_TOKEN_SECRET )
    return decode
}

export function verifyRefreshToken(refreshToken) {
    const decode = JWT.verify(refreshToken , config.REFRESH_TOKEN_SECRET)
    return decode 
}