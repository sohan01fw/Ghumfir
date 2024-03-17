import { myMiddleware } from "../Middleware/userMiddleware.ts";
import { createBudget, getAllBudget } from "../Controllers/BudgetController.ts";
import express from "express";

export const BudgetRouter = express.Router();
BudgetRouter.use(myMiddleware);
BudgetRouter.route("/create/:itiId").post(createBudget);
BudgetRouter.route("/update/:itiId").post(createBudget);
BudgetRouter.route("/getAll/:itiId").get(getAllBudget);
