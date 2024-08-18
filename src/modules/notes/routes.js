import { express, responseHandler, httpCodes } from "../../exports.js";
import {
    handleCreateNewNote,
    handleDeleteNotes,
    handleGetAllNotes,
    getUserPinnedNote,
    handleNotePinToggle,
    handleCheckboxItemToggle
} from "./controller.js";
import { validators } from "./utils.js";
const notesRoutes = express.Router();

notesRoutes.get("/", handleGetAllNotes);

notesRoutes.post("/", validators.createNewNoteValidator, handleCreateNewNote);

notesRoutes.delete("/", handleDeleteNotes);

notesRoutes.get("/pinned-notes", getUserPinnedNote);

notesRoutes.patch("/toggle-pin", handleNotePinToggle);

notesRoutes.patch(
    "/toggle-checkbox-item",
    validators.toggleCheckboxItemValidator,
    handleCheckboxItemToggle
);

export default notesRoutes;
