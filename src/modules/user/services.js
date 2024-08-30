import { UserModel,genericUtils, httpCodes } from "../../exports.js";
import { getRandomAvatarUrl } from "./utils.js";


export const createNewUser = async ({
    firstName,
    lastName,
    email,
    password,
}) => {
    const hashPassword = genericUtils.hashPassword(password);
    const avatarUrl = await getRandomAvatarUrl();
    try {
        const user = new UserModel({
            firstName,
            lastName,
            email,
            avatarUrl:avatarUrl,
            password: hashPassword,
        });
        await user.save();
        return user;
    } catch (error) {
        throw error;
    }
};


export const handleUserLoginService = async ({ email, password }) => {
    try {
        const user = await UserModel.findOne({ email }).select("+password");
        if (!user) {
            throw {
                status : httpCodes.BAD_REQUEST_400,
                message : "User not found"
            };
        }
        const isMatch = genericUtils.comparePassword(password, user.password);
        if (!isMatch) {
            throw {
                status : httpCodes.BAD_REQUEST_400,
                message : "Invalid password"
            };
        }
        // generate jwt token
        const tokenObject = {
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            isAdmin: user.isAdmin || false,
            userId: user._id,
            avatarUrl : user.avatarUrl,
            pinnedNotes:user.pinned_note
        };
        const token = genericUtils.signWithJWT(tokenObject);
        return {userData: tokenObject,token};
    } catch (error) {
        throw error;
    }
};