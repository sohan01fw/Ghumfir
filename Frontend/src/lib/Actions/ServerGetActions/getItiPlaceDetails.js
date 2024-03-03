import axios from "axios";
import { SERVER_URL } from "../../../utils/exportItem";

export const getPlacesDetails = async (itiId) => {
  try {
    const response = await axios.get(
      `${SERVER_URL}/api/place-details/getDetails/${itiId}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
