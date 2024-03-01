//posting itineriesDetails to backend server
import axios from "axios";
import { SERVER_URL } from "../../../utils/exportItem";
export const postItineriesDetails = async (pId, itineriesDetails) => {
  try {
    const xValue = await axios.post(
      `${SERVER_URL}/api/itineries/create-Itineries/${pId}`,
      itineriesDetails
    );

    const res = xValue.data.data;
    return res;
  } catch (error) {
    console.log(error);
  }
};
