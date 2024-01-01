import createItineries, {
  getItineries,
} from "../Controllers/ItineriesController";
import express from "express";

export const TripRouter = express.Router();

TripRouter.route("/create-Itineries").post(createItineries);
TripRouter.route("/:id").get(getItineries);
