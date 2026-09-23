import { Router } from "express"
import { addMember } from "../controllers/projectMember.controllers.js"

const projectMemberRouter = Router()





projectMemberRouter.route("/add-member").post(addMember)


export default projectMemberRouter