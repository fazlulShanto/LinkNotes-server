import { errorResponseHandler, validationResult } from "../exports.js";

const schemaValidatorMiddleware = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        errorResponseHandler(res,errors.array());
    }
    next();
};
export default schemaValidatorMiddleware;