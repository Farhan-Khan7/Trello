import config from "../dbConnect/config.js";
import userModel from "../models/User.models.js";
import ApiError from "../utils/api-errors.js";
import nodemailer from "nodemailer";
// import ApiResponse from "../utils/api-response.js"

const registerUser = async (req, res) => {
    const { userName, email, password } = req.body;
    console.log("enter ho gaya controllers me !");

    console.log(userName, email, password, "\n");

    if (!userName || !email || !password) {
        throw new ApiError(404, "userName Email & Password are required!");
    }

    const existingUser = await userModel.findOne({
        $or: [{ email, userName }],
    });

    console.log(existingUser, "\n");

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
    });

    console.log(user, "\n");

    const { verificationToken, hashedToken, expiresAt } = await user.generateEmailVerificationToken();

    user.emailVerficationToken = hashedToken;
    user.emailVerficationExpires = expiresAt;

    console.log(user.emailVerficationToken, "\n");

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
        text: `${config.BASE_URL}//api/v1/auth/profileverfiy${verificationToken}`,
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
    });
};

export { registerUser };
