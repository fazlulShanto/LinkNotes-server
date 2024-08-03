import NoteModel from "../../models/NotesModel.js";

export const createNewNoteService = async ({noteTitle,type,noteContent,userId}) => {
    const newNote = await NoteModel.create({    
        noteTitle,
        type,
        noteContent,
        user: userId
    });
    return newNote;
};

export const getAllNotesService = async ({start,limit,userId}) => {
    if(!start) start = 0;
    if(!limit) limit = 20;
    if(!userId) return [];
    const notes = await NoteModel.find({user:userId}).populate('user').skip(start).limit(limit);
    
    return notes;
}