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
      startDate: Date,
      endDate: Date,
      places: [
        {
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
          },
        },
      ],
    },
  ],
});

export const PlacesModel =
  mongoose.models.places || mongoose.model("Places", PlacesSchema);
