import express, { urlencoded } from "express";
import router from "../routes/auth.routes.js";
import cookieParser from "cookie-parser"



const app = express()
app.use(express.json())

app.use(express.urlencoded({extended : false}))
app.use(cookieParser())


app.use("/api/v1/auth" , router)



export default app