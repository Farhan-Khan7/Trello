import mongoose, { Schema } from "mongoose";

const projectNotesSchema = new Schema(
    {
        notes: {
            type: String,
            require: true,
        },
        projectReference: {
            type: Schema.Types.ObjectId,
            ref: "projectModel",
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

const projectNotesModel = Schema.model("ProjectNote", projectNotesSchema)

export default projectNotesModel