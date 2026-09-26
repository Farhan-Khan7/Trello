import mongoose, { Schema } from "mongoose";

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
            ref: "User",
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


const projectModel = mongoose.model("Project" , ProjectSchema)


export default projectModel