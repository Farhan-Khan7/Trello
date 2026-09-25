import projectModel from "../models/Project.models.js";
import taskModel from "../models/Task.models.js";
import userModel from "../models/User.models.js";

const createTask = async (req, res) => {
    const { taskTitle, taskDescription, projectReference, assignToUser, assignBy, taskStatus } = req.body;
    
    // const id = req.user.id;


    if (!(taskTitle || taskDescription || projectReference || assignToUser || assignBy || taskStatus)) {
        return res.status(404).json({
            success: false,
            message: "these fields are required!",
        });
    }

    const assignByAdmin = await userModel.findOne({email : assignBy});

    if (!assignByAdmin) {
        return res.status(404).json({
            success: false,
            message: "Admin not found!",
        });
    }

    const assignUser = await userModel.findOne({email : assignToUser})

    if(!assignUser){
        return res.status(404).json({
            success: false,
            message: "Assign User not found!",
        });
    }

    const refProject = await projectModel.findOne({title : projectReference})

    const task = await taskModel.create({
        taskTitle,
        taskDescription,
        refProject,
        taskStatus,
        assignToUser : assignUser._id,
        assignBy : assignByAdmin._id,
    })
    
    
    res.status(200).json({
        success : true,
        message : "Task Created Successfully",
        data : {
            task
        }
    })

};


export {
    createTask
}
