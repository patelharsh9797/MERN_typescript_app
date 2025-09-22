import { z } from "zod";

export const idParamsSchema = z.object({
  id: z.string("Id is required"),
});

export const createNoteZodSchema = z.object({
  title: z.string("Title is required"),
  text: z.string("Text is required").optional(),
});

export type CreateNoteBody = z.infer<typeof createNoteZodSchema>;
