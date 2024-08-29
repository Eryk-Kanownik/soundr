import { Router, Request, Response } from "express";
import prisma from "../lib/prisma-client";
import { authMiddleware, AuthRequest } from "../lib/auth-middleware";
import { IResponseFormat } from "../types/types";

const router = Router();

//all playlists
router.get("/", async (req: AuthRequest, res: Response) => {
  let playlists = await prisma.playlist.findMany({
    where: { isPublic: true },
    orderBy: { createdAt: "asc" },
  });
  return res.json({ body: playlists });
});

//specific playlist
router.get(
  "/:playlistId",
  authMiddleware,
  async (req: Request, res: Response) => {
    let { playlistId } = req.params;
    let playlist = await prisma.playlist.findFirst({
      where: { id: playlistId },
      include: { creator: true, songs: true },
    });
    return res.json(playlist);
  }
);

//user playlist
router.get("/users/:userId", async (req: Request, res: Response) => {
  let { userId } = req.params;
  let playlists = await prisma.playlist.findMany({
    where: { creatorId: userId },
    orderBy: { createdAt: "asc" },
    include: { songs: true },
  });
  return res.json(playlists);
});

//create playlist
router.post(
  "/",
  authMiddleware,
  async (req: AuthRequest, res: Response<IResponseFormat>) => {
    let { name, description } = req.body;
    let creatorId = req.user!.id;
    let data = { name, description, creatorId };
    let playlist = await prisma.playlist.create({
      data,
      include: { songs: true },
    });
    return res.json({
      type: "Success",
      message: `Playlist ${name} created!`,
      body: playlist,
    });
  }
);

//add song to playlist
router.put(
  "/:playlistId/songs/:songId",
  authMiddleware,
  async (req: AuthRequest, res: Response<IResponseFormat>) => {
    let { playlistId, songId } = req.params;
    let body = await prisma.playlist.update({
      where: { id: playlistId },
      data: { songs: { connect: { id: songId } } },
      include: { songs: true },
    });
    return res.json({
      type: "Success",
      message: "Song succesfully added to playlist!",
      body,
    });
  }
);

router.delete(
  "/:playlistId/songs/:songId",
  authMiddleware,
  async (req: AuthRequest, res: Response<IResponseFormat>) => {
    let { playlistId, songId } = req.params;
    let body = await prisma.playlist.update({
      where: { id: playlistId },
      data: { songs: { disconnect: { id: songId } } },
      include: { songs: true },
    });

    return res.json({
      type: "Success",
      message: "Song succesfully deleted from playlist!",
      body,
    });
  }
);

const playlistRouter = router;
export default playlistRouter;
