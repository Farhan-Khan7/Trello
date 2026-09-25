import projectModel from "../models/Project.models.js";
import taskModel from "../models/Task.models.js";
import userModel from "../models/User.models.js";


// CreateTask API Completed
const createTask = async (req, res) => {
    const { taskTitle, taskDescription, projectReference, assignToUser, assignBy, taskStatus } = req.body;

    // const id = req.user.id;


    if (!(taskTitle || taskDescription || projectReference || assignToUser || assignBy || taskStatus)) {
        return res.status(404).json({
            success: false,
            message: "these fields are required!",
        });
    }

    const assignByAdmin = await userModel.findOne({ email: assignBy });

    if (!assignByAdmin) {
        return res.status(404).json({
            success: false,
            message: "Admin not found!",
        });
    }

    const assignUser = await userModel.findOne({ email: assignToUser })

    if (!assignUser) {
        return res.status(404).json({
            success: false,
            message: "Assign User not found!",
        });
    }

    const refProject = await projectModel.findOne({ title: projectReference })

    const task = await taskModel.create({
        taskTitle,
        taskDescription,
        projectReference : refProject._id,
        taskStatus,
        assignToUser: assignUser._id,
        assignBy: assignByAdmin._id,
    })


    res.status(200).json({
        success: true,
        message: "Task Created Successfully",
        data: {
            task
        }
    })

};

// GetTask By Project API Completed
const getAllTaskByProject = async (req, res) => {
    const id = req.params.id

    if(!id){
        return res.status(404).json({
            success : false,
            message : "project Id not found for task!"
        })
    }

    const refProject = await taskModel.find({projectReference : id})

    if(!refProject){
        return res.status(404).json({
            success : false,
            message : "Reference Project not Found for task!"
        })
    }

    res.status(200).json({
        success : true,
        message : "Task Fetch Successfully!",
        data : {
            refProject
        }
    })
}

// Update Task API Completed
const updateTask = async (req, res) => {
    const {taskTitle , taskDescription} = req.body
    const id = req.params.id

    
    if(!id){
        return res.status(404).json({
            success : false,
            message : "Task Id not found for task!"
        })
    }

    const task = await taskModel.findByIdAndUpdate(
        id,
        {
            taskTitle,
            taskDescription
        },
        {
            returnDocument : "after"
        }
    )

    res.status(200).json({
        success : true,
        message : "Task Updated Successfully!",
        data : {
            task
        }
    })


}

const updateTaskStatus = async (req ,res) => {
    const {taskStatus} = req.body
    const id = req.params.id

    if(!id){
        return res.status(404).json({
            success : false,
            message : "Task Id not found for task!"
        })
    }

    const task = await taskModel.findById(id)

    if(!task){
        return res.status(404).json({
            success : false,
            message : "task not found!"
        })
    }

    task.taskStatus = taskStatus

    await task.save()

    res.status(200).json({
        success : true,
        message : "Task Updated Successfully!",
        data : {
            task
        }
    })
}

// Delete Task API Completed
const deleteTask = async (req ,res) => {
    const id = req.params.id

    if(!id){
        return res.status(404).json({
            success : false,
            message : "Task Id not found for task!"
        })
    }

    const task = await taskModel.findByIdAndDelete(id)

    res.status(200).json({
        success : true,
        message : "Task Deleted Successfully!",
        data : {
            task
        }
    })
}
export {
    createTask,
    getAllTaskByProject,
    updateTask,
    updateTaskStatus,
    deleteTask
}
