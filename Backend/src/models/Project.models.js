import mongoose from "mongoose";
import monogoose, { Schema } from "mongoose";

const ProjectSchema = new Schema(
    {
        title: {
            type: String,
            require: true,
            unique: true,
        },
        description: {
            type: String,
            require: true,
        },
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: "userModel",
        },
        createdOn: {
            type: Date,
            require: true,
        },
    },
    {
        timestamps: true,
    }
);


const projectModel = Schema.model("Project" , ProjectSchema)


export default projectModel