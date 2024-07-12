import {express,responseHandler,httpCodes} from '../../exports.js';
const notesRoutes = express.Router();
notesRoutes.get("/", (req, res) => {
    return responseHandler(
        res,
        {
            message: "Hello from notes",
        },
        httpCodes.OK_200
    );
});
export default notesRoutes;