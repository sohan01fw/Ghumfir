import { myMiddleware } from "../Middleware/userMiddleware.ts";
import {
  createBudgetandExpenses,
  getAllExpenses,
} from "../Controllers/BudgetController.ts";
import express from "express";

export const BudgetRouter = express.Router();
BudgetRouter.use(myMiddleware);
BudgetRouter.route("/create/:itiId").post(createBudgetandExpenses);
BudgetRouter.route("/getAll/:itiId").get(getAllExpenses);
