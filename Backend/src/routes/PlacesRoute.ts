import { myMiddleware } from "../Middleware/userMiddleware.ts";
import {
  createPlaces,
  deletePlaces,
  getAllPlaces,
  getPlaces,
} from "../Controllers/PlacesController.ts";
import express from "express";

export const placesRoute = express.Router();
//inserting all itiDetails in db

placesRoute.route("/createplaces/:pId").post(myMiddleware,createPlaces);
placesRoute.route("/getplaces/:pId").get(myMiddleware,getPlaces);
placesRoute.route("/getAllPlaces").get(myMiddleware,getAllPlaces);
placesRoute
  .route("/deleteplaces/:pId/:itiId")
  .delete(myMiddleware,deletePlaces);
