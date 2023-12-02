import express from "express";
import createTripPlan from "../Controllers/TripPlanController.ts";

export const TripRouter = express.Router();

TripRouter.post("/create-trip", createTripPlan);
