import React, { useEffect } from "react";
import axios from "axios";
import { SERVER_URL } from "../../utils/exportItem";

const Home = () => {
  useEffect(() => {
    axios
      .get(`${SERVER_URL}/api/itineries/getAllIti`)
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
