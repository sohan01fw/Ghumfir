import { UserModel } from "../Db/Models/User.model.ts";
import { User } from "../../types";

//user creation
export default async function UserCreate(req: any, res: any) {
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
