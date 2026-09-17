import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";
import config from "../dbConnect/config.js";
import JWT from "jsonwebtoken";


const userSchema = new Schema({
    avatar: {
        type: {
            url: String,
            localPath: String,
        },
        default: {
            url: "https://placehold.co/600x400",
            localPath: "",
        },
    },
    userName: {
        type: String,
        require: true,
        unique: true,
        trim: true,
        lowerCase: true,
    },
    email: {
        type: String,
        require: true,
        unique: true,
        trim: true,
        lowerCase: true,
    },
    password: {
        type: String,
        require: true,
        unique: true,
        trim: true,
        lowerCase: true,
    },
    isLoggedIn: {
        type: Boolean,
        default: false,
    },
    isEmailVerified: {
        type: Boolean,
        require: true,
        default : false
    },
    refreshToken: {
        type: String,
        require: true,
    },
    accessToken: {
        type: String,
        require: true,
    },
    forgetPasswordToken: {
        type: String,
        require: true,
    },
    forgetPasswordExpires: {
        type: Date,
        require: true,
    },
    resetPassword : {
        type : String,
        require : true
    },
    emailVerficationToken: {
        type: String,
        require: true,
    },
    emailVerficationExpires: {
        type: Date,
        require: true,
    },
});


// hashing password 
userSchema.pre("save", async (next) => {
    if (this.isModified(password)) {
        return next();
    } else {
        // I am just testing a result of return after that I replace return with next()

        return (this.password = await bcrypt.hash(this.password, 10));
    }
});

// For generation AccessToken
userSchema.methods.generateAccessTokena = function() {
    const accessToken = JWT.sign(
        {
            id: this._id,
        },
        config.ACCESS_TOKEN,
        {
            expiresIn: "1d",
        }
    );

    return accessToken
};

// For generation RefreshToken
userSchema.methods.generateRefreshToken = function() {
    const refreshToken = JWT.sign(
        {
            id: this._id,
        },
        config.REFRESH_TOKEN,
        {
            expiresIn: "1d",
        }
    );

    return refreshToken
};


const userModel = mongoose.model("User", userSchema);

export default userModel;
