import { UserModel } from "../Db/Models/User.model.ts";
import { Itineraries } from "../../types/index";
import { UserItineraryModel } from "../Db/Models/itineraries.model.ts";
import { Request, Response } from "express";
import { ObjectId } from "mongodb";

//creating triplan route handler
export default async function createItineries(req: Request, res: Response) {
  // Your code here
  const newObjectId = new ObjectId();

  // Convert the ObjectId to a string
  const Id = newObjectId.toHexString();

  try {
    const tripDetails = req.body;
    console.log(tripDetails);
    let userId = "skoekfodkse";
    const { itineraryId, itiInfo, startDate, endDate } =
      tripDetails as Itineraries;

    if (!userId) {
      res.status(401).json({ status: "400", msg: "unauthorized user" });
    }

    /* const tripSave = await UserItineraryModel.create({
      userId: userId,
      itineraries: [
        {
          itineraryId: Id,
          itiInfo: {
            place_Id: itiInfo.place_Id,
            place: itiInfo.place,
            geolocation: {
              lat: itiInfo.geolocation.lat,
              lng: itiInfo.geolocation.lng,
            },
            startDate: startDate,
            endDate: endDate,
          },
        },
      ],
    }); */

    //for to update user by itinereies id

    const x = await UserItineraryModel.findOneAndUpdate(
      { userId: "skoekfodkse" },
      {
        $push: {
          itineraries: {
            itineraryId: Id,
            itiInfo: {
              place_Id: itiInfo.place_Id,
              place: itiInfo.place,
              geolocation: {
                lat: itiInfo.geolocation.lat,
                lng: itiInfo.geolocation.lng,
              },
              startDate: startDate,
              endDate: endDate,
            },
          },
        },
      }
    );

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
