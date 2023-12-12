import mongoose from "mongoose";

const connURI = process.env.MONGODB_URI;

if (!connURI) {
  throw new Error("Cannot get connection URI");
}

mongoose
  .connect(connURI)
  .then(() => {
    console.log("successfully connected");
  })
  .catch((error) => {
    console.log(error);
  });
