// TripFormContext.js
import { createContext, useContext, useState } from "react";
import axios from "axios";
export const TripFormContext = createContext();
const url = "http://localhost:8000";
const useTripForm = () => {
  const context = useContext(TripFormContext);
  if (!context) {
    throw new Error("useTripForm must be used within a TripFormProvider");
  }
  return context;
};

// eslint-disable-next-line react/prop-types
const TripFormProvider = ({ children }) => {
  const [itiInfo, setitiInfo] = useState({});
  const [Values, setValues] = useState();

  const addPlaceValue = (value) => {
    setValues(value);
  };
  //adding intineries info in state
  const addItineriesInfo = (itineriesInfos) => {
    setitiInfo(itineriesInfos);
  };
  //posting itineriesDetails to backend server
  const postItineriesDetails = (itineriesDetails) => {
    axios
      .post(`${url}/api/itineries/create-Itineries`, itineriesDetails)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <TripFormContext.Provider
      value={{
        addPlaceValue,
        addItineriesInfo,
        itiInfo,
        Values,
        postItineriesDetails,
      }}
    >
      {children}
    </TripFormContext.Provider>
  );
};

export { TripFormProvider, useTripForm };
