import { UserModel } from "../Db/Models/User.model.ts";
import { Itineraries } from "../../types/index";
import { UserItineraryModel } from "../Db/Models/itineraries.model.ts";
import { Request, Response } from "express";

//creating triplan route handler
export default async function createItineries(req: Request, res: Response) {
  try {
    const tripDetails = req.body;
    let userId = "skoekfodkse";
    const { itineraryId, itiInfo, startDate, endDate } =
      tripDetails as Itineraries;
    if (!userId) {
      res.status(401).json({ status: "400", msg: "unauthorized user" });
    }
    //find userItinerarymodel in db
    const userItinerary = await UserItineraryModel.findOne({ userId });
    if (!userItinerary) {
      try {
        //"user": "6577138a804848196c8ba92f",
        const tripSave = await UserItineraryModel.create({
          userId: userId,
          itineraries: [
            {
              user: "6577138a804848196c8ba92f",
              itineraryId: itineraryId,
              itiInfo: {
                place_Id: itiInfo?.place_Id,
                place: itiInfo?.place,
                geolocation: {
                  lat: itiInfo?.geolocation.lat,
                  lng: itiInfo?.geolocation.lng,
                },
                startDate: startDate,
                endDate: endDate,
              },
            },
          ],
        });
        console.log(tripSave);
        res.status(201).json({ status: "201", msg: "userTripplan is created" });
      } catch (error) {
        console.log(error);
        res
          .status(400)
          .json({ status: "400", msg: "error while create trip plan" });
      }
    } else {
      //for to update user by itinereies id
      try {
        const x = await UserItineraryModel.findOneAndUpdate(
          { userId: "skoekfodkse" },
          {
            $push: {
              itineraries: {
                itineraryId: itineraryId,
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
        res.status(201).json({ status: "201", msg: "userTripplan is updated" });
      } catch (error) {
        res
          .status(400)
          .json({ status: "400", msg: "error while updating trip plan" });
      }
    }
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json({ status: "400", msg: "error while processing trip plan" });
  }
}

//get all users itineries
export async function getItineriesById(req: Request, res: Response) {
  try {
    const { id } = req.params;

    const result = await UserItineraryModel.findOne(
      { userId: "skoekfodkse", "itineraries.itineraryId": id },
      { _id: 0, "itineraries.$": 1 }
    ).populate("itineraries.user", "name email");

    res.send(result);
  } catch (error) {
    console.log(error);
    res.status(404).json({ msg: "error while fetching user itineries" });
  }
}
