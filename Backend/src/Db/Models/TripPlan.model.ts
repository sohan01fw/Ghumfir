import { Schema, model } from "mongoose";

interface TripPlan {
  userId: string;
  location: string;
  startDate: string;
  endDate: string;
}
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

const UserTripPlanModel = model<TripPlan>("UserTripPlan", tripPlanSchema);

module.exports = UserTripPlanModel;
