import mongoose, { Schema, model } from "mongoose";
import { Itineraries } from "../../../types";

const UseritinerariesSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  itineraries: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
      itineraryId: {
        type: String,
        required: true,
        unique: true,
      },
      itiInfo: {
        place_Id: String,
        place: String,
        geolocation: {
          lat: String,
          lng: String,
        },
        startDate: Date,
        endDate: Date,
      },
    },
  ],
});

export const UserItineraryModel =
  mongoose.models.UserItineraries ||
  mongoose.model<Itineraries>("UserItineraries", UseritinerariesSchema);
