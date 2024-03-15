import axios from "axios";
import { SERVER_URL } from "../../../utils/exportItem";

export const getAccessToken = async () => {
  try {
    const response = await axios.get(`${SERVER_URL}/api/user/new-accessToken`);

    return response;
  } catch (error) {
    console.error(error);
  }
};
