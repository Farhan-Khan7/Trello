import express , { Router } from "express"
import { registervalidator } from "../validator/auth.validator.js"
import validate from "../middlewares/validate.middleware.js"
import {registerUser , profileverify, me , refresh , loginUser} from "../controllers/auth.controllers.js"

const router = Router()



// everything should function in route other wise you phase error

router.route("/register").post(registervalidator() , validate , registerUser)
router.route("/profileverify/:emailVerficationToken").get(profileverify)
router.route("/me").get(me)
router.route("/refresh").post(refresh)
router.route("/login").post(loginUser)




export default router