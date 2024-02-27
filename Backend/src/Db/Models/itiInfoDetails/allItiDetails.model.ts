import mongoose from "mongoose";
import { AllItiDetails } from "../../../../types";

const { Schema } = mongoose;

const allItiDetailSchema = new Schema<AllItiDetails>({
  itineraryId: {
    type: String,
    required: true,
  },
  ItiDetails: [
    {
      address: {
        type: String,
        required: true,
      },
      business_status: String,
      name: String,
      geo: {
        lat: String,
        lng: String,
      },
      place_id: String,
      rating: Number,
      user_total_rating: Number,
    },
  ],
});

export const allItiDetailsModel =
  mongoose.models.AllItiDetails ||
  mongoose.model("AllItiDetails", allItiDetailSchema);
