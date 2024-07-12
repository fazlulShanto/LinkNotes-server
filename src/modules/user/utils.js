import { expressValidator } from "../../exports.js";

import  schemaValidatorMiddleware  from "../../middlewares/schemaValidator.js";
const { body } = expressValidator;
export const signUpRequestValidator = [
    body("firstName").not().isEmpty().withMessage("firstName is required"),
    body("lastName").not().isEmpty().withMessage("lastName is required"),
    body("email").isEmail().withMessage("Not a valid email"),
    body("password").not().isEmpty().withMessage("password is required"),
     schemaValidatorMiddleware
];

export const loginRequestValidator = [
    body("email").not().isEmpty().isEmail().withMessage("Not a valid email"),
    body("password").not().isEmpty().withMessage("password is required"),
    schemaValidatorMiddleware
];