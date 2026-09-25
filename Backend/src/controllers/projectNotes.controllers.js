import projectNotesModel from "../models/ProjectNote.models.js";
import projectModels from "../models/Project.models.js";
import userModel from "../models/User.models.js";

// create projects Note API Completed
const createProjectNote = async (req, res) => {
    const { notes, projectReference } = req.body;
    const id = req.user.id;
    if (!notes) {
        return res.status(404).json({
            success: false,
            message: "notes is reqired!",
        });
    }

    const projectId = await projectModels.findOne({ title: projectReference });

    if (!projectId) {
        return res.status(404).json({
            success: false,
            message: "Project ID not found!",
        });
    }

    const user = await userModel.findById(id);

    if (!user) {
        return res.status(404).json({
            success: false,
            message: "user not found!",
        });
    }

    const projectNote = await projectNotesModel.create({
        notes,
        projectReference: projectId._id,
        createdBy: user._id,
    });

    res.status(200).json({
        success: true,
        message: "Projects Notes Created Successfully!",
    });
};

// Get All Project Notes By Projects Completed
const getAllProjectNotesByProjects = async (req, res) => {
    const id = req.params.id;

    if (!id) {
        return res.status(404).json({
            success: false,
            message: "Project Notes ID not found!",
        });
    }

    const projectNotes = await projectNotesModel.find({ projectReference: id });

    if (!projectNotes) {
        return res.status(404).json({
            success: false,
            message: "projects note not found!",
        });
    }

    res.status(200).json({
        success: true,
        message: "Project Notes Fetched Successfully!",
        data : {
            projectNotes
        }
    });
};

// Update Projects Notes API Completed
const updateProjectNotes = async (req , res) => {
    const { notes } = req.body
    const id = req.params.id

    if(!id){
        return res.status(404).json({
            success : false,
            message : "notes id not found"
        })
    }

    const updateNote = await projectNotesModel.findByIdAndUpdate(
        id,
        {
            notes
        },
        {
            returnDocument : "after"
        }
    )


    res.status(200).json({
        success : true,
        message : "Note Update Successfully!",
        data : {
            updateNote
        }
    })


}

// completed Projects Notet API Done
const completedProjectNote = async (req, res) => {
    const id = req.params.id;

    if (!id) {
        return res.status(404).json({
            success: false,
            message: "Note ID not found!",
        });
    }

    const completedProjectNotes = await projectNotesModel.findById(id);

    if (!completedProjectNotes) {
        return res.status(404).json({
            success: false,
            message: "Project Nots does not found!",
        });
    }

    completedProjectNotes.isSolved = true;

    await completedProjectNotes.save();

    res.status(200).json({
        success: true,
        message: "Project Completed Successfully!",
        data: {
            completedProjectNotes,
        },
    });
};

// delete projects Note API Completed
const deleteProjectNote = async (req, res) => {
    const id = req.params.id;

    if (!id) {
        return res.status(404).json({
            success: false,
            message: "Note ID not found!",
        });
    }

    const deletedProjectNote = await projectNotesModel.findByIdAndDelete(id);

    res.status(200).json({
        success: true,
        message: "Note Deleted Successfully!",
        data: {
            deletedProjectNote,
        },
    });
};

export { createProjectNote, deleteProjectNote, completedProjectNote, getAllProjectNotesByProjects, updateProjectNotes };
