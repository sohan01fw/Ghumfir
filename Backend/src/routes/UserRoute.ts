import { LogOut, LoginUser, RegisterUser } from "../Controllers/UserController";
import express from "express";

export const UserRouter = express.Router();

/* UserRouter.route("/").get(getUsers);
 */
UserRouter.route("/register").post(RegisterUser);

UserRouter.route("/login").post(LoginUser);

UserRouter.route("/logout").post(LogOut);
