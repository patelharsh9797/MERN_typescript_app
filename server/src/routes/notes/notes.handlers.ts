import { NoteModel } from "@/db/models";
import { createNoteZodSchema, idParamsSchema } from "@/lib/zod";
import { withValidated } from "@/middlewares/validateData.middleware";
import { createResJson } from "@/utils";
import type { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";

export const getNotes: RequestHandler = async (req, res) => {
  const notes = await NoteModel.find().exec();
  res.status(StatusCodes.OK).json({ success: true, data: notes });
};

export const getNoteById = withValidated(
  {
    params: idParamsSchema,
  },
  async (req, res) => {
    const { id } = req.params;

    const note = await NoteModel.findById(id).exec();

    res.status(StatusCodes.OK).json(createResJson(true, note));
  }
);

export const createNote = withValidated(
  {
    body: createNoteZodSchema,
  },
  async (req, res) => {
    const { text, title } = req.body;

    const note = await NoteModel.create({
      title,
      text,
    });

    res.status(StatusCodes.CREATED).json(createResJson(true, note));
  }
);

export const updateNote = withValidated(
  {
    params: idParamsSchema,
    body: createNoteZodSchema.partial(),
  },
  async (req, res) => {
    const { id } = req.params;
    const { text, title } = req.body;

    const note = await NoteModel.findById(id).exec();

    if (!note) {
      throw Error("Not Found");
    }

    note.title = title || note.title;
    note.text = text || note.text;

    const updatedNote = await note.save();

    res.status(StatusCodes.OK).json(createResJson(true, updatedNote));
  }
);

export const deleteNote = withValidated(
  {
    params: idParamsSchema,
  },
  async (req, res) => {
    const { id } = req.params;

    const note = await NoteModel.findById(id).exec();

    if (!note) {
      throw Error("Not Found");
    }

    await note.deleteOne().exec();

    res.status(StatusCodes.NO_CONTENT).json(createResJson(true, null));
  }
);
