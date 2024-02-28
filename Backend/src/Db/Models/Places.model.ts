import mongoose from "mongoose";
import { Places } from "../../../types";

const PlacesSchema = new mongoose.Schema<Places>({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
  },
  AllPlaces: [
    {
      places_Id: {
        type: String,
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
    },
  ],
});

export const PlacesModel =
  mongoose.models.places || mongoose.model("Places", PlacesSchema);
