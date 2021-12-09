import { Router } from "express";
import NoteController from "../controllers/NoteController";

const noteController = new NoteController();
const NoteRouter = Router();

NoteRouter.get("/", noteController.listNote.bind(noteController));

NoteRouter.post("/", noteController.createNote.bind(noteController));

NoteRouter.use("/:note_id", (req, res, next) => {
    req.body.note_id = req.params.note_id;
    next();
});

NoteRouter.get("/:note_id", noteController.getNote.bind(noteController));
NoteRouter.put("/:note_id", noteController.updateNote.bind(noteController));
NoteRouter.delete("/:note_id", noteController.deleteNote.bind(noteController));

export default NoteRouter;
