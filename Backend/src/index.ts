//import express
import express from "express";
import { Request, Response } from "express";
//cookie-parser
import cookieParser from "cookie-parser";
//compresson from express advance
import compression from "compression";
//cors
import cors from "cors";
/* import logger from "morgan"; */
import { v4 as uuidv4 } from "uuid";
import { TripRouter } from "./routes/tripPlanRoute.ts";
import { UserRouter } from "./routes/UserRoute.ts";

const app = express();

//Handeling packages
app.use(
  cors({
    origin: function (origin, callback) {
      const options = ["http://localhost:5173", "http://localhost:3000"];
      const isAllowed = options.includes(origin);
      callback(null, isAllowed);
    },
    optionsSuccessStatus: 200,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compression());

require("dotenv").config();
const port = process.env.PORT;

//handling db connection
require("./Db/dbConn.ts");
//Handeling routes using express middleware
app.use(TripRouter);
app.use("/api/user", UserRouter);
app.use("/api/itineries", TripRouter);
app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

// Initialize Passport

/* app.get("*", (req, res) => {
  res.status(404).send("Not Found");
}); */
app.listen(port, () => {
  console.log(`app listening on port http://localhost:${port}`);
});
