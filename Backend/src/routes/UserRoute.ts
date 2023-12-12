import UserCreate from "../Controllers/UserController";
import express from "express";

export const UserRouter = express.Router();

UserRouter.post("/user", UserCreate);
