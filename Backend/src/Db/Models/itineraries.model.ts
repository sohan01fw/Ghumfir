import mongoose, { Schema, model } from "mongoose";
import { Itineraries } from "../../../types";

const itinerariesSchema = new Schema<Itineraries>({
  itineraryId: {
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
const UseritinerariesSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  itineraries: [itinerariesSchema], //embed schema
});

export const UserItineraryModel =
  mongoose.models.UserItineraries ||
  mongoose.model<Itineraries>("UserItineraries", UseritinerariesSchema);
