import { UserModel } from "../Db/Models/User.model.ts";
import { Itineraries } from "../../types/index";
import { UserItineraryModel } from "../Db/Models/itineraries.model.ts";
import { Request, Response } from "express";
import { PlacesModel } from "../Db/Models/Places.model.ts";

//creating triplan route handler
export default async function createItineries(req: Request, res: Response) {
  try {
    const tripDetails = req.body;
    let userId = "skoekfodkse";
    const { itineraryId, itiInfo, startDate, endDate } = tripDetails;
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
              user: "6599500b1f406337e260b6cb",
              itineraryId: itineraryId,
              itiInfo: {
                place_Id: itiInfo?.place_Id,
                place: itiInfo?.place,
                geolocation: {
                  lat: itiInfo?.geolocation.lat,
                  lng: itiInfo?.geolocation.lng,
                },
                ItiDetails: null,
                startDate: startDate,
                endDate: endDate,
              },
            },
          ],
        });
        if (tripSave) {
          const { pId } = req.params;

          try {
            const updatePlaceModel = await PlacesModel.findOneAndUpdate(
              { user: "6599500b1f406337e260b6cb", "AllPlaces.placesId": pId },
              {
                AllPlaces: {
                  $push: {
                    places: {
                      itineraryId: tripSave.itineraries.itineraryId,
                      itiPlaces: tripSave._id,
                    },
                  },
                },
              },
              { new: true, upsert: true }
            );
            if (!updatePlaceModel) {
              res.status(400).json({
                status: "400",
                msg: "error while updating places model",
              });
            }
          } catch (error) {
            res.status(400).json({
              status: "500",
              msg: "error while updating places model",
            });
          }
        }
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
                user: "6599500b1f406337e260b6cb",
                itineraryId: itineraryId,
                itiInfo: {
                  place_Id: itiInfo.place_Id,
                  place: itiInfo.place,
                  geolocation: {
                    lat: itiInfo.geolocation.lat,
                    lng: itiInfo.geolocation.lng,
                  },
                  ItiDetails: null,
                  startDate: startDate,
                  endDate: endDate,
                },
              },
            },
          },
          { new: true, upsert: true }
        );

        if (x) {
          const findX = await UserItineraryModel.findOne(
            {
              "itineraries.itineraryId": itineraryId,
            },
            { _id: 0, "itineraries.$": 1 }
          );
          if (findX) {
            const { pId } = req.params;
            try {
              const findmodel = await PlacesModel.findOne({
                user: "6599500b1f406337e260b6cb",
                "AllPlaces.placesId": pId,
              });
              console.log(findmodel);
              /*  const updatepmodel = await PlacesModel.findOneAndUpdate(
                { user: "6599500b1f406337e260b6cb", "AllPlaces.placesId": pId },
                {
                  $push: {
                    "AllPlaces.$.places": {
                      itineraryId: findX.itineraries[0].itineraryId,
                      itiPlaces: findX.itineraries[0]._id,
                    },
                  },
                },
                { new: true, upsert: true }
              );
              if (!updatepmodel) {
                res.status(400).json({
                  status: "500",
                  msg: "error while updating places model",
                });
              }
               */
            } catch (error) {
              console.log(error);
              res.status(400).json({
                status: "500",
                msg: "error while processing places model update",
              });
            }
          }
        }
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
    )
      .populate("itineraries.user", "name email")
      .populate("itineraries.itiInfo.ItiDetails");

    res.send(result);
  } catch (error) {
    console.log(error);
    res.status(404).json({ msg: "error while fetching user itineries" });
  }
}

//get all itineraries with users for homepage in client side
export async function getAllItineries(req: Request, res: Response) {
  try {
    const result = await UserItineraryModel.findOne({
      userId: "skoekfodkse",
    });

    res.send(result);
  } catch (error) {
    console.log(error);
    res.status(404).json({ msg: "error while fetching all itineries" });
  }
}
