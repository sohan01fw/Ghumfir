import { UserModel } from "../Db/Models/User.model.ts";

//for login user
export const getRefreshTokenAndAccessToken = async (userId: string) => {
  const findUser = await UserModel.findById({ _id: userId });
  if (!findUser) {
    throw new Error("no user found");
  }
  const AccessToken = await findUser.generateAccessToken();
  const RefreshToken = await findUser.generateRefreshToken();

  await UserModel.findByIdAndUpdate(
    { _id: userId },
    {
      $set: { refreshToken: RefreshToken },
    },
    { new: true }
  );
  return { AccessToken, RefreshToken };
};
