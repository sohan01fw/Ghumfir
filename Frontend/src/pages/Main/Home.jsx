import React, { useEffect } from "react";
import axios from "axios";
import { url } from "../../Store/ItineriesContext";

const Home = () => {
  useEffect(() => {
    axios
      .get(`${url}/api/itineries/getAllIti`)
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        throw new Error(error);
      });
  }, []);

  return <div>Home</div>;
};

export default Home;
