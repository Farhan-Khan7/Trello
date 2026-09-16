import mongoose from "mongoose"
import config from "./config.js"

const connectToDB = async () => {
    try {
        await mongoose.connect(config.MONGO_URI)
        console.log("Database connected successfully!")
    }catch (error) {
        console.error(`Database connection error ${error}`)
    }
}


export default connectToDB



