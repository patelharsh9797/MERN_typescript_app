import notes from "@/routes/notes/notes.index";
import index from "@/routes/index.route";
import express from "express";
import errorMiddleware from "./middlewares/error.middleware";
import morgan from "morgan";

const app = express();
app.use(express.json());
app.use(morgan("dev"));

const routes = [
  { path: "/", router: index },
  { path: "/api/notes", router: notes },
];

routes.forEach(({ path, router }) => app.use(path, router));

app.use(() => {
  throw new Error("Not found");
});

app.use(errorMiddleware);

export default app;
