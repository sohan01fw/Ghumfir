import createItineries, {
  getAllItineries,
  getItineriesById,
} from "../Controllers/ItineriesController";
import express from "express";

export const TripRouter = express.Router();

TripRouter.route("/create-Itineries/:pId").post(createItineries);
TripRouter.route("/itiId/:id").get(getItineriesById);
TripRouter.route("/getAllIti").get(getAllItineries);
