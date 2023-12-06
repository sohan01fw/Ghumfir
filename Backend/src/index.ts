//import express
import express from "express";
import { Request, Response } from "express";
//cookie-parser
import cookieParser from "cookie-parser";
//compresson from express advance
import compression from "compression";
//cors
import cors from "cors";
import { TripRouter } from "./routes/tripPlanRoute.ts";
import { authRouter } from "./routes/auth.ts";
import logger from "morgan";
import session from "express-session";
import path from "path";

const app = express();

//Handeling packages
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compression());

require("dotenv").config();
const port = process.env.PORT;
//handling db connection
require("../src/Db/dbConn.ts");
//Handeling routes using express middleware
app.use(TripRouter);
//auth router mw
app.use(authRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
  })
);

app.listen(port, () => {
  console.log(`app listening on port http://localhost:${port}`);
});
