import { Router } from "express";
import { createSubTask, deleteSubTask, getAllSubTaskByTask, updateSubTask, updateSubTaskStatus } from "../controllers/subTask.controllers.js"
import {isLogged} from "../middlewares/authLogged.middleware.js"

const subTaskRouter = Router();


subTaskRouter.route("/create-subtask").post(isLogged , createSubTask)
subTaskRouter.route("/get-subtask/:id").get(getAllSubTaskByTask)
subTaskRouter.route("/update-subtask/:id").post(updateSubTask)
subTaskRouter.route("/update-subtask-status/:id").post(updateSubTaskStatus)
subTaskRouter.route("/delete-subtask/:id").get(deleteSubTask)


export default subTaskRouter