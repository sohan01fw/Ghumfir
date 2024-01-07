import { insertAllItiDetails } from "../Controllers/itiDetailsInfoController";
import createItineries, {
  getItineriesById,
} from "../Controllers/ItineriesController";
import express from "express";

export const TripRouter = express.Router();

TripRouter.route("/create-Itineries").post(createItineries);
TripRouter.route("/:id").get(getItineriesById);
//inserting all itiDetails in db
TripRouter.route("/insertAllItiDetails").post(insertAllItiDetails);
