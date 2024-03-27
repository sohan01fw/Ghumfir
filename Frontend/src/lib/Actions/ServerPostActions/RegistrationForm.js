//posting itineriesDetails to backend server
import axios from "axios";
import { SERVER_URL } from "../../../utils/exportItem";
export const RegistrationForm = async (data) => {
  try {
    const xRegisterValue = await axios.post(
      `${SERVER_URL}/api/user/register`,
      data
    );
    const returnRegisterValue = {
      data: xRegisterValue.data.data,
      status: xRegisterValue.status,
    };
    return returnRegisterValue;
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
