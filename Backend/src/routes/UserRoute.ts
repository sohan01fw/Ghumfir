import { UserCreate, getUsers } from "../Controllers/UserController";
import express from "express";

export const UserRouter = express.Router();

UserRouter.route("/").get(getUsers);

UserRouter.route("/user").post(UserCreate);
/* UserRouter.route("/:id").delete(handleDeleteUser);
 */
