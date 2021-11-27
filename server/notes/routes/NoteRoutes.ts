import { Router } from "express";
import NoteController from "../controllers/NoteController";

const noteController = new NoteController();
const NoteRouter = Router();

NoteRouter.get("/", noteController.listNote.bind(noteController));

NoteRouter.post("/", noteController.createNote.bind(noteController));

NoteRouter.use("/:id", (req, res, next) => {
    req.body.id = req.params.id;
    next();
});

NoteRouter.get("/:id", noteController.getNote.bind(noteController));
NoteRouter.put("/:id", noteController.updateNote.bind(noteController));
NoteRouter.delete("/:id", noteController.deleteNote.bind(noteController));

export default NoteRouter;
