import { UserModel } from "../Db/Models/User.model.ts";
import { User } from "../../types";

const UserController = async (req: any, res: any) => {
  try {
    /*     const { userId, email, name, TripPlans }: User = req.body;
     */
    const saveUser = new UserModel({
      userId: "skoekfodkse",
      email: "soddn@gmail.com",
      name: "ramram",
      /* TripPlans, */
    });
    await saveUser.save();
    res.status(201).json({ msg: "Created new user" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error while processing user" });
  }
};

export default UserController;
