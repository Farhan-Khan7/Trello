import { validationResult } from "express-validator";



const validate = (req, res , next) => {
    const errors = validationResult(req)

    console.log(typeof( errors))

    if(!errors.isEmpty()){
        return next()
    }

    const extractedError = []

    errors.array().map((err) => {
        return extractedError.push({ [err.path] : err.message})
    })

}

export default validate