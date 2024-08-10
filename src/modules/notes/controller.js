import expressAsyncHandler from "express-async-handler";
import {express,responseHandler,httpCodes} from '../../exports.js';
import { createNewNoteService,deleteNotes,getAllNotesService } from "./services.js";

export const handleCreateNewNote = expressAsyncHandler( async (req,res)=>{
    const data = req.body;
    const newNote = await createNewNoteService({...data,userId:req.userInfo.userId});
    return responseHandler(res,{message:'note created', data: newNote},httpCodes.CREATED_201);
});

export const handleGetAllNotes = expressAsyncHandler( async (req,res)=>{
    const {start,limit} = req.query;
    const notes = await getAllNotesService({start,limit,userId:req.userInfo.userId});
    return responseHandler(res,{notes},httpCodes.OK_200);
})
export const handleDeleteNotes = expressAsyncHandler( async (req,res)=>{
    const noteIds = req.body?.noteIds ?? [];
    const result = await deleteNotes(noteIds);
    return responseHandler(res,{result},httpCodes.OK_200);
})