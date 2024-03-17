import { Budgets } from "../Db/Models/Budget.model.ts";
import { Request, Response } from "express";

export const createBudget = async (req: Request, res: Response) => {
  const { itiId } = req.params;
  const userID = req.user._id;
  const TotalBudget = 1900;
  const expenses = [
    { name: "Transportation", cost: 200 },
    { name: "Accommodation", cost: 1500 },
    { name: "Food", cost: 200 },
  ];

  try {
    const findBudget = await Budgets.findOne({ itineraryId: itiId });
    if (!findBudget) {
      const createBudget = await Budgets.create({
        user: userID,
        itineraryId: itiId,
        TotalBudget,
        expenses: expenses,
      });
      return res.status(201).json({
        data: createBudget,
        msg: "successfully creating budget",
      });
    }
  } catch (error) {
    return res.status(500).json({
      error: error,
      msg: "error while creating budget plan ",
    });
  }
};

//update budget
export const updateBudget = async (req: Request, res: Response) => {
  const { itiId } = req.params;

  try {
    const findBudget = await Budgets.findOne({ itineraryId: itiId });
    if (findBudget) {
      const updateBudget = await Budgets.findOneAndUpdate({});
    }
  } catch (error) {
    return res.status(500).json({
      error: error,
      msg: "error while updating budget plan ",
    });
  }
};

//get budget
export const getAllBudget = async (req: Request, res: Response) => {
  const { itiId } = req.params;

  try {
    const findAllBudget = await Budgets.findOne({
      itineraryId: itiId,
    });
    return res
      .status(200)
      .json({ data: findAllBudget, msg: "successfully fetching budget plan" });
  } catch (error) {
    return res.status(500).json({
      error: error,
      msg: "error while fetching budget plan ",
    });
  }
};
