import { Request, Response } from "express";
import { AllItiDetails } from "../../types";
import { allItiDetailsModel } from "../Db/Models/itiInfoDetails/allItiDetails.model";
import { PlacesModel } from "../Db/Models/Places.model";

export async function insertAllItiDetails(req: Request, res: Response) {
  try {
    const xData = req.body;

    const xParams = req.params;
    if (xData.length !== 0) {
      const findUserIti = await PlacesModel.findOne({
        userId: "skoekfodkse",
      });
      // check the dupilcate of data.
      const findItiDup = await allItiDetailsModel.findOne({
        itineraryId: xParams.itiId,
      });
      if (findUserIti && !findItiDup) {
        // Save the mapped data to MongoDB
        const result = await allItiDetailsModel.create({
          itineraryId: xParams.itiId,
          ItiDetails: xData,
        });
        if (result) {
          console.log(result._id);
          try {
            const pushAllItiId = await PlacesModel.findOneAndUpdate(
              {
                userId: "skoekfodkse",
                "itineraries.itineraryId": xParams.itiId,
              },
              { $set: { "itineraries.$.itiInfo.ItiDetails": result._id } },
              //to get the sepecific data.
              { _id: 0, "itineraries.$": 1 }
            );
            res.send("successfully send");
          } catch (error) {
            console.log(error);
            throw new Error("Error while inserting id to userItinerary model");
          }
        }
      } else {
        try {
          const pushAllItiId = await allItiDetailsModel.findOneAndUpdate(
            {
              itineraryId: xParams.itiId,
            },
            { $push: { ItiDetails: xData } },
            { new: true, upsert: true }
          );
          console.log(pushAllItiId);
          res.send("successsfully updated");
        } catch (error) {
          throw new Error("Error while updating places details");
        }
      }
    }
  } catch (error) {
    console.log(error);
    throw new Error("Error while inserting many itineraries");
  }
}

export async function getSelectedPlacesDetails(req: Request, res: Response) {
  try {
    const { itiId } = req.params;

    const result = await allItiDetailsModel.findOne({
      itineraryId: itiId,
    });

    res.send(result);
  } catch (error) {
    console.log(error);
    res.status(404).json({ msg: "error while fetching user itineries" });
  }
}
