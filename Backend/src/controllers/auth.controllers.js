import config from "../config/config.js";
import userModel from "../models/User.models.js";
import ApiError from "../utils/api-errors.js";
import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";
import { verifyAccessToken, verifyRefreshToken } from "../utils/auth.js";
// import ApiResponse from "../utils/api-response.js"

// Register User API Completed
const registerUser = async (req, res) => {
    const { userName, email, password , role } = req.body;

    if (!userName || !email || !password || !role) {
        throw new ApiError(404, "userName Email & Password are required!");
    }

    const existingUser = await userModel.findOne({
        $or: [{ email, userName }],
    });

    if (existingUser) {
        return res.status(400).json({
            success: false,
            message: "User is exist with this email !",
        });
    }

    const user = await userModel.create({
        userName,
        email,
        password,
        role
    });
    console.log(user)
    const { accessToken, refreshToken } = await user.generateTokens();
    const { verificationToken, expiresAt } = await user.generateEmailVerificationToken();


    user.role = role;
    user.emailVerficationToken = verificationToken;
    user.emailVerficationExpires = expiresAt;

    user.refreshToken = refreshToken;

    res.cookie("refreshToken", refreshToken, { httpOnly: true });

    await user.save({ validateBeforeSave: false });

    const transporter = nodemailer.createTransport({
        host: config.MAILTRAP_HOST,
        port: config.MAILTRAP_PORT,
        secure: false,
        auth: {
            user: config.MAILTRAP_USER,
            pass: config.MAILTRAP_PASS,
        },
    });

    const mailOptions = {
        from: config.MAILTRAP_SENDER,
        to: user.email,
        subject: `Please Verfiy your email `,
        text: `${config.BASE_URL}/api/v1/auth/profileverify/${user.emailVerficationToken}`,
    };

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            return console.log(`Email not sent to ${user.userName}`);
        } else {
            return console.log(`Email sent to ${user.userName} \n ${info.messageId}`);
        }
    });

    res.status(201).json({
        success: true,
        message: "User Registered Successfully !",
        data: {
            user: {
                name: user.userName,
                email: user.email,
            },
        },
        accessToken,
        verificationToken,
    });
};

// profileVerify User API Completed
const profileverify = async (req, res) => {
    const { emailVerficationToken } = req.params;

    console.log(emailVerficationToken);

    if (!emailVerficationToken) {
        return res.status(401).json({
            success: false,
            message: "invalid token!",
        });
    }

    const user = await userModel.findOne({ emailVerficationToken });

    if (!user) {
        return res.status(401).json({
            success: false,
            message: "User not Found!",
        });
    }

    if (!user.emailVerficationExpires || user.emailVerficationExpires < new Date()) {
        return res.status(401).json({
            success: false,
            message: "Token in Expired!",
        });
    }

    user.isEmailVerified = true;
    user.emailVerficationToken = undefined;
    user.emailVerficationExpires = undefined;

    await user.save();

    res.status(200).json({
        success: true,
        message: "Profile verify successfully!",
    });
};

// get-me User API Completed
const me = async (req, res) => {
    const accessToken = req.headers.authorization.split(" ")[1];

    if (!accessToken) {
        return res.status(401).json({
            success: false,
            message: "invalid or unauthorized token !",
        });
    }

    try {
        const decode = verifyAccessToken(accessToken);

        const user = await userModel.findById(decode.id);

        return res.status(200).json({
            success: true,
            message: "user fetch successfully!",
            data: {
                user: {
                    name: user.userName,
                    email: user.email,
                },
            },
        });
    } catch (err) {
        res.status(401).json({
            message: "Unauthorized , invalid or expired token",
        });
    }

    // return res.status(200).json({
    //     success: true,
    //     message: "Profile fetch successfully !",
    // });
};

// Token Generate API Completed
const refresh = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
        return res.status(401).json({
            message: "unauthorized , refresh token not found!",
        });
    }

    try {
        const decode = verifyRefreshToken(refreshToken);

        const user = await userModel.findById(decode.id);

        if (refreshToken !== user.refreshToken) {
            user.refreshToken = null;
            await user.save();

            return res.status(401).json({
                message: "unauthorized , refresh token mismatch!",
            });
        }

        const { accessToken, refreshToken: newRefreshToken } = user.generateTokens();

        res.cookie("refreshToken", newRefreshToken, { httpOnly: true });
        ((user.refreshToken = newRefreshToken), await user.save());

        res.status(200).json({
            message: "Token refreshed successfully!",
            accessToken,
        });
    } catch (err) {
        return res.status(401).json({
            success: false,
            message: "unauthorized , token not found",
        });
    }
};

// login User API completed
const loginUser = async (req, res) => {
    const { userName, email, password } = req.body;

    if (!(userName || email || password)) {
        return res.status(401).json({
            success: false,
            message: "username or email and passwrod are required",
        });
    }

    const user = await userModel.findOne({
        $or: [{ userName }, { email }],
    });

    if (!user) {
        return res.status(401).json({
            success: false,
            message: "user not found!",
        });
    }

    if (user.isEmailVerified) {
        const ispassword = await bcrypt.compare(password, user.password);

        if (!ispassword) {
            return res.status(401).json({
                success: false,
                message: "password incorrect!",
            });
        }

        if (userName === user.userName || email === user.email) {
            const { accessToken, refreshToken: newRefreshToken } = user.generateTokens();

            res.cookie("refreshToken", newRefreshToken);
            user.refreshToken = newRefreshToken;
            user.isLoggedIn = true;
            await user.save();

            return res.status(200).json({
                success: true,
                message: "User LoggedIn successfully",
                accessToken,
            });
        }
    } else {
        return res.status(401).json({
            success: false,
            message: "email not verified!",
        });
    }

    res.status(200).json({
        success: true,
        message: "User LoggedIn successfully",
    });
};

// logout  User API completed
const logoutUser = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;


    if (!refreshToken) {
        return res.status(401).json({
            success: false,
            message: "unauthorized token",
        });
    }

    const decode = verifyRefreshToken(refreshToken);

    const user = await userModel.findById(decode.id);

    
    if (!user) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error!",
        });
    }

    user.refreshToken = undefined;
    user.isLoggedIn = false;
    res.clearCookie("refreshToken", { httpOnly: true });

    await user.save();

    res.status(200).json({
        success: true,
        message: "Logout Successfully!",
    });
};
export { registerUser, profileverify, me, refresh, loginUser, logoutUser };
