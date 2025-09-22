import express from "express";
import { NoteModel } from "@/db/models";
import errorMiddleware from "./middlewares/error.middleware";

const app = express();
app.use(express.json());

app.get("/", async (_, res) => {
  const notes = await NoteModel.find().exec();
  res.status(200).json({ notes });
});

app.use(() => {
  throw new Error("Not found");
});

app.use(errorMiddleware);

export default app;
