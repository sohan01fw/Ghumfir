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
      throw new Error("Unauthorized access!");
    }

    const decodedToken = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_KEY
    ) as Token;

    const userDetails = await UserModel.findById(decodedToken?._id).select(
      "-password -refreshToken"
    );
    if (!userDetails) {
      throw new Error("Invalid access token");
    }

    req.user = userDetails;
    next();
  } catch (error) {
    throw new Error("Error on getting token from cookie");
  }
};
