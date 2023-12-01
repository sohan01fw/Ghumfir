//import express
import express from "express";

//cookie-parser
import cookieParser from "cookie-parser";

//compresson from express advance
import compression from "compression";
//cors
import cors from "cors";
const app = express();
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compression());

require("dotenv").config();
const port = process.env.PORT;

app.get("/*", (req: express.Request, res: express.Response) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
