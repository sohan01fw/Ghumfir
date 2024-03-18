import mongoose, { mongo } from "mongoose";

const { Schema } = mongoose;

const BudgetSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
  },
  itineraryId: {
    type: String,
    required: true,
  },
  Budget: {
    type: Number,
  },

  expenses: [
    {
      name: String,
      cost: Number,
    },
  ],
});

export const Budgets =
  mongoose.models.Budgets || mongoose.model("Budgets", BudgetSchema);
