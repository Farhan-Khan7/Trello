import express , { Router } from "express"
import { registervalidator } from "../validator/auth.validator.js"
import validate from "../middlewares/validate.middleware.js"
import {registerUser} from "../controllers/auth.controllers.js"

const router = Router()


console.log(typeof registervalidator);
console.log(typeof validate);
console.log(typeof registerUser);

// everything should function in route other wise you phase error

router.route("/register").post(registervalidator() , validate , registerUser)




export default router