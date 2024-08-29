import { Router, Request, Response } from "express";
import prisma from "../lib/prisma-client";
import { authMiddleware, AuthRequest } from "../lib/auth-middleware";
import { uploadSong } from "../lib/multer";
import { IResponseFormat } from "../types/types";

const router = Router();

router.get("/", authMiddleware, async (req: Request, res: Response) => {
  let songs = await prisma.song.findMany({
    orderBy: { uploadedAt: "desc" },
    take: 10,
  });
  return res.json({ body: songs });
});

router.post(
  "/",
  authMiddleware,
  uploadSong.fields([{ name: "cover-file" }, { name: "song-file" }]),
  async (req: Request, res: Response<IResponseFormat>) => {
    let { author, title, duration } = req.body;
    duration = parseInt(duration);
    let files = req!.files as any;
    let songSrc = `/songs/${files["song-file"][0].filename}`;
    let coverSrc = `/covers/${files["cover-file"][0].filename}`;
    let data = {
      author,
      title,
      songSrc,
      coverSrc,
      duration,
    };
    await prisma.song.create({ data });
    return res.json({ type: "Success", message: "Song succesfully uploaded!" });
  }
);

const songRouter = router;
export default songRouter;
