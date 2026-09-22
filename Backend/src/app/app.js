import express, { urlencoded } from "express";
import router from "../routes/auth.routes.js";
import projectRouter from "../routes/project.routes.js"
import cookieParser from "cookie-parser"



const app = express()
app.use(express.json())

app.use(express.urlencoded({extended : false}))
app.use(cookieParser())




// authentcation router 
app.use("/api/v1/auth" , router)

// project related router
app.use("/api/v1/project" , projectRouter)


export default app