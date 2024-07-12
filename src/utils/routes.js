import { Router } from "express";
import { httpCodes, responseHandler } from "../exports.js";
import notesRoutes from "../modules/notes/routes.js";
import adminRoutes from "../modules/admin/routes.js";
import userRoutes from "../modules/user/routes.js";

const appRoutes = new Router();

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
