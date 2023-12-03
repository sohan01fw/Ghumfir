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

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`app listening on port http://localhost:${port}`);
});
