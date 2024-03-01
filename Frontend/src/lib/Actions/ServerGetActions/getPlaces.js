import axios from "axios";
import { SERVER_URL } from "../../../utils/exportItem";

export const getPlaces = async (pId) => {
  try {
    const response = await axios.get(
      `${SERVER_URL}/api/places/getplaces/${pId}`
    );
    console.log(response.data.data);
    return response.data.data;
  } catch (error) {
    console.error(error);
  }
};
