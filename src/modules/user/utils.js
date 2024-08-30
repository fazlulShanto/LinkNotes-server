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

export const getRandomAvatarUrl = async () => {
    try {
        const response = await fetch("https://randomuser.me/api/?inc=name");
        const data = await response.json();
        const seedId = data?.info?.seed ?? "555dbf94f08a7e58";
        const apiUrl = `https://robohash.org/${seedId}?set=set4&bgset=&size=120x120`;
        return apiUrl;
    } catch (error) {
        console.log("error", error);
        return `https://robohash.org/aece660d698d1035?set=set4&bgset=&size=120x120`;
    }
};
