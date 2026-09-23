import { Router } from "express"
import { addMember , deleteMember , getMemberById } from "../controllers/projectMember.controllers.js"

const projectMemberRouter = Router()





projectMemberRouter.route("/add-member").post(addMember)
projectMemberRouter.route("/get-project-members/:id").get(getMemberById)
projectMemberRouter.route("/delete-member/:id").post(deleteMember)



export default projectMemberRouter