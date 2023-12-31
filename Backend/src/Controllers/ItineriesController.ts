import { UserModel } from "../Db/Models/User.model.ts";
import { Itineraries } from "../../types/index";
import { UserItineraryModel } from "../Db/Models/itineraries.model.ts";
import { ObjectId } from "mongodb";
import { Request, Response } from "express";

//creating triplan route handler
export default async function createItineries(req: Request, res: Response) {
  // Your code here
  try {
    const tripDetails = req.body;
    console.log(tripDetails);
    const { itineraryId, userId, location, startDate, endDate } = tripDetails;
    /* if (!userId) {
      res.status(401).json({ status: "400", msg: "unauthorized user" });
    } */

    /* const tripSave = await UserItineraryModel.create({
      userId: userId,
      itineraries: [
        {
          itineraryId: itineraryId,
          location: location,
          startDate: startDate,
          endDate: endDate,
        },
      ],
    }); */

    //for to update user by itinereies id

    /*  const x = await UserModel.findOneAndUpdate(
      { userId: "skoekfodkse" },
      { $push: { itineraries: itineraryId } }
    ); */

    res.status(201).json({ status: "201", msg: "userTripplan is created" });
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json({ status: "400", msg: "error while create trip plan" });
  }
}

//get all users itineries
export async function getItineries(req: Request, res: Response) {
  try {
    const { userId } = req.body;

    const getallUserItinery = await UserItineraryModel.findOne({ userId });
    const extractAllItineries = getallUserItinery.itineraries;
    res.send(extractAllItineries);
  } catch (error) {
    res.status(404).json({ msg: "User itineries not created yet" });
  }
}
