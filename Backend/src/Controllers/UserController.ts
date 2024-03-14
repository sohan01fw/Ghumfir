import { UserModel } from "../Db/Models/User.model.ts";
import { User } from "../../types";
import { Request, Response } from "express";
import { getRefreshTokenAndAccessToken } from "../utils/getRTandAT.ts";

//user registration
export async function RegisterUser(req: Request, res: Response) {
  try {
    const { email, name, password }: User = req.body;
    if (!email || !name || !password) {
      res.status(400).json({ msg: "Email or name or password is empty" });
    }
    const findUser = await UserModel.findOne({
      $or: [{ email }, { name }],
    });
    if (findUser) {
      res.status(400).json({ msg: "Email or name already created!!" });
    }
    if (findUser === null) {
      try {
        const saveUser = await UserModel.create({
          email: email,
          name: name,
          password: password,
          refreshToken: null,
        });

        res.status(201).json({ data: saveUser, msg: "Created new user" });
      } catch (error) {
        console.log(error);
        res.status(401).json({ msg: "Error while creating user" });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error while processing user" });
  }
}

//login users
export async function LoginUser(req: Request, res: Response) {
  try {
    const { email, name, password } = req.body;

    if (!email && !name) {
      return res
        .status(400)
        .json({ msg: "Email or name must be provided to login" });
    }

    if (!password) {
      return res
        .status(400)
        .json({ msg: "Password must be provided to login" });
    }

    // Check user in DB
    const user = await UserModel.findOne({
      $or: [{ email: email }, { name: name }],
    });

    if (!user) {
      return res
        .status(404)
        .json({ msg: "User doesn't exist. Please register first!" });
    }

    // Check password
    const checkUserPassword = await user.isPasswordCorrect(password);
    if (!checkUserPassword) {
      return res.status(400).json({ msg: "Password is incorrect" });
    }

    const id = user._id.toString();
    const { RefreshToken, AccessToken } = await getRefreshTokenAndAccessToken(
      id
    );

    user.password = undefined;
    user.refreshToken = undefined;

    return res
      .status(200)
      .cookie("_rt", RefreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        path: "/",
        expires: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
      })
      .cookie("_at", AccessToken, {
        httpOnly: false,
        secure: true,
        sameSite: "none",
        path: "/",
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      })
      .json({ msg: "Successfully logged in", data: user });
  } catch (error) {
    return res.status(500).json({ msg: "Error while logging in user" });
  }
}

export async function LogOut(req: Request, res: Response) {
  try {
    await UserModel.findByIdAndUpdate(
      { _id: req.user._id },
      {
        $set: { refreshToken: null },
      },
      { new: true }
    );

    res
      .status(200)
      .clearCookie("_at")
      .clearCookie("_rt")
      .json({ msg: "successfully logout the user", data: {} });
  } catch (error) {
    throw new Error("failed to logout the user");
  }
}
