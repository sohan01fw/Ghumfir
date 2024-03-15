//posting itineriesDetails to backend server
import axios from "axios";
import { SERVER_URL } from "../../../utils/exportItem";
export const LoginForm = async (data) => {
  try {
    const xLoginValue = await axios.post(`${SERVER_URL}/api/user/login`, data);

    const returnLoginValue = {
      data: xLoginValue.data.data,
      token: xLoginValue.data.token,
      status: xLoginValue.status,
    };
    return returnLoginValue;
  } catch (error) {
    console.log(error);
  }
};
