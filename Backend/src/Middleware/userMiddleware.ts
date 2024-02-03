import { Request, Response, NextFunction } from "express";

export const myMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(req.cookies._at);
  next();
};
