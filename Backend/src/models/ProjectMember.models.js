import mongoose , {Schema} from "mongoose";
import {UserRoleEnum , AvailableUserRoles} from "../utils/constant.js"


const projectMemberSchema = new Schema({
    user : {
        type : Schema.Types.ObjectId,
        ref : "userModel"
    },
    project : {
        type : Schema.Types.ObjectId,
        ref : "projectModel"
    },
    role : {
        type : String,
        enum : AvailableUserRoles,
        default : UserRoleEnum.MEMBER
    }
})

const projectMemberSchemaModel = mongoose.model("ProjectMember" , projectMemberSchema)

export default projectMemberSchemaModel