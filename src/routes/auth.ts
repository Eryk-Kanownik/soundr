import { Router, Request, Response } from "express";
import prisma from "../lib/prisma-client";
import { IResponseFormat } from "../types/types";
const jwt = require("jsonwebtoken");

const router = Router();

router.post("/login", async (req: Request, res: Response<IResponseFormat>) => {
  let { username, password } = req.body;
  let user = await prisma.user.findFirst({ where: { username } });
  if (user?.username === username && user?.password === password) {
    let payload = {
      id: user?.id,
      username: user?.username,
    };
    let token = await jwt.sign(payload, process.env.JWT_SECRET);
    return res.json({
      type: "Success",
      message: "User logged in!",
      body: {
        id: user?.id,
        username: user?.username,
        token,
      },
    });
  }
  return res.json({
    type: "Failure",
    message: "Invalid credentials...",
  });
});

router.post(
  "/register",
  async (req: Request, res: Response<IResponseFormat>) => {
    let { username, password } = req.body;
    let isAlreadyRegistered = await prisma.user.findFirst({
      where: { username },
    });
    if (isAlreadyRegistered !== null) {
      return res.json({
        type: "Failure",
        message: "Username already taken...",
      });
    }
    await prisma.user.create({
      data: {
        username,
        password,
        playlists: {
          create: {
            isPublic: false,
            name: "Favorite Songs",
            description: `${username} favorite songs!`,
          },
        },
      },
    });
    return res.json({ type: "Success", message: "User created!" });
  }
);

//verify token
router.post("/verify-token");

const authRouter = router;
export default authRouter;
