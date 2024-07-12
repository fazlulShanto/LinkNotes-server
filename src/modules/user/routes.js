import {express,expressAsyncHandler} from '../../exports.js';

import { handleForgotPassword, handleUserLogin, handleUserSignup, userApiHealthCheck } from './controller.js';
import { signUpRequestValidator,loginRequestValidator } from './utils.js';

const userRoutes = express.Router();

userRoutes.get("/", expressAsyncHandler(userApiHealthCheck));

userRoutes.post("/log-in",loginRequestValidator, expressAsyncHandler(handleUserLogin));

userRoutes.post("/sign-up",signUpRequestValidator,expressAsyncHandler(handleUserSignup));

userRoutes.post("/forgot-password",expressAsyncHandler(handleForgotPassword));

export default userRoutes;