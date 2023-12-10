import UserController from "../Controllers/UserController.ts";
import express from "express";

export const UserRouter = express.Router();

UserRouter.post("/user", UserController);
