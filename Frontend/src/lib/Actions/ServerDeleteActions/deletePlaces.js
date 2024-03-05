import axios from "axios";
import { SERVER_URL } from "../../../utils/exportItem";

export const deletePlaces = async (pId, id) => {
  let itiIds = id.itiId;
  try {
    const response = await axios.delete(
      `${SERVER_URL}/api/places/deleteplaces/${pId}/${itiIds}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
