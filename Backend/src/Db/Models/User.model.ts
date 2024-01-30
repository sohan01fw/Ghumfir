import mongoose from "mongoose";
import { User } from "../../../types";
import bcrypt from "bcrypt";
const UserSchema = new mongoose.Schema<User>(
  {
    email: {
      type: String,
      reqired: [true, "Email must provided"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    name: {
      type: String,
      reqired: true,
      lowercase: true,
      trim: true,
      index: 1,
    },
    password: {
      type: String,
      required: [true, "password must provided"],
      lowercase: true,
      trim: true,
      unique: true,
      select: false,
    },
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  try {
    let hashValue = await bcrypt.hash(this.password, 10);
    this.password = hashValue;
    next();
  } catch (error) {
    throw new Error(error);
  }
});

export const UserModel =
  mongoose.models.Users || mongoose.model<User>("Test", UserSchema);
