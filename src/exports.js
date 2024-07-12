import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from 'cookie-parser';
import expressAsyncHandler from "express-async-handler";
import expressValidator,{validationResult} from "express-validator";
import mongoose from "mongoose";
//
import httpCodes from "./utils/httpCodes.js";
import expressApp from './expressApp.js'
import constants from "./utils/constants.js";
import configs from "./utils/configs.js";
import appRoutes from "./utils/routes.js";
import genericUtils from './utils/genericUtils.js';



import {
    responseHandler,
    errorResponseHandler,
} from "./utils/responseHandler.js";
import connectToMongoDB from "./utils/connectDB.js";

//db models
import UserModel from "./models/UserModel.js";
import  errorHanlderMiddleware  from "./middlewares/errorHander.js";
import schemaValidatorMiddleware from "./middlewares/schemaValidator.js";
// import NoteModel from "./models/NoteModel.js";

export {
    UserModel,
    // NoteModel,
    mongoose,
    expressAsyncHandler,
    httpCodes,
    schemaValidatorMiddleware,
    expressValidator,
    constants,
    configs,
    appRoutes,
    express,
    connectToMongoDB,
    cors,
    validationResult,
    cookieParser,
    dotenv,
    genericUtils,
    errorHanlderMiddleware,
    expressApp,
    responseHandler,
    errorResponseHandler,
};
