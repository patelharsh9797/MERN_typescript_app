import { Router } from "express";
import {
  createNote,
  getNotes,
  getNoteById,
  updateNote,
  deleteNote,
} from "./notes.handlers";

const router = Router()
  .get("/", getNotes)
  .post("/", createNote)
  .get("/:id", getNoteById)
  .patch("/:id", updateNote)
  .delete("/:id", deleteNote);

export default router;
