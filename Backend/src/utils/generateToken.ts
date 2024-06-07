import jwt from "jsonwebtoken";

export async function generateToken(data: any, key: any, expiry: any) {
  try {
    const value = jwt.sign(data, key, { expiresIn: Math.floor(Date.now() / 1000) + (60 * 60) });
    return value;
  } catch (error) {
    console.error("error while generating jwt token", error.message);
  }
}
