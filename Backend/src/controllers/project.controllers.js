import projectModel from "../models/Project.models.js"




const createproject = async (req, res) => {
    const { title , description } = req.body

    if (!title || !description){
        return res.status(404).json({
            success : false,
            message : "title and description are required!"
        })
    }

    const project = await projectModel.create({
        title,
        description,
        createdBy : req.user._id
    })

    return res.status(201).json({
        success : true,
        message : "Project Create Successfully!",
        data : {
            title,
        }
    })
}


export { 
    createproject
}