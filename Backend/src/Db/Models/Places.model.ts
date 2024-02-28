import mongoose from "mongoose";
import { Places } from "../../../types";

const PlacesSchema = new mongoose.Schema<Places>({
  placesId: {
    type: String,
    unique: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
  },
  places: [
    {
      itineraryId: String,
      itiPlaces: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserItineraries",
      },
    },
  ],
});

export const PlacesModel =
  mongoose.models.Places || mongoose.model("Places", PlacesSchema);
