//import express
import express, { NextFunction } from "express";
import { Request, Response } from "express";
//cookie-parser
import cookieParser from "cookie-parser";
//compresson from express advance
import compression from "compression";
//cors
import cors from "cors";
/* import logger from "morgan"; */
import { TripRouter } from "./routes/tripPlanRoute.ts";
import { UserRouter } from "./routes/UserRoute.ts";
import { placeDetailsRoute } from "./routes/placeDetailsRoute.ts";
import { myMiddleware } from "./Middleware/userMiddleware.ts";
const app = express();
require("dotenv").config();
const port = process.env.PORT;
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
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(compression());

//handling db connection
require("./Db/dbConn.ts");

//Handeling routes using express middleware
app.use(TripRouter);
app.use("/api/user", UserRouter);
app.use("/api/itineries", TripRouter);
app.use("/api/place-details", placeDetailsRoute);

app.get("/", myMiddleware, (req: Request, res: Response) => {
  res.send("Hello World!");
});
// Initialize Passport

/* app.get("*", (req, res) => {
  res.status(404).send("Not Found");
}); */
app.listen(port, () => {
  console.log(`app listening on port http://localhost:${port}`);
});
