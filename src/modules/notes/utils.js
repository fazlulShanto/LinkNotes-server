import { expressValidator } from "../../exports.js";
import  schemaValidatorMiddleware  from "../../middlewares/schemaValidator.js";

const { body } = expressValidator;
export const createNewNoteValidator = [
    body("noteTitle").not().isEmpty().withMessage("noteTitle is required"),
    body("type").not().isEmpty().withMessage("Note type is required"),
    body("noteContent").not().isEmpty().withMessage("noteContent a valid email"),
    schemaValidatorMiddleware
];

export const validators = {
    createNewNoteValidator,
};