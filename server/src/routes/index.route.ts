import { Router } from "express";

const router = Router().get("/", async (_, res) => {
  res.send("Hello World!");
});

export default router;
