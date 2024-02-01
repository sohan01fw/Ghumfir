import bcrypt from "bcrypt";
let SALT = 10;
export async function hashedAnything(value: string) {
  let hashValue = await bcrypt.hash(value, SALT);
  return hashValue;
}
