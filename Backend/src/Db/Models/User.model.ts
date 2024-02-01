import mongoose from "mongoose";
import { User } from "../../../types";
import bcrypt from "bcrypt";
import { hashedAnything } from "../../utils/hashedAnything";
import { generateToken } from "../../utils/generateToken.ts";
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
    let value = await hashedAnything(this.password);
    this.password = value;
    next();
  } catch (error) {
    throw new Error(error);
  }
});
//compare a hash and normal password
UserSchema.methods.isPasswordCorrect = async function (password: string) {
  return await bcrypt.compare(password, this.passwrod);
};
//generate Access token and refresh token;
//for Access token
UserSchema.methods.generateAccessToken = async function () {
  return generateToken(
    {
      _id: this._id,
      email: this.email,
      name: this.name,
    },
    process.env.ACCESS_TOKEN_KEY,
    process.env.ACCESS_TOKEN_EXPIRY
  );
};

//for Refresh token
UserSchema.methods.generateRefreshToken = async function () {
  return generateToken(
    { _id: this._id },
    process.env.REFRESH_TOKEN_KEY,
    process.env.REFRESH_TOKEN_EXPIRY
  );
};

export const UserModel =
  mongoose.models.Users || mongoose.model<User>("Test", UserSchema);
