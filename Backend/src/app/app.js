import express, { urlencoded } from "express";
import router from "../routes/auth.routes.js";
import projectRouter from "../routes/project.routes.js"
import projectMemberRouter from "../routes/projectMember.routes.js";
import projectNotesRouter from "../routes/projectNotes.routes.js";
import taskRouter from "../routes/task.routes.js";
import subTaskRouter from "../routes/subTask.routes.js";
import cookieParser from "cookie-parser"



const app = express()
app.use(express.json())

app.use(express.urlencoded({extended : false}))
app.use(cookieParser())




// authentication router 
app.use("/api/v1/auth" , router)

// project related router
app.use("/api/v1/project" , projectRouter)

// project member related router
app.use("/api/v1/project-member" , projectMemberRouter)

// project Notes related router
app.use("/api/v1/project-note" , projectNotesRouter)

// task related router
app.use("/api/v1/task" , taskRouter)

// SubTask related router
app.use("/api/v1/sub-task" , subTaskRouter)


export default app