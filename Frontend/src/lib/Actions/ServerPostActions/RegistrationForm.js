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
    console.log(error);
  }
};
