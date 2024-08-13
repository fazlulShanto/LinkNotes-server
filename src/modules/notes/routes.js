import { express, responseHandler, httpCodes } from "../../exports.js";
import {
    handleCreateNewNote,
    handleDeleteNotes,
    handleGetAllNotes,
    getUserPinnedNote,
    handleNotePinToggle
} from "./controller.js";
import { validators } from "./utils.js";
const notesRoutes = express.Router();

notesRoutes.get("/", handleGetAllNotes);

notesRoutes.post("/", validators.createNewNoteValidator, handleCreateNewNote);

notesRoutes.delete("/", handleDeleteNotes);

notesRoutes.get("/pinned-notes", getUserPinnedNote);

notesRoutes.get("/toggle-pin", handleNotePinToggle);



export default notesRoutes;
