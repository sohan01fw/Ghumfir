import { PlacesModel } from "../Db/Models/Places.model.ts";
import { Request, Response } from "express";
import { Places } from "../../types";

export async function createPlaces(req: Request, res: Response) {
  try {
    //verify the user is aunthenitcate or not
    //now save that placesid to db with array of places->contain created place obj(_id)
    //if already created placesId then just update the places array.
    //first placesid come from client side get from params
    const { pId } = req.params;
    const tripDetails = req.body;

    const { itineraryId, itiInfo, startDate, endDate } = tripDetails;
    const findUser = await PlacesModel.findOne({
      user: "6599500b1f406337e260b6cb",
    });

    if (!findUser) {
      const createPlaces = await PlacesModel.create({
        user: "6599500b1f406337e260b6cb",
        AllPlaces: [
          {
            places_Id: pId,
            startDate: startDate,
            endDate: endDate,
            places: [
              {
                itineraryId: itineraryId,
                itiInfo: {
                  place_Id: itiInfo?.place_Id || null,
                  place: itiInfo?.place || null,
                  geolocation: {
                    lat: itiInfo?.geolocation?.lat || null,
                    lng: itiInfo?.geolocation?.lng || null,
                  },
                  ItiDetails: null,
                },
              },
            ],
          },
        ],
      });
      if (!createPlaces) {
        return res
          .status(400)
          .json({ error: "error while creating placesmodel" });
      }
      return res.status(201).json({
        data: createPlaces,
        msg: "successfully creating placesModel",
      });
    } else {
      const findPlace = await PlacesModel.findOne({
        user: "6599500b1f406337e260b6cb",
      });
      const findpId = findPlace.AllPlaces.find(
        (place: any) => place.places_Id === pId
      );
      if (!findpId) {
        const updateFindPlace = await PlacesModel.findOneAndUpdate(
          { user: "6599500b1f406337e260b6cb" },
          {
            $push: {
              AllPlaces: {
                places_Id: pId,
                startDate: startDate,
                endDate: endDate,
                places: [
                  {
                    itineraryId: itineraryId,
                    itiInfo: {
                      place_Id: itiInfo?.place_Id || null,
                      place: itiInfo?.place || null,
                      geolocation: {
                        lat: itiInfo?.geolocation?.lat || null,
                        lng: itiInfo?.geolocation?.lng || null,
                      },
                      ItiDetails: null,
                    },
                  },
                ],
              },
            },
          },
          { new: true, upsert: true }
        );
        if (!updateFindPlace) {
          return res.status(500).json({
            msg: "server errror while updating place model",
          });
        }
        return res.status(200).json({
          data: updateFindPlace,
          msg: "successfully update the place model",
        });
      } else {
        const updateplacesArray = await PlacesModel.findOneAndUpdate(
          {
            user: "6599500b1f406337e260b6cb",
            AllPlaces: { $elemMatch: { places_Id: pId } },
          },
          {
            $push: {
              "AllPlaces.$.places": {
                itineraryId: itineraryId,
                itiInfo: {
                  place_Id: itiInfo?.place_Id || null,
                  place: itiInfo?.place || null,
                  geolocation: {
                    lat: itiInfo?.geolocation?.lat || null,
                    lng: itiInfo?.geolocation?.lng || null,
                  },
                  ItiDetails: null,
                },
              },
            },
          },
          { new: true, upsert: true }
        );
        if (!updateplacesArray) {
          return res.status(400).json({
            errorMsg: "Failed to update the places arrary in place model",
          });
        }
        return res.status(200).json({
          Msg: "sucessfully update the place array",
          data: updateplacesArray,
        });
      }
    }
  } catch (error) {
    return res.status(500).json({
      error: error,
      msg: "server errror ",
    });
  }
}

export async function getPlaces(req: Request, res: Response) {
  try {
    const { pId } = req.params;

    const getPlacesRes = await PlacesModel.findOne(
      {
        user: "6599500b1f406337e260b6cb",
        "AllPlaces.places_Id": pId,
      },
      { _id: 0, "AllPlaces.$": 1 }
    );

    //structuring response data
    const structResData = getPlacesRes.AllPlaces[0].places;

    if (!getPlacesRes) {
      return res.status(404).json({ error: "Data not found" });
    }

    return res.status(200).json({
      data: structResData,
      msg: "successfully getting Places data",
    });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
}
