import { Router } from "express";
import { createTask, deleteTask, getAllTaskByProject , updateTask, updateTaskStatus} from "../controllers/task.controllers.js"
import { isLogged } from "../middlewares/authLogged.middleware.js"

const taskRouter = Router()





taskRouter.route("/create-task").post(isLogged , createTask)
taskRouter.route("/get-task/:id").get(getAllTaskByProject)
taskRouter.route("/update-task/:id").post(updateTask)
taskRouter.route("/update-task-status/:id").post(updateTaskStatus)
taskRouter.route("/delete-task/:id").get(deleteTask)

export default taskRouter