import express, { urlencoded } from "express";
import router from "../routes/auth.routes.js";




const app = express()
app.use(express.json())

app.use(express.urlencoded({extended : false}))


app.use("/api/v1/auth" , router)



export default app