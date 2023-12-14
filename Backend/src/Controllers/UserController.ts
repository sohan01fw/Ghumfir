import { UserModel } from "../Db/Models/User.model.ts";
import { User } from "../../types";
import { Request, Response } from "express";

//user creation
export async function UserCreate(req: Request, res: Response) {
  try {
    const { userId, email, name, itineraries }: User = req.body;
    const findUser = false;

    if (!findUser) {
      try {
        const saveUser = new UserModel({
          userId,
          email,
          name,
          itineraries,
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

export async function handleDeleteUser(req: Request, res: Response) {
  try {
    const { userId } = req.body;
    console.log(userId);
  } catch (error) {
    res.status(500).json({ msg: "error while deleting user" });
  }
}
