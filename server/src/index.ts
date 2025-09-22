import express from "express";
import { env } from "@/env";

const app = express();
const PORT = env.PORT


app.get("/", (req, res) => {
    res.send("Hello World!");
})

app.listen(
    PORT,()=> {
    console.log(`Listening on http://localhost:${PORT}`);
})