import { Request, Response } from "express";
import { AllItiDetails } from "../../types";
import { allItiDetailsModel } from "../Db/Models/allItiDetails.model";
import { PlacesModel } from "../Db/Models/Places.model";

export async function insertAllItiDetails(req: Request, res: Response) {
  try {
    const { place_itiid } = req.body;
    const userID = req.user._id;
    const { itiId } = req.params;
    if (place_itiid) {
      // check the dupilcate of data.
      const findItiDup = await allItiDetailsModel.findOne({
        itineraryId: itiId,
      });
      if (!findItiDup) {
        // Save the mapped data to MongoDB
        const result = await allItiDetailsModel.create({
          userId: userID,
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
              userId: userID,
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
    const userID = req.user._id;
    const result = await allItiDetailsModel.findOne({
      userId: userID,
      itineraryId: itiId,
    });

    res.status(200).json({ data: result, msg: "fetching user itiPlaceId" });
  } catch (error) {
    res
      .status(404)
      .json({ error: error, msg: "error while fetching user itineries" });
  }
}

//deleting specific id

export async function deleteSelectedPlacesId(req: Request, res: Response) {
  try {
    const { place_ItiId, itiId } = req.params;
    const deletePlaces = await allItiDetailsModel.findOneAndUpdate(
      {
        itineraryId: itiId,
      },
      {
        $pull: {
          ItiDetails: { place_itiid: place_ItiId },
        },
      },
      { new: true }
    );

    /* if (deletePlaces.AllPlaces[0].places.length === 0) {
      const deletePla = await PlacesModel.findOneAndUpdate(
        { user: "6599500b1f406337e260b6cb", "AllPlaces.places_Id": pId },
        {
          $pull: {
            AllPlaces: {
              places_Id: pId,
            },
          },
        },
        { new: true }
      );
      return res.status(200).json({
        data: deletePla,
        msg: "successfully delete allplaces elements",
      });
    } */

    return res.status(200).json({
      data: deletePlaces,
      msg: "successfully delete Places data",
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ errorData: error, errorMsg: "error while deleting place data" });
  }
}
