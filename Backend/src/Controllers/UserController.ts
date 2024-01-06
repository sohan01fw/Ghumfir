import { UserModel } from "../Db/Models/User.model.ts";
import { User } from "../../types";
import { Request, Response } from "express";

//user creation
export async function UserCreate(req: Request, res: Response) {
  try {
    const { userId, email, name }: User = req.body;
    const findUser = false;

    if (!findUser) {
      try {
        const saveUser = new UserModel({
          userId,
          email,
          name,
        });
        await saveUser.save();
        res.status(201).json({ msg: "Created new user" });
      } catch (error) {
        res.status(401).json({ msg: "Error while creating user" });
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error while processing user" });
  }
}
//get users
export async function getUsers(req: Request, res: Response) {
  try {
    const { userId } = req.body;
    const resUsers = await UserModel.findOne({ userId });
    res.send(resUsers);
  } catch (error) {
    res.status(404).json({ msg: "user not found" });
  }
}
/* export async function handleDeleteUser(req: Request, res: Response) {
  try {
    const { userId } = req.body;
    console.log(userId);
  } catch (error) {
    res.status(500).json({ msg: "error while deleting user" });
  }
} */
