import { expressValidator } from "../../exports.js";
import  schemaValidatorMiddleware  from "../../middlewares/schemaValidator.js";

const { body,query } = expressValidator;
export const createNewNoteValidator = [
    body("noteTitle").not().isEmpty().withMessage("noteTitle is required"),
    body("type").not().isEmpty().withMessage("Note type is required"),
    body("noteContent").not().isEmpty().withMessage("noteContent a valid email"),
    schemaValidatorMiddleware
];
export const toggleCheckboxItemValidator = [
    query("noteId").not().isEmpty().withMessage("noteId is required"),
    query("itemId").not().isEmpty().withMessage("itemId is required"),
    query("isChecked").not().isEmpty().withMessage("item's status is required"),
    schemaValidatorMiddleware
];

export const validators = {
    createNewNoteValidator,
    toggleCheckboxItemValidator
};