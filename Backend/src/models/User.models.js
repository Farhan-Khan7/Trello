import mongoose, { Schema } from "mongoose";
import crypto from "crypto";
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
        required: true,
        unique: true,
        trim: true,
        lowerCase: true,
    },
    fullName: {
        type: String,
        // required: true,
        unique: true,
        trim: true,
        lowerCase: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowerCase: true,
    },
    password: {
        type: String,
        required: true,
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
        required: true,
        default: false,
    },
    refreshToken: {
        type: String,
        // required: true,
    },
    accessToken: {
        type: String,
        // required: true,
    },
    forgetPasswordToken: {
        type: String,
        // required: true,
    },
    forgetPasswordExpires: {
        type: Date,
        // required: true,
    },
    resetPassword: {
        type: String,
        // required: true,
    },
    emailVerficationToken: {
        type: String,
        // required: true,
    },
    emailVerficationExpires: {
        type: Date,
        // required: true,
    },
});

// hashing password
userSchema.pre("save", async function () {

    if (!this.isModified("password")) {
        return;
    }
        // I am just testing a result of return after that I replace return with next()

        this.password = await bcrypt.hash(this.password, 10);
    
});

// For generation AccessToken
userSchema.methods.generateAccessTokena = function () {
    const accessToken = JWT.sign(
        {
            id: this._id,
        },
        config.ACCESS_TOKEN_SECRET,
        {
            expiresIn: "1d",
        }
    );

    return accessToken;
};

// For generation RefreshToken
userSchema.methods.generateRefreshToken = function () {
    const refreshToken = JWT.sign(
        {
            id: this._id,
        },
        config.REFRESH_TOKEN_SECRET,
        {
            expiresIn: "1d",
        }
    );

    return refreshToken;
};

// For email Verfication Token
userSchema.methods.generateEmailVerificationToken = async function () {
    
    const verificationToken = crypto.randomBytes(32).toString("hex");

    const hashedToken = await bcrypt.hash(verificationToken, 10);

    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    return {
        verificationToken,
        hashedToken,
        expiresAt
    }
};

const userModel = mongoose.model("User", userSchema);

export default userModel;
