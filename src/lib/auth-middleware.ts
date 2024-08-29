import { Request, Response, NextFunction } from "express";

export interface AuthRequest extends Request {
  user?: {
    id: string;
    username: string;
    token: string;
  };
}

const jwt = require("jsonwebtoken");
export const authMiddleware = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  if (req.headers["authorization"]) {
    try {
      let token = req.headers["authorization"];
      let decoded = await jwt.verify(token.toString(), process.env.JWT_SECRET!);
      req.user = decoded;
      next();
    } catch (e) {
      return res.json({
        message: "JWT malformed",
      });
    }
  } else {
    return res.json({
      message: "Unauthorized. You have to log in.",
    });
  }
};
