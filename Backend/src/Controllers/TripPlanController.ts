import { TripPlan } from "../../types/index";
import { UserTripPlanModel } from "../Db/Models/TripPlan.model.ts";
import { RequestHandler } from "express";

//creating triplan route handler
export default async function createTripPlan(req: any, res: any) {
  // Your code here
  try {
    const tripDetails: TripPlan = req.body;
    const { userId, location, startDate, endDate } = tripDetails;
    if (!userId) {
      res.status(401).json({ status: "400", msg: "unauthorized user" });
    }
    const saveTripPlan = new UserTripPlanModel<TripPlan>({
      userId: userId,
      location: location,
      startDate: startDate,
      endDate: endDate,
    });

    await saveTripPlan.save();
    console.log("userTripplan is created");
    res.status(201).json({ status: "201", msg: "userTripplan is created" });
  } catch (error) {
    res
      .status(400)
      .json({ status: "400", msg: "error while create trip plan" });
  }
}
