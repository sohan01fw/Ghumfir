import {
  LogOut,
  LoginUser,
  RegisterUser,
  newAccessToken,
} from "../Controllers/UserController";
import express from "express";
import { myMiddleware } from "../Middleware/userMiddleware";

const app = express();
export const UserRouter = express.Router();

/* UserRouter.route("/").get(getUsers);
 */
UserRouter.route("/register").post(RegisterUser);

UserRouter.route("/login").post(LoginUser);

UserRouter.route("/logout").delete(myMiddleware, LogOut);
UserRouter.route("/new-accessToken").get(newAccessToken);
