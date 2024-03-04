import { Request, Response } from "express";
import { AllItiDetails } from "../../types";
import { allItiDetailsModel } from "../Db/Models/allItiDetails.model";
import { PlacesModel } from "../Db/Models/Places.model";

export async function insertAllItiDetails(req: Request, res: Response) {
  try {
    const { place_itiid } = req.body;

    const { itiId, pId } = req.params;
    if (place_itiid) {
      // check the dupilcate of data.
      const findItiDup = await allItiDetailsModel.findOne({
        itineraryId: itiId,
      });
      if (!findItiDup) {
        // Save the mapped data to MongoDB
        const result = await allItiDetailsModel.create({
          userId: "6599500b1f406337e260b6cb",
          itineraryId: itiId,
          ItiDetails: [
            {
              place_itiid: place_itiid,
            },
          ],
        });
        return res.status(201).json({
          data: result,
          msg: "successfully creating ItiDetails",
        });
      } else {
        try {
          const pushplaceItiId = await allItiDetailsModel.findOneAndUpdate(
            {
              userId: "6599500b1f406337e260b6cb",
              itineraryId: itiId,
            },
            {
              $push: {
                ItiDetails: {
                  place_itiid: place_itiid,
                },
              },
            },
            { new: true, upsert: true }
          );
          return res.status(200).json({
            data: pushplaceItiId,
            msg: "successfully updating ItiDetails",
          });
        } catch (error) {
          return res.status(400).json({
            errorData: error,
            errorMsg: "error while updating  ItiDetailsModel",
          });
        }
      }
    }
  } catch (error) {
    console.log(error);
    throw new Error("Error while inserting  itiDEtails");
  }
}

export async function getSelectedPlacesDetails(req: Request, res: Response) {
  try {
    const { itiId } = req.params;

    const result = await allItiDetailsModel.findOne({
      userId: "6599500b1f406337e260b6cb",
      itineraryId: itiId,
    });

    res.status(200).json({ data: result, msg: "fetching user itiPlaceId" });
  } catch (error) {
    res
      .status(404)
      .json({ error: error, msg: "error while fetching user itineries" });
  }
}
