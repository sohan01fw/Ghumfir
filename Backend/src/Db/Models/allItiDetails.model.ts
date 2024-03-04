import mongoose from "mongoose";
import { AllItiDetails } from "../../../types";

const { Schema } = mongoose;

const allItiDetailSchema = new Schema<AllItiDetails>({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
  },
  itineraryId: {
    type: String,
    required: true,
  },
  ItiDetails: [
    {
      place_itiid: String,
    },
  ],
});

export const allItiDetailsModel =
  mongoose.models.AllItiDetails ||
  mongoose.model("AllItiDetails", allItiDetailSchema);
