import { Register } from "../Controllers/UserController";
import express from "express";

export const UserRouter = express.Router();

/* UserRouter.route("/").get(getUsers);
 */
UserRouter.route("/register").post(Register);
/* UserRouter.route("/:id").delete(handleDeleteUser);
 */
