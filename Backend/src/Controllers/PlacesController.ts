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
    const createPlaces = await PlacesModel.create({
      placesId: pId,
      user: "6599500b1f406337e260b6cb",
      places: [],
    });
    res.send(createPlaces);
  } catch (error) {
    throw new Error(error);
  }
}
