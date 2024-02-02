import { UserModel } from "../Db/Models/User.model.ts";
import { User } from "../../types";
import { Request, Response } from "express";

//user registration
export async function RegisterUser(req: Request, res: Response) {
  try {
    const { email, name, password }: User = req.body;
    if (!email || !name || !password) {
      throw new Error("Email or name or password is empty");
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

        res.status(201).json({ msg: "Created new user" });
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

export async function LoginUser(req: Request, res: Response) {
  const { email, name, password } = req.body;

  if (!email || !name) {
    throw new Error("Email or name must be provided to login");
  }
  if (!password) {
    throw new Error("password must be provided to login");
  }

  //check user in db
  const user = await UserModel.findOne({
    $or: [{ email: email }, { name: name }],
  }).select("-password -refreshToken");
  if (!user) {
    throw new Error("user doesn't exists");
  }
  //check whether the password correct or not
  let checkUser = await user.isPasswordCorrect(password);
  if (!checkUser) {
    throw new Error("password is incorrect");
  }
}
