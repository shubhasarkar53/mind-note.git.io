import { Router } from "express";
import { isAuthenticated } from "../middlewares/isAuthenticated";
import { deleteNoteController, getAllNotesController, getSearchedNoteController, getSharedMindNoteController, patchNoteController, postNewNoteController, shareMindNoteController } from "../controllers/funtionality/mindNoteController";

const router = Router();

router.get('/mindnotes', isAuthenticated , getAllNotesController)

router.get('/mindnotes/search', isAuthenticated , getSearchedNoteController)

router.post('/mindnote/new',isAuthenticated,postNewNoteController)

router.patch('/mindnote/:id', isAuthenticated, patchNoteController)

router.delete('/mindnote/:id', isAuthenticated, deleteNoteController)

router.get('/mindnote/share/:id', isAuthenticated,shareMindNoteController)

router.get('/mindnote/share/public/:hash', getSharedMindNoteController)

export default router;