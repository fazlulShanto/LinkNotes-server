import {express,responseHandler,httpCodes} from '../../exports.js';
import { handleCreateNewNote, handleDeleteNotes, handleGetAllNotes} from './controller.js';
import {validators} from './utils.js'
const notesRoutes = express.Router();

notesRoutes.get("/",handleGetAllNotes);

notesRoutes.post("/", validators.createNewNoteValidator, handleCreateNewNote);

notesRoutes.delete('/',handleDeleteNotes);

export default notesRoutes;