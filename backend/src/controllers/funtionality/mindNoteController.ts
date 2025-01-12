import { NextFunction, Request, Response } from "express";
import { catchAsyncErrors } from "../../middlewares/catchAsyncErrors";
import Content from "../../models/Content";

export const getAllNotesController = catchAsyncErrors(async(req:Request,res:Response,next:NextFunction) => {
    
    //hit db 
    //get all notes from content

    const allNotes = await Content.find();

    res.status(200).json({
        success:true,
        message:"All Notes",
        data:allNotes
    })
})
export const postNewNoteController = catchAsyncErrors(async(req:Request,res:Response,next:NextFunction) => {
    
    

    res.status(200).json({
        success:true,
        message:"All Notes",
        // data:allNotes
    })
})