const dbModelNames = {
    user: "User",
    note: "Note",
    admin: "Admin"
}
export const ageTime = 3 * 24 * 60 * 60 * 1000;

export const jwtOptions = {
    httpOnly: true,
    sameSite: "None",
    secure: true,
    maxAge: ageTime, // 3 day
};

export const cookieOptions = {
    httpOnly: true,
    sameSite: "None",
    secure: true,
    maxAge: ageTime, // 3 day
};

export const CORS_CONFIG = {
    origin: true,
    credentials: true,
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
};

export const refreshTokenTime = "3d";

export default {dbModelNames, ageTime,jwtOptions,CORS_CONFIG,refreshTokenTime,cookieOptions};