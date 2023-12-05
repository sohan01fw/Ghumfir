import express from "express";
import passport from "passport";
//@ts-ignore
import GoogleStrategy from "passport-google-oidc";

export const authRouter = express.Router();

authRouter.get("/login", passport.authenticate("google"));

passport.use(
  new GoogleStrategy(
    {
      clientID: [
        "753461652898-7raulcjsgg3aemlnjgofo1jdnq0tvu3g.apps.googleusercontent.com",
      ],
      clientSecret: process.env["GOOGLE_CLIENT_SECRET"],
      callbackURL: "/oauth2/redirect/google",
      scope: ["profile"],
    },
    function verify(
      accessToken: any,
      refreshToken: any,
      profile: any,
      cb: any
    ) {
      console.log(profile);
    }
  )
);
