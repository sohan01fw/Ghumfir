import {
  deleteSelectedPlacesId,
  getSelectedPlacesDetails,
  insertAllItiDetails,
} from "../Controllers/itiDetailsInfoController";

import express from "express";

export const placeDetailsRoute = express.Router();
//inserting all itiDetails in db
placeDetailsRoute.route("/insertPlaceItiId/:itiId").post(insertAllItiDetails);

placeDetailsRoute
  .route("/getItiPlacesDetails/:itiId")
  .get(getSelectedPlacesDetails);

placeDetailsRoute
  .route("/deleteItiPlacesDetails/:itiId/:place_ItiId")
  .delete(deleteSelectedPlacesId);
