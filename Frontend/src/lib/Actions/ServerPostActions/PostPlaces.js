//posting itineriesDetails to backend server
import axios from "axios";
import { SERVER_URL } from "../../../utils/exportItem";
export const PostPlaces = async (pId, data) => {
  try {
    const resData = await axios.post(
      `${SERVER_URL}/api/places/createplaces/${pId}`,
      data
    );
    const x = resData.data.data;
    return x;
  } catch (error) {
    console.log(error);
  }
};
