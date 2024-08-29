import express, { Application, Request, Response } from "express";
import path from "path";
import cors from "cors";
import authRouter from "./routes/auth";
import playlistRouter from "./routes/playlists";
import songRouter from "./routes/songs";

require("dotenv").config();

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "../", "public")));

app.use("/api/auth", authRouter);
app.use("/api/playlists", playlistRouter);
app.use("/api/songs", songRouter);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../", "client", "dist")));
  console.log(path.join(__dirname, "../", "client", "dist"));
  app.get("/", (req, res) => {
    res.sendFile(
      path.resolve(__dirname, "../", "client", "dist", "index.html")
    );
  });
}

app.listen(process.env.PORT, () =>
  console.log(`Server runs on http://localhost:${process.env.PORT}`)
);
