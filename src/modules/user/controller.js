import { httpCodes, responseHandler } from "../../exports.js";
import { createNewUser,handleUserLoginService } from "./services.js";

export const userApiHealthCheck = async (req, res) => {
    return res.status(httpCodes.OK_200).json({
        message: "User Api: Server is up and running",
    });
};

export const handleUserLogin = async (req, res) => {
    const { email, password } = req.body;
    const result = await handleUserLoginService({ email, password });
    const responseData = {
        message: `User logged in with email ${result.email}`,
        ...result
    };
    return responseHandler(res, responseData, httpCodes.OK_200);
};

export const handleUserSignup = async (req, res) => {
    //collect signup data
    const { firstName, lastName, email, password } = req.body;
    //create user
    const result = await createNewUser({
        firstName,
        lastName,
        email,
        password,
    });
    //send response
    const responseData = {
        message: `User created successfully with email ${result.email}`,
    };
    return responseHandler(res, responseData, httpCodes.OK_200);
};

export const handleForgotPassword = (req, res) => {
    return res.status(httpCodes.OK_200).json({
        message: "Forgot password successfull",
    });
};
