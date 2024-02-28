//posting itineriesDetails to backend server
import axios from "axios";
import { SERVER_URL } from "../../../utils/exportItem";
export const PostPlaces = async (pId) => {
  await axios
    .post(`${SERVER_URL}/api/places/createplaces/${pId}`)
    .then(function (response) {
      let x = response.data;
      return x;
    })
    .catch(function (error) {
      console.log(error);
    });
};
