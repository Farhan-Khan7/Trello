import projectModel from "../models/Project.models.js";
import projectMemberModel from "../models/ProjectMember.models.js";
import userModel from "../models/User.models.js";


// Add member Post request Completed
const addMember = async (req, res) => {
    const { email, project, role } = req.body;

    if (!email) {
        return res.status(400).json({
            success: false,
            message: "User email is required!",
        });
    }

    // 2. Project check
    if (!project) {
        return res.status(400).json({
            success: false,
            message: "Project is required!",
        });
    }

    const user = await userModel.findOne({ email });

    if (!user) {
        return res.status(404).json({
            success: false,
            message: "User not found!",
        });
    }

    const refproject = await projectModel.findOne({ title: project });

    if (!refproject) {
        return res.status(404).json({
            success: false,
            message: "Project not found!",
        });
    }

    const member = await projectMemberModel.create({
        user: user._id,
        project: refproject._id,
        role: role,
    });

    return res.status(200).json({
        success: true,
        message: "Member added successfully!",
        data: {
            member,
        },
    });
};


// Get Member by Project Id
const getMemberById = async (req , res) => {
    const id = req.params.id

    const findProject = await projectMemberModel.find({project : id})

    if(!findProject){
        return res.status(404).json({
            success : false,
            message : "Project not Found!"
        })
    }


    res.status(200).json({
        success : true,
        message : "Projects find Successfully!",
        data : {
            findProject
        }
    })
}


// delete member Post request Completed
const deleteMember = async (req , res) => {
    const id = req.params.id

    if(!id){
        return res.status(404).josn({
            success : false,
            message : "deleted user ID not found!"
        })
    }

    const deletedMember = await projectMemberModel.findByIdAndDelete(id)

    if(!deletedMember){
        return res.status(404).json({
            success : false,
            message : "deleted Member not found!"
        })
    }

    res.status(200).json({
        success : true,
        message : "User Delete Successfully!",
        data : {
            deletedMember
        }
    })


    
}


export { addMember , deleteMember , getMemberById };
