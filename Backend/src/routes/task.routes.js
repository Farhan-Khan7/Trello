import { Router } from "express";
import { createTask } from "../controllers/task.controllers.js"
import { isLogged } from "../middlewares/authLogged.middleware.js"

const taskRouter = Router()





taskRouter.route("/create-task").post(isLogged , createTask)

export default taskRouter