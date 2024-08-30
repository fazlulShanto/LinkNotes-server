import mongoose from "mongoose";
import NoteModel, { _filterNotes } from "../../models/NotesModel.js";
import { UserModel } from "../../exports.js";

export const createNewNoteService = async ({
    noteTitle,
    type,
    noteContent,
    userId,
    tags,
}) => {
    const newNote = await NoteModel.create({
        noteTitle,
        type,
        noteContent,
        tags,
        user: userId,
    });
    return newNote;
};

export const getAllNotesService = async ({ start, limit, userId }) => {
    if (!start) start = 0;
    if (!limit) limit = 20;
    if (!userId) return [];
    const notes = await NoteModel.find({ user: userId })
        .skip(start)
        .limit(limit);
    // const notes = await NoteModel.find({user:userId}).populate('user').skip(start).limit(limit);

    return notes;
};

export const deleteNotes = async (noteIds = []) => {
    const validIds = noteIds.filter((id) =>
        mongoose.Types.ObjectId.isValid(id)
    );

    const result = await NoteModel.deleteMany({ _id: { $in: validIds } });

    return {
        deletedCount: result.deletedCount,
        message: `${result.deletedCount} note(s) deleted successfully`,
    };
};

export const findSingleUserPinnedNotes = async (userId) => {
    if (!userId) {
        return [];
    }
    const pinnedNotes = await UserModel.findOne({ _id: userId })
        .select("pinned_note")
        .populate("pinned_note");
    return pinnedNotes;
};

export const toggleNotesPin = async ( noteId,status=false) => {
    if (!noteId) {
        return false;
    }
    try {
        await NoteModel.findByIdAndUpdate(
            noteId,
            { $set: { isPinned: status } },
            { timestamps: false }
        );
        return true;
    } catch (error) {
        console.error("Error toggling item:", new Error(error).message);
        return true;
    }
};
export const toggleSingleCheckboxItem = async ( noteId,itemId,status=false) => {
    status = status === 'false' ? false : true;
    try {
        const updated = await NoteModel.findOneAndUpdate(
            { _id: noteId, 'noteContent.value.id':itemId},
            {
              $set: {
                'noteContent.value.$.isChecked': !status, 
              }
            },{
                new: true
            }
        );
        return updated;
    } catch (error) {
        console.error("Error toggling item:", new Error(error).message);
        return true;
    }
};

export const  editSingleNoteData = async (noteId, noteData={})=>{
    try {
        const result = await NoteModel.findByIdAndUpdate(noteId,noteData,{new : true});
        return result;
    } catch (error) {
        throw new Error('Failed to update note with id',noteId);
    }
};

export const filterNotes = async (filterObject,userId)=>{
    const filterQuery = _filterNotes(filterObject,userId);
    try {
        const result = await NoteModel.find(filterQuery);
        return {notes: result,filterQuery};
    } catch (error) {
        return {
            filterQuery
        }
    }
}