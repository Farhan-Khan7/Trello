import subTaskModel from "../models/SubTask.models.js";
import taskModel from "../models/Task.models.js";
import userModel from "../models/User.models.js";

// create SubTask API Completed
const createSubTask = async (req, res) => {
    const { title, taskDescription, taskReference, status } = req.body;

    const id = req.user.id;

    if (!(title || taskDescription || taskReference || status)) {
        return res.status(404).json({
            success: false,
            message: "these fields are required!",
        });
    }

    const user = await userModel.findById(id);

    if (!user) {
        return res.status(404).json({
            success: false,
            message: "User not found!",
        });
    }

    const refTask = await taskModel.findOne({ taskTitle: taskReference });

    const subTask = await subTaskModel.create({
        title,
        taskDescription,
        status,
        taskReference: refTask._id,
        createdBy: user._id,
    });

    res.status(200).json({
        success: true,
        message: "SubTask Created Successfully",
        data: {
            subTask,
        },
    });
};

// GetSubTask By Task API Completed
const getAllSubTaskByTask = async (req, res) => {
    const id = req.params.id;

    if (!id) {
        return res.status(404).json({
            success: false,
            message: "task Id not found for subTask!",
        });
    }

    const refTask = await subTaskModel.find({ taskReference: id });

    if (!refTask) {
        return res.status(404).json({
            success: false,
            message: "Reference Task not Found for subTask!",
        });
    }

    res.status(200).json({
        success: true,
        message: "SubTask Fetch Successfully!",
        data: {
            refTask,
        },
    });
};

// Update Subtask API Completed
const updateSubTask = async (req, res) => {
    const { title, taskDescription } = req.body;
    const id = req.params.id

    if (!id) {
        return res.status(404).json({
            success: false,
            message: "SubTask Id not found!",
        });
    }

    if (!(title || taskDescription)) {
        return res.status(404).json({
            success: false,
            message: "these fields are required!",
        });
    }

    const subTask = await subTaskModel.findByIdAndUpdate(
        id,
        {
            title,
            taskDescription,
        },
        {
            returnDocument: "after",
        }
    );

    res.status(200).json({
        success : true,
        message : "Subtask Updated Successfully!",
        data : {
            subTask
        }
    })
};


const updateSubTaskStatus = async (req ,res) => {
    const {status} = req.body
    const id = req.params.id

    if(!id){
        return res.status(404).json({
            success : false,
            message : "SubTask Id not found!"
        })
    }

    const subTask = await subTaskModel.findById(id)

    if(!subTask){
        return res.status(404).json({
            success : false,
            message : "task not found!"
        })
    }

    subTask.status = status

    await subTask.save()

    res.status(200).json({
        success : true,
        message : "subTask Updated Successfully!",
        data : {
            subTask
        }
    })
}

// Delete Task API Completed
const deleteSubTask = async (req ,res) => {
    const id = req.params.id

    if(!id){
        return res.status(404).json({
            success : false,
            message : "subTask Id not found!"
        })
    }

    const subTask = await subTaskModel.findByIdAndDelete(id)

    res.status(200).json({
        success : true,
        message : "subTask Deleted Successfully!",
        data : {
            subTask
        }
    })
}

export { 
    createSubTask, 
    getAllSubTaskByTask,
    updateSubTask,
    updateSubTaskStatus,
    deleteSubTask
};
