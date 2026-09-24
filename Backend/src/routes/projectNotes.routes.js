import { Router } from "express";
import { createProjectNote, deleteProjectNote, completedProjectNote, getAllProjectNotesByProjects, updateProjectNotes } from "../controllers/projectNotes.controllers.js";
import { isLogged } from "../middlewares/authLogged.middleware.js"

const projectNotesRouter = Router()


projectNotesRouter.route("/create-project-note").post(isLogged, createProjectNote)
projectNotesRouter.route("/completed-project-note/:id").get(completedProjectNote)
projectNotesRouter.route("/get-all-notes-selected-projects/:id").get(getAllProjectNotesByProjects)
projectNotesRouter.route("/update-project-note/:id").post(updateProjectNotes)
projectNotesRouter.route("/delete-project-note/:id").get(deleteProjectNote)




export default projectNotesRouter