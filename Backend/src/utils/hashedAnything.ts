import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();
let SALT = process.env.saltROUND;
export async function hashedAnything(value: string) {
  let hashValue = await bcrypt.hash(value, SALT);
  return hashValue;
}
