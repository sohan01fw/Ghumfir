import mongoose from "mongoose";
import { Itineraries } from "../../../types";

const UseritinerariesSchema = new mongoose.Schema({
  userId: { type: String, ref: "Users" },
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
        ItiDetails: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "AllItiDetails",
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
