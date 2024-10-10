import { errorResponseHandler, genericUtils, httpCodes } from "../exports.js";
export const authMiddleware = (req, res, next) => {
    let token =  req.headers?.token;
    
    if (!token) {
        return errorResponseHandler(
            res,
            "unauthorized!",
            httpCodes.UNAUTHORIZED_401
        );
    }
    try {
        const decodedToken = genericUtils.decodeJWT(token);
        /**
         * info {
            email: 'test@gmail.com',
            firstName: 'Test',
            lastName: 'User',
            isAdmin: false,
            userId: '669d439bd05027768a97347e',
            iat: 1721582837,
            exp: 1722187637
            }
         */
        req.userInfo = decodedToken;
        next();
    } catch (error) {
        return errorResponseHandler(
            res,
            "unauthorized!",
            httpCodes.UNAUTHORIZED_401
        );
    }
};

export default authMiddleware;
