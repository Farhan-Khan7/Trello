import dotenv from "dotenv";
dotenv.config({
    path : "./.env"
});


const config = {
    PORT : process.env.PORT,
    MONGO_URI : process.env.MONGO_URI,
    ACCESS_TOKEN : process.env.ACCESS_TOKEN,
    REFRESH_TOKEN : process.env.REFRESH_TOKEN
}


export default config