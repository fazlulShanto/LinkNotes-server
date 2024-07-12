import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import envalid,{ cleanEnv } from "envalid";
const signWithJWT = (payload) => {
    if (!payload) {
        throw new Error("payload is required");
    }
    return jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
};
const decodeJWT = (token) => {
    if (!token) {
        throw new Error("token is required");
    }
    return jwt.verify(token, process.env.JWT_SECRET);
};

const hashPassword = (password) => {
    return bcrypt.hashSync(password, Number(process.env.BCRYPT_SALT_ROUND));
};

const comparePassword = (password, hash) => {
    return bcrypt.compareSync(password, hash);
};

const envSchema = {
    PORT: envalid.port(),
    JWT_EXPIRES_IN:envalid.str(),
    JWT_SECRET: envalid.str(),

    DB_USERNAME: envalid.str(),
    DB_PASSWORD: envalid.str(),
    DB_HOST: envalid.str(),
    DB_NAME: envalid.str(),

    BCRYPT_SALT_ROUND: envalid.num(),

    NODE_ENV: envalid.str({
        choices: ["dev", "production", "stage"],
    }),
};

export const envValidator = (env) => {
    cleanEnv(env, envSchema);
};

export default {
    signWithJWT,
    decodeJWT,
    hashPassword,
    envValidator,
    comparePassword,
};
