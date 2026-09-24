import mongoose, { Schema } from "mongoose";

const projectNotesSchema = new Schema(
    {
        notes: {
            type: String,
            required: true,
        },
        projectReference: {
            type: Schema.Types.ObjectId,
            ref: "Project",
        },
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        isSolved : {
            type: Boolean,
            default: false,
        },
        createdOn: {
            type: Date,
        },
    },
    {
        timestamps: true,
    }
);

const projectNotesModel = mongoose.model("ProjectNote", projectNotesSchema)

export default projectNotesModel