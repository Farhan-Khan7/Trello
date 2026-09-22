import mongoose, { Schema } from "mongoose";
import { TaskStatusEnum, AvailableTaskStatus } from "../utils/constant.js";

const subTaskSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        taskDescription: {
            type: String,
            required: true,
        },
        taskReference: {
            type: Schema.Types.ObjectId,
            ref: "Task",
        },
        status: {
            type: AvailableTaskStatus,
            default: TaskStatusEnum.TODO,
        },
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: "userModel",
        },
    },
    { 
        timestamps: true 
    }
);


const subTaskModel = mongoose.model("SubTask", subTaskSchema);

export default subTaskModel;