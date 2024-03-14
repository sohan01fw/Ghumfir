import {
  deleteSelectedPlacesId,
  getSelectedPlacesDetails,
  insertAllItiDetails,
} from "../Controllers/itiDetailsInfoController";
import { myMiddleware } from "../Middleware/userMiddleware.ts";

import express from "express";

export const placeDetailsRoute = express.Router();
//inserting all itiDetails in db
placeDetailsRoute
  .route("/insertPlaceItiId/:itiId")
  .post(myMiddleware, insertAllItiDetails);

placeDetailsRoute
  .route("/getItiPlacesDetails/:itiId")
  .get(myMiddleware, getSelectedPlacesDetails);

placeDetailsRoute
  .route("/deleteItiPlacesDetails/:itiId/:place_ItiId")
  .delete(myMiddleware, deleteSelectedPlacesId);
