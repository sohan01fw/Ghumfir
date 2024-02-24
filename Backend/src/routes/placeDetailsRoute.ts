import {
  getSelectedPlacesDetails,
  insertAllItiDetails,
} from "../Controllers/itiDetailsInfoController";

import express from "express";

export const placeDetailsRoute = express.Router();
//inserting all itiDetails in db
placeDetailsRoute
  .route("/insertAllItiDetails/:itiId")
  .post(insertAllItiDetails);

placeDetailsRoute.route("/getDetails/:itiId").get(getSelectedPlacesDetails);
