import {
  LogOut,
  LoginUser,
  RegisterUser,
  getUser,
  newAccessToken,
} from "../Controllers/UserController";
import express from "express";
import { myMiddleware } from "../Middleware/userMiddleware";

const app = express();
export const UserRouter = express.Router();

UserRouter.route("/register").post(RegisterUser);

UserRouter.route("/login").post(LoginUser);
UserRouter.route("/getUser").get(myMiddleware, getUser);
UserRouter.route("/logout").delete(myMiddleware, LogOut);
UserRouter.route("/new-accessToken").get(newAccessToken);
