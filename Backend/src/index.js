import express from "express"
import connectToDB from "./config/dbConnect.js";
import config from "./config/config.js";
import app from "./app/app.js";
import dotenv from "dotenv";
dotenv.config({
    path : "./.env"
});



const port = config.PORT || 8080
await connectToDB()

app.listen(port , () => {
    console.log(`Server is running on port :  ${port}`)
})
