import dotenv from "dotenv";
dotenv.config({
    path : "./.env"
});


const config = {
    PORT : process.env.PORT,
    MONGO_URI : process.env.MONGO_URI,
    JWT_SECRET : process.env.JWT_SECRET,
    ACCESS_TOKEN_SECRET : process.env.ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_SECRET : process.env.REFRESH_TOKEN_SECRET,

    BASE_URL: process.env.BASE_URL,

    MAILTRAP_HOST : process.env.MAILTRAP_HOST,
    MAILTRAP_PORT : process.env.MAILTRAP_PORT,
    MAILTRAP_USER : process.env.MAILTRAP_USER,
    MAILTRAP_PASS : process.env.MAILTRAP_PASS,
    MAILTRAP_SENDER : process.env.MAILTRAP_SENDER

}


export default config