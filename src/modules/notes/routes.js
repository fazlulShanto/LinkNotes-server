import {express,responseHandler,httpCodes} from '../../exports.js';
import { handleCreateNewNote, handleGetAllNotes} from './controller.js';
import {validators} from './utils.js'
const notesRoutes = express.Router();

notesRoutes.get("/",handleGetAllNotes);

notesRoutes.post("/", validators.createNewNoteValidator, handleCreateNewNote);

export default notesRoutes;