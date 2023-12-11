import createItineries from "../Controllers/ItineriesController";
import express from "express";

export const TripRouter = express.Router();

TripRouter.post("/create-trip", createItineries);
