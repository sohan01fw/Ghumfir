import { Request, Response } from "express";
import { AllItiDetails } from "../../types";
import { allItiDetailsModel } from "../Db/Models/itiInfoDetails/allItiDetails.model";

export async function insertAllItiDetails(req: Request, res: Response) {
  try {
    const x: AllItiDetails = req.body;

    /*  allItiDetailsModel
      .insertMany(x)
      .then((result) => {
        res.send(result);
        console.log(`${result.length} documents inserted successfully.`);
      })
      .catch((error) => {
        console.error(`Error inserting documents: ${error}`);
      }); */
  } catch (error) {
    throw new Error("Error while inserting many itineraries");
  }
}
