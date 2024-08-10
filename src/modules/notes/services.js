import mongoose from "mongoose";
import NoteModel from "../../models/NotesModel.js";

export const createNewNoteService = async ({noteTitle,type,noteContent,userId,tags}) => {

    const newNote = await NoteModel.create({    
        noteTitle,
        type,
        noteContent,
        tags,
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

export const deleteNotes = async (noteIds = [])=>{
    const validIds = noteIds.filter(id => mongoose.Types.ObjectId.isValid(id));

    const result = await NoteModel.deleteMany({ _id: { $in: validIds } });

    return {
      deletedCount: result.deletedCount,
      message: `${result.deletedCount} note(s) deleted successfully`
    };
};
