import mongoose, { Schema, model } from "mongoose";
import { TripPlan } from "../../../types";

const tripPlanSchema = new Schema<TripPlan>({
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  location: {
    type: String,
    required: true,
  },
  startDate: {
    type: String,
  },
  endDate: {
    type: String,
  },
});

export const UserTripPlanModel =
  mongoose.models.UserTripPlan ||
  mongoose.model<TripPlan>("UserTripPlans", tripPlanSchema);
