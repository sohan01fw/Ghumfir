import axios from "axios";
import { SERVER_URL } from "../../../utils/exportItem";

export const Logout = async () => {
  try {
    const response = await axios.delete(`${SERVER_URL}/api/user/logout`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
