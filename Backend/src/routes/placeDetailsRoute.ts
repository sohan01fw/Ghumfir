import {
  getSelectedPlacesDetails,
  insertAllItiDetails,
} from "../Controllers/itiDetailsInfoController";

import express from "express";

export const placeDetailsRoute = express.Router();
//inserting all itiDetails in db
placeDetailsRoute
  .route("/insertPlaceItiId/:pId/:itiId")
  .post(insertAllItiDetails);

placeDetailsRoute
  .route("/getItiPlacesDetails/:itiId")
  .get(getSelectedPlacesDetails);
