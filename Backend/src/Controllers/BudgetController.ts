import { Budgets } from "../Db/Models/Budget.model.ts";
import { Request, Response } from "express";

export const createBudgetandExpenses = async (req: Request, res: Response) => {
  const { itiId } = req.params;
  const userID = req.user._id;
  const { Budget, name, cost } = req.body;

  try {
    const findBudget = await Budgets.findOne({ itineraryId: itiId });
    if (!findBudget) {
      const createBudget = await Budgets.create({
        user: userID,
        itineraryId: itiId,
        Budget: Budget || 0,
        expenses: [],
      });
      return res.status(201).json({
        data: createBudget,
        msg: "successfully creating budget",
      });
    } else {
      try {
        if (Budget) {
          try {
            const updateBudget = await Budgets.findOneAndUpdate(
              { itineraryId: itiId },
              {
                $set: { Budget: Budget },
              },
              { new: true }
            );
            return res.status(200).json({
              data: updateBudget,
              msg: "successfully updating budget only",
            });
          } catch (error) {
            return res.status(500).json({
              error: error,
              msg: "error while updating budget only ",
            });
          }
        }
        if (name || cost) {
          const updateExpenses = await Budgets.findOneAndUpdate(
            { itineraryId: itiId },
            { $push: { expenses: { name, cost } } },
            { new: true }
          );
          return res.status(200).json({
            data: updateExpenses,
            msg: "successfully updating expenses ",
          });
        }
      } catch (error) {
        return res.status(500).json({
          error: error,
          msg: "error while updating expenses plan ",
        });
      }
    }
  } catch (error) {
    return res.status(500).json({
      error: error,
      msg: "error while creating expenses plan ",
    });
  }
};

//get budget
export const getAllExpenses = async (req: Request, res: Response) => {
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
