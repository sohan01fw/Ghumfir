import { UserCreate, handleDeleteUser } from "../Controllers/UserController";
import express from "express";

export const UserRouter = express.Router();

UserRouter.route("/").post(UserCreate);

UserRouter.route("/:id").delete(handleDeleteUser);
