import { Request, Response } from "express";
import { AllItiDetails } from "../../types";
import { allItiDetailsModel } from "../Db/Models/itiInfoDetails/allItiDetails.model";
import { UserItineraryModel } from "../Db/Models/itineraries.model";

export async function insertAllItiDetails(req: Request, res: Response) {
  try {
    const xData = req.body;

    const xParams = req.params;
    if (xData.length !== 0) {
      console.log(xData.length);
      const findUserIti = await UserItineraryModel.findOne({
        userId: "skoekfodkse",
      });

      if (findUserIti) {
        // Save the mapped data to MongoDB
        const result = await allItiDetailsModel.create({
          ItiDetails: xData,
        });

        if (result) {
          console.log(result._id);
          try {
            const pushAllItiId = await UserItineraryModel.findOneAndUpdate(
              {
                userId: "skoekfodkse",
                "itineraries.itineraryId": xParams.itiId,
              },
              { itiInfo: { ItiDetails: result._id } },
              { new: true, upsert: true }
            );
            console.log("allItiId:", pushAllItiId);
          } catch (error) {
            console.log(error);
            throw new Error("Error while inserting id to userItinerary model");
          }
        }
        res.json({ result: result });
      }
    }
  } catch (error) {
    throw new Error("Error while inserting many itineraries");
  }
}
