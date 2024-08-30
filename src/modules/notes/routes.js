import { express, responseHandler, httpCodes } from "../../exports.js";
import {
    handleCreateNewNote,
    handleDeleteNotes,
    handleGetAllNotes,
    getUserPinnedNote,
    handleNotePinToggle,
    handleCheckboxItemToggle,
    handleUPdateSingleNote,
    handleNoteFilterRoutes,
} from "./controller.js";
import { validators } from "./utils.js";
const notesRoutes = express.Router();

notesRoutes.get("/", handleGetAllNotes);

notesRoutes.post("/", validators.createNewNoteValidator, handleCreateNewNote);

notesRoutes.delete("/", handleDeleteNotes);

notesRoutes.put("/:noteId", handleUPdateSingleNote);

notesRoutes.get("/pinned-notes", getUserPinnedNote);

notesRoutes.patch("/toggle-pin", handleNotePinToggle);

notesRoutes.get('/filter',handleNoteFilterRoutes)

notesRoutes.patch(
    "/toggle-checkbox-item",
    validators.toggleCheckboxItemValidator,
    handleCheckboxItemToggle
);

export default notesRoutes;
