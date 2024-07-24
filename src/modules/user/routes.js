import {express,expressAsyncHandler} from '../../exports.js';
import authMiddleware from '../../middlewares/authMiddleware.js';

import { handleForgotPassword, handleUserLogin, handleUserSignup, userApiHealthCheck,handleMeRoute,handleLogOut } from './controller.js';
import { signUpRequestValidator,loginRequestValidator } from './utils.js';

const userRoutes = express.Router();

userRoutes.get("/", expressAsyncHandler(userApiHealthCheck));
userRoutes.get("/me", authMiddleware ,expressAsyncHandler(handleMeRoute));

userRoutes.post("/log-in",loginRequestValidator, expressAsyncHandler(handleUserLogin));

userRoutes.post("/sign-up",signUpRequestValidator,expressAsyncHandler(handleUserSignup));

userRoutes.post("/forgot-password",expressAsyncHandler(handleForgotPassword));
userRoutes.get('/log-out',expressAsyncHandler(handleLogOut))

export default userRoutes;