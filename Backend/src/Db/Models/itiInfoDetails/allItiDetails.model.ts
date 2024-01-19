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
      photos: [{}],
      place_id: String,
      rating: Number,
      reviews: [
        {
          author_name: String,
          author_pic_url: String,
          text: String,
          rating: Number,
        },
      ],
      user_total_rating: Number,
    },
  ],
});

export const allItiDetailsModel =
  mongoose.models.AllItiDetails ||
  mongoose.model("AllItiDetails", allItiDetailSchema);
