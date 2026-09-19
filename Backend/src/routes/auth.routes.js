import express , { Router } from "express"
import { registervalidator } from "../validator/auth.validator.js"
import validate from "../middlewares/validate.middleware.js"
import {registerUser , profileverify} from "../controllers/auth.controllers.js"

const router = Router()



// everything should function in route other wise you phase error

router.route("/register").post(registervalidator() , validate , registerUser)
router.route("/profileverify/:emailVerficationToken").get(profileverify)




export default router