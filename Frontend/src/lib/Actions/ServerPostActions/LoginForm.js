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
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx

      const errorRes = {
        errData: error.response.data,
        errStatus: error.response.status,
      };
      return errorRes;
    }
  }
};
