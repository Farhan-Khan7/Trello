import mongoose , {Schema} from "mongoose";
import {TaskStatusEnum , AvailableTaskStatus} from "../utils/constant.js"

const TaskSchema = new Schema({
    taskTitle : {
        type : String,
        require : [true , "Task title is required!"]
    },
    taskDescription : {
        type : String,
        require : [true , "Task Description is required!"]
    },
    projectReference : {
        type : Schema.Types.ObjectId,
        ref : "projectModel"
    },
    assginToUser : {
        type : Schema.Types.ObjectId,
        ref : "userModel"
    },
    assginBy : {
        type : Schema.Types.ObjectId,
        ref : "userModel"
    },
    taskStatus : {
        type : AvailableTaskStatus,
        default : TaskStatusEnum.TODO
    },
    attachments : {
        type : [{
            url : String,
            size : Number,
        }],
        default : []
    },
    createdOn : {
        type : Date,
        require : [true , "Created date is required"]
    },
    updatedOn : {
        type : Date,
        require : [true , "Update date is required "]
    }
})

const TaskModel = Schema.model("Task" , TaskSchema)


export default TaskModel