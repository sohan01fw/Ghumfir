import { Budgets } from "../Db/Models/Budget.model.ts";
import { Request, Response } from "express";

export const createBudgetandExpenses = async (req: Request, res: Response) => {
  const { itiId } = req.params;
  const userID = req.user._id;
  const { name, Budget, cost, expId } = req.body;
  /*  if (!itiId || !name || !cost) {
    res.status(400).json({ msg: "please provide all field" });
  } */
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
          if (expId) {
            try {
              const updateExpenses = await Budgets.findOneAndUpdate(
                { itineraryId: itiId, "expenses._id": expId },
                { $set: { "expenses.$.name": name, "expenses.$.cost": cost } },
                { upsert: true, new: true }
              );

              return res.status(200).json({
                data: updateExpenses,
                msg: "successfully updating expenses ",
              });
            } catch (error) {
              console.log(error);
              return res.status(500).json({
                error: error,
                msg: "error while updating expenses plan  ",
              });
            }
          }
          const saveExpenses = await Budgets.findOneAndUpdate(
            { itineraryId: itiId },
            { $push: { expenses: { name, cost } } },
            { upsert: true, new: true }
          );
          return res.status(200).json({
            data: saveExpenses,
            msg: "successfully saving expenses ",
          });
        }
      } catch (error) {
        return res.status(500).json({
          error: error,
          msg: "error while adding expenses plan ",
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

export const deleteExpenses = async (req: Request, res: Response) => {
  try {
    const { itiId, expId } = req.params;
    const deleteExpenses = await Budgets.findOneAndUpdate(
      { itineraryId: itiId, "expenses._id": expId },
      {
        $pull: {
          expenses: { _id: expId },
        },
      },
      { new: true }
    );
    return res.status(200).json({
      data: deleteExpenses,
      msg: "successfully deleting budget expenses plan",
    });
  } catch (err) {
    return res.status(500).json({
      error: err,
      msg: "error while deleting budget expenses  ",
    });
  }
};
