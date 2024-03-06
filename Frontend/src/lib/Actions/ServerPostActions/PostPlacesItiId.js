//posting itineriesDetails to backend server
import axios from "axios";
import { SERVER_URL } from "../../../utils/exportItem";
export const PostPlacesItiId = async (itiId, data) => {
  try {
    const xValue = await axios.post(
      `${SERVER_URL}/api/place-details/insertPlaceItiId/${itiId}`,
      { place_itiid: data }
    );

    const res = xValue.data.data;
    return res;
  } catch (error) {
    console.log(error);
  }
};
