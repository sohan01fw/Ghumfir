import { LogOut, LoginUser, RegisterUser } from "../Controllers/UserController";
import express from "express";
import { myMiddleware } from "../Middleware/userMiddleware";

const app = express();
export const UserRouter = express.Router();

/* UserRouter.route("/").get(getUsers);
 */
UserRouter.route("/register").post(RegisterUser);

UserRouter.route("/login").post(LoginUser);

UserRouter.route("/logout").delete(myMiddleware, LogOut);
