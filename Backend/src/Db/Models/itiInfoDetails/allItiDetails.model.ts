import mongoose from "mongoose";
import { AllItiDetails } from "../../../../types";

const { Schema } = mongoose;

const allItiDetailSchema = new Schema<AllItiDetails>({
  address: {
    type: String,
    required: true,
  },
  business_status: String,
  name: String,
  photos: [
    {
      url: String,
      height: String,
      width: String,
    },
  ],
  place_id: String,
  rating: Number,
  reviews: [
    {
      author: String,
      author_url: String,
    },
  ],
  user_total_rating: Number,
});

export const allItiDetailsModel =
  mongoose.models.AllItiDetails ||
  mongoose.model("AllItiDetails", allItiDetailSchema);
