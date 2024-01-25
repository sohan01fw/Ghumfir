import mongoose from "mongoose";
import { User } from "../../../types";

const UserSchema = new mongoose.Schema<User>(
  {
    userId: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      reqired: true,
      unique: true,
    },
    name: {
      type: String,
      reqired: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const UserModel =
  mongoose.models.Users || mongoose.model<User>("Users", UserSchema);
