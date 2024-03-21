import axios from "axios";
import { SERVER_URL } from "../../../utils/exportItem";

export const getAllPlaces = async (id) => {
  try {
    const response = await axios.get(`${SERVER_URL}/api/places/getAllPlaces`);
    const x = response?.data?.data?.AllPlaces.map((data, index) => {
      // Add index parameter
      let returnData = {
        id: data?.places_Id,
        dates: { startDate: data?.startDate, endDate: data?.endDate },
        places: data?.places[0]?.itiInfo.place,
      };
      return returnData;
    });
    return x;
    return;
  } catch (error) {
    console.error(error);
  }
};
