import {Router} from "express"
import { createproject } from "../controllers/project.controllers.js"
import { isLogged } from "../middlewares/authLogged.middleware.js"



const projectRouter = Router();

projectRouter.route("/create-project").post(isLogged , createproject)

export default projectRouter