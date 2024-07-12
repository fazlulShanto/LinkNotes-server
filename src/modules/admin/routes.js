import {express,responseHandler,httpCodes} from '../../exports.js';

const adminRoutes = express.Router();
adminRoutes.get("/", (req, res) => {
    return responseHandler(
        res,
        {
            message: "Hello from admin",
        },
        httpCodes.OK_200
    );
});
export default adminRoutes;