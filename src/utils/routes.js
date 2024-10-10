import { Router } from "express";
import {
    httpCodes,
    responseHandler,
    constants,
    genericUtils,
} from "../exports.js";
import notesRoutes from "../modules/notes/routes.js";
import adminRoutes from "../modules/admin/routes.js";
import userRoutes from "../modules/user/routes.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import { createUploadthing, createRouteHandler } from "uploadthing/express";
import { UploadThingError } from "uploadthing/server";

const uploadthing = createUploadthing({
    errorFormatter: (err) => {
        console.log(err);
        return { message: "Something went wrong, please try again!" };
    },
});

const appRoutes = new Router();

export const uploadthingRouter = {
    imageUploader: uploadthing({
        image: {
            maxFileSize: "512KB",
            maxFileCount: 1,
            acl: "public-read",
        },
    })
        .middleware(async ({ req, res, event }) => {
            let token = req.cookies?.token;
            if (!token) {
                token = req.headers?.token;
            }
            if (!token) {
                throw new UploadThingError("unauthorized!");
            }
            const user = genericUtils.decodeJWT(token);
            if (!user)
                throw new UploadThingError(
                    "You must be logged in to upload a profile picture"
                );
            return { userId: user?.userId };
        })
        .onUploadComplete((e) => {
            console.log("uploaded Files🔥", e);
        }),
};

appRoutes.use(
    "/uploadthing",
    createRouteHandler({
        router: uploadthingRouter,
        config: {
            logLevel: "Error",
        },
    })
);

appRoutes.get("/health-check", (req, res) => {
    return responseHandler(
        res,
        {
            message: "Server is up and running",
        },
        httpCodes.OK_200
    );
});

appRoutes.use("/user", userRoutes);

appRoutes.use(authMiddleware); //🛑 protect routes starts

appRoutes.use("/notes", notesRoutes);

appRoutes.use("/admin", adminRoutes);

appRoutes.all("*", (req, res) => {
    return responseHandler(
        res,
        {
            message: "Page not found",
        },
        httpCodes.NOT_FOUND_404
    );
});

export default appRoutes;
