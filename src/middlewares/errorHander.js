import { errorResponseHandler } from "../exports.js";
export const errorHanlderMiddleware = (error, req, res, next) => {
    const status = error.status || 500;
    const message = error.message || "Something went wrong";
    if (!res.headersSent) {
        console.log(`Error ❤️‍🔥 [${new Date().toLocaleTimeString()}]`, error?.cause || error?.message );    
        return errorResponseHandler(res,message, status);
    }
};



export default errorHanlderMiddleware;