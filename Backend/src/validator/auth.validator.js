import { body } from "express-validator"


const registervalidator = () => {

    return [
        body("userName")
        .trim()
        .notEmpty().withMessage("username is required")
        .isLength({min : 3}).withMessage("username length must be alteast 3")
        .isLowercase(), 

        body("email")
        .notEmpty().withMessage("Email is Requird!")
        .trim()
        .isEmail().withMessage("Invalid Formate"),
        
        body("password")
        .trim()
        .notEmpty().withMessage("password is required")
        .isLength({min : 6}).withMessage("password length must be atleast 6"),

    ]

}


const loginvalidator = () => {

    return [
        body("userName")
        .trim()
        .notEmpty().withMessage("username is required")
        .isLowercase()
        .optional(),

        body("email")
        .notEmpty().withMessage("Email is required")
        .trim()
        .isEmail()
        .optional(),

        body("password")
        .trim()
        .notEmpty().withMessage("password is required")
        .isLength({min : 6}).withMessage("Wrong Password "),

    ]
}

export {
    registervalidator,
    loginvalidator
}