import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
let key = process.env.PRIVATE_KEY;
export async function generateToken(data: any) {
  try {
    const value = jwt.sign(data, key, { expiresIn: "1h" });
    return value;
  } catch (error) {
    console.error("error while generating jwt token", error.message);
  }
}
