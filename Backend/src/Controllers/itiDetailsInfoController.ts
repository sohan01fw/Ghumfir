import { Request, Response } from "express";
import { AllItiDetails } from "../../types";
import { allItiDetailsModel } from "../Db/Models/itiInfoDetails/allItiDetails.model";
import { UserItineraryModel } from "../Db/Models/itineraries.model";

export async function insertAllItiDetails(req: Request, res: Response) {
  try {
    const xData = req.body;
    const xParams = req.params;
    const findUserIti = await UserItineraryModel.findOne({
      itineraryId: xParams.itiId,
    });

    if (findUserIti) {
      // Save the mapped data to MongoDB
      const result = await allItiDetailsModel.create({
        ItiDetails: xData,
      });

      if (result) {
        console.log(result._id);
        const pushAllItiId = await UserItineraryModel.findOneAndUpdate(
          { itineraryId: xParams.itiId },
          { $set: { ItiDetails: result._id } }
        );
        console.log("allItiId:", pushAllItiId);
      }
      res.json({ result: result });
    }
  } catch (error) {
    throw new Error("Error while inserting many itineraries");
  }
}
