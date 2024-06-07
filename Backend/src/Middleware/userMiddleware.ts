import { UserModel } from "../Db/Models/User.model";
import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

interface Token {
  _id: string;
  email: string;
  name: string;
}

// Augment the Request type
declare global {
  namespace Express {
    interface Request {
      user?: any; // Add your user property type here
    }
  }
}

export const myMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token =
      req.cookies?._at || req.header("Authorization")?.replace("bearer ", "");
    if (!token) {
      return res.status(404).json({ msg: "token already deleted!!" });
    }

    const decodedToken = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_KEY
    ) as Token;
    if (!decodedToken) {
      return res.status(500).json({ msg: "invalid on getting decoded token" });
    }
    const userDetails = await UserModel.findById(decodedToken?._id).select(
      "-password -refreshToken"
    );
    if (!userDetails) {
      return res.status(504).json({ msg: "invalid access token" });
    }

    req.user = userDetails;
    next();
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      data: error,
      msg: "Error on proccessing authenticate user middleware",
    });
  }
};
