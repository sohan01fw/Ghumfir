import { UserModel } from "../Db/Models/User.model.ts";
import { User } from "../../types";
import { Request, Response } from "express";

//user creation
export async function Register(req: Request, res: Response) {
  try {
    const { email, name, password }: User = req.body;
    if (!email || !name || !password) {
      res.json({
        msg: "Email or name or password is empty",
        STATUS_CODES: 204,
      });
    }
    const findUser = await UserModel.findOne({
      $or: [{ email }, { name }],
    });
    console.log(findUser);
    if (findUser === null) {
      try {
        const saveUser = await UserModel.create({
          email: email,
          name: name,
          password: password,
        });
        res.status(201).json({ msg: "Created new user", Data: saveUser });
      } catch (error) {
        console.log(error);
        res.status(401).json({ msg: "Error while creating user" });
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error while processing user" });
  }
}
//get users
/* export async function getUsers(req: Request, res: Response) {
  try {
    const { userId } = req.body;
    const resUsers = await UserModel.findOne({ userId });
    res.send(resUsers);
  } catch (error) {
    res.status(404).json({ msg: "user not found" });
  }
} */
/* export async function handleDeleteUser(req: Request, res: Response) {
  try {
    const { userId } = req.body;
    console.log(userId);
  } catch (error) {
    res.status(500).json({ msg: "error while deleting user" });
  }
} */
