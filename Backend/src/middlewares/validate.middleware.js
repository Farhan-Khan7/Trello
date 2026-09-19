import { validationResult } from "express-validator";



const validate = (req, res , next) => {
    const errors = validationResult(req)

    console.log(typeof( errors))

    if(!errors.isEmpty()){
        return next()
    }

    const extrectedError = []

    errors.array().map((err) => {
        return extrectedError.push({ [err.path] : err.message})
    })

console.log("line number 20 per hu validate middleware me ")

    console.log(extrectedError , "ye line number 22 hai ")

    console.log("line number 24 per hu validate middleware me ")

}

export default validate