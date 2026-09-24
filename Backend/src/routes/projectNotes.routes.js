import { Router } from "express";
import { createProjectNote , deleteProjectNote , completedProjectNote } from "../controllers/projectNotes.controllers.js";
import { isLogged } from "../middlewares/authLogged.middleware.js"

const projectNotesRouter = Router()


projectNotesRouter.route("/create-project-note").post(isLogged , createProjectNote)
projectNotesRouter.route("/completed-project/:id").get(completedProjectNote)
projectNotesRouter.route("/delete-project/:id").get(deleteProjectNote)




export default projectNotesRouter