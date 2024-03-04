import axios from "axios";
import { SERVER_URL } from "../../../utils/exportItem";

export const GetPlacesItiId = async (itiId) => {
  try {
    const response = await axios.get(
      `${SERVER_URL}/api/place-details/getItiPlacesDetails/${itiId}`
    );

    return response.data.data;
  } catch (error) {
    console.error(error);
  }
};
