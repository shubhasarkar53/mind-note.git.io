import { NextFunction, Request, Response } from "express";
import { catchAsyncErrors } from "../../middlewares/catchAsyncErrors";
import Content from "../../models/Content";
import ErrorHandler from "../../utills/Error";
import Link from "../../models/Link";
import { isCorrectIdFormat } from "../../utills/customErrorHelpers";

export const getAllNotesController = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    //hit db
    //get all notes from content

    const allNotes = await Content.find();

    res.status(200).json({
      success: true,
      message: "All Notes",
      notes: allNotes,
    });
  }
);
export const postNewNoteController = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const { link, type, title, text } = req.body;

    const newNote = new Content({
      link,
      type,
      title,
      text,
      // tags,
      userId: req.userId,
    });

    await newNote.save();

    res.status(200).json({
      success: true,
      message: "Note Added",
      note:newNote
    });
  }
);

export const patchNoteController = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const { link, type, title, text } = req.body;

    //should validate using zod

    const noteId = req.params.id;

    if (!noteId) {
      return next(new ErrorHandler("Note Id is required", 400));
    }

    isCorrectIdFormat(noteId, next);

    const note = await Content.findById(noteId);

    if (!note) {
      return next(new ErrorHandler("Note not found", 404));
    }

    const updates: Partial<typeof note> = {};

    if (link !== undefined) updates.link = link;
    if (type !== undefined) updates.type = type;
    if (title !== undefined) updates.title = title;
    if (text !== undefined) updates.text = text;

    const updatedNote = await Content.findByIdAndUpdate(noteId, updates, {
      runValidators: true,
      new: true,
    });

    res.status(200).json({
      success: true,
      message: "Note updated",
      data: updatedNote,
    });
  }
);

export const deleteNoteController = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const noteId = req.params.id;

    if (!noteId) {
      return next(new ErrorHandler("Note Id is required", 400));
    }

    isCorrectIdFormat(noteId, next);

    const noteToBeDeleted = await Content.findById(noteId);

    if (noteToBeDeleted?.userId.toString() !== req.userId) {
      return next(
        new ErrorHandler("You are not authorized to delete this note", 403)
      );
    }

    await Content.findByIdAndDelete(noteId);

    res.status(200).json({
      success: true,
      message: "Note deleted successfully",
    });
  }
);
export const shareMindNoteController = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const noteId = req.params.id.toString();

    if (!noteId) {
      return next(new ErrorHandler("Note Id is required", 400));
    }

    isCorrectIdFormat(noteId, next);

    //check if note exists
    const note = await Content.findById(noteId);
    if (!note) {
      return next(new ErrorHandler("Note not found", 404));
    }
    //check if already shared
    if (note.shared) {
      const link = await Link.findOne({ noteId });
      res.status(200).json({
        success: true,
        message: "Sharable link",
        data: link?.hash,
      });
      return;
    }
    //is note is of this user
    if (note.userId.toString() !== req.userId) {
      return next(
        new ErrorHandler("You are not authorized to share this note", 403)
      );
    }

    //generate sharable link/hash

    const sharableHash = Math.random().toString(36).split(".")[1];

    //store it into link table with userid , noteid and hash

    const newLinkObj = new Link({
      hash: sharableHash,
      noteId: noteId,
      userId: req.userId,
    });

    await newLinkObj.save();

    // make shared true
    await Content.findByIdAndUpdate(
      noteId,
      { shared: true },
      { new: true, runValidators: true }
    );
    // return success message

    res.status(200).json({
      success: true,
      message: "Sharable link generated",
      data: sharableHash,
    });
  }
);
export const getSharedMindNoteController = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const hash = req.params.hash;

    if (!hash) {
      return next(new ErrorHandler("Hash is required", 400));
    }

    //check if hash exists
    const isHashExists = await Link.findOne({ hash: hash});
    if (!isHashExists) {
      return next(new ErrorHandler("Invalid sharable link or it is not public", 404));
    }

    const linkContent = await Content.findById(isHashExists.noteId).populate({
      path: "userId", 
      select: "fullname",
    });

    res.status(200).json({
      success: true,
      message: "Shared public note",
      data: linkContent,
    });
  }
);
