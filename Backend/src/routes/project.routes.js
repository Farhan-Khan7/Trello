import {Router} from "express"
import { createproject , getAllProjects , getProjectById , updateProject , deleteProject} from "../controllers/project.controllers.js"
import { isLogged } from "../middlewares/authLogged.middleware.js"



const projectRouter = Router();

projectRouter.route("/create-project").post(isLogged , createproject)
projectRouter.route("/all-projects").get(getAllProjects)
projectRouter.route("/id/:id").get(getProjectById)
projectRouter.route("/update-project/:id").post(updateProject)
projectRouter.route("/delete-project/:id").get(deleteProject)

export default projectRouter