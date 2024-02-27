import React, { useContext, useEffect } from "react";
import axios from "axios";
import { SERVER_URL } from "../../utils/exportItem";
import { useAppState } from "../../utils/Hooks/useAppState";

const Home = () => {
  const { state } = useAppState();

  /*  useEffect(() => {
    axios
      .get(`${SERVER_URL}/api/itineries/getAllIti`)
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        throw new Error(error);
      });
  }, []); */
  const { itiDetails } = state;
  console.log("checking reducer from homepage", itiDetails);
  return <div>Home</div>;
};

export default Home;
