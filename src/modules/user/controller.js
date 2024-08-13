import { httpCodes, responseHandler, configs, genericUtils} from "../../exports.js";
import { createNewUser, handleUserLoginService } from "./services.js";
const { cookieOptions } = configs;
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
        ...result,
    };
    res.cookie('token', result.token, cookieOptions );

    return responseHandler(res, responseData, httpCodes.OK_200);
};

export const handleMeRoute = async (req, res) => {
    const user = req.userInfo;
    const responseData = {
        message: `User logged in with email ${user.email}`,
        userData: user,
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


export const handleLogOut = async (req,res)=>{
    const cookies = req.cookies;
    Object.keys(cookies).map( v => res.clearCookie(v));
    responseHandler(res,{},httpCodes.OK_200)
}