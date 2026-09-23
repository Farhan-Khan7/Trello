import projectModel from "../models/Project.models.js";
import userModel from "../models/User.models.js";

// Create Project API Completed
const createproject = async (req, res) => {
    const { title, description } = req.body;

    if (!title || !description) {
        return res.status(404).json({
            success: false,
            message: "title and description are required!",
        });
    }

    const project = await projectModel.create({
        title,
        description,
        createdBy: req.user._id,
    });

    return res.status(201).json({
        success: true,
        message: "Project Create Successfully!",
        data: {
            title,
        },
    });
};

// Get All Projects API Completed
const getAllProjects = async (req, res) => {
    const project = await projectModel.find().populate("createdBy", "userName");

    res.status(200).json({
        success: true,
        message: "projects fethch successfully!",
        data: {
            project,
        },
    });
};

// Get ProjectByID API Completed
const getProjectById = async (req, res) => {
    const id = req.params.id;
    console.log(id);
    const project = await projectModel.findById(id);

    console.log(project);

    if (!project) {
        return res.status(404).json({
            success: false,
            message: "Project Not Found!",
        });
    }

    res.status(200).json({
        success: true,
        message: "Project Fetched Successfully!",
        data: {
            project,
        },
    });
};

// Update Project API Completed
const updateProject = async (req, res) => {
    const { title, description } = req.body;
    const id = req.params.id;

    if (!(title || description)) {
        return res.status(404).json({
            success: false,
            message: "these fields are required",
        });
    }

    const updateProject = await projectModel.findByIdAndUpdate(
        id,
        {
            title,
            description,
        },
        {
            returnDocument: "after"
        }
    );

    res.status(201).json({
        success: true,
        message: "Project Updated Successfully!",
        data: {
            updateProject,
        },
    });
};

const deleteProject = async (req , res) => {
    const id = req.params.id

    const deleteProject = await projectModel.findByIdAndDelete(id)

    if(!deleteProject){
        return res.status(404).json({
            success : false,
            message : "deleted Project ID not found!"
        })
    }

    res.status(200).json({
        success : true,
        message : "Project Deleted Successfully!",
        data : {
            deleteProject
        }
    })
}

export { createproject, getAllProjects, getProjectById , updateProject , deleteProject};
