//posting itineriesDetails to backend server
import axios from "axios";
export const Airecomend = async (data) => {
  try {
    const xaiValue = await axios.post(`http://127.0.0.1:5000/recommend`, data);
    return xaiValue?.data;
  } catch (error) {
    console.log(error);
  }
};
