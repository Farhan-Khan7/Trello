import mongoose, { Schema } from "mongoose";
import { TaskStatusEnum, AvailableTaskStatus } from "../utils/constant.js";

const TaskSchema = new Schema(
    {
        taskTitle: {
            type: String,
            require: [true, "Task title is required!"],
        },
        taskDescription: {
            type: String,
            require: [true, "Task Description is required!"],
        },
        projectReference: {
            type: Schema.Types.ObjectId,
            ref: "Project",
        },
        assignToUser: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        assignBy: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        taskStatus: {
            type: AvailableTaskStatus,
            default: TaskStatusEnum.TODO,
        },
        attachments: {
            type: [
                {
                    url: String,
                    size: Number,
                },
            ],
            default: [],
        },
    },
    {
        timestamps: true,
    }
);

const taskModel = mongoose.model("Task", TaskSchema);

export default taskModel;
