//posting itineriesDetails to backend server
import axios from "axios";
import { SERVER_URL } from "../../../utils/exportItem";
export const postItineriesDetails = async (itineriesDetails) => {
  await axios
    .post(`${SERVER_URL}/api/itineries/create-Itineries`, itineriesDetails)
    .then(function (response) {
      let x = response.data;
      return x;
    })
    .catch(function (error) {
      console.log(error);
    });
};
