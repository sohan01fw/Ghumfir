// TripFormContext.js
import { createContext, useContext, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
export const TripFormContext = createContext();
export const url = "http://localhost:8000";
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
  const [cIti, setCIti] = useState();
  const [resData, setResData] = useState();
  const [geoLocations, setGeoLocation] = useState();

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
        setResData(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  //Get all Details of place details from backend server
  /*  const postAndGetAllDetails = (allItiDetails) => {
   
  }; */

  return (
    <TripFormContext.Provider
      value={{
        addPlaceValue,
        addItineriesInfo,
        itiInfo,
        Values,
        postItineriesDetails,
        /*     postAndGetAllDetails, */
        cIti,
        setCIti,
        resData,
        geoLocations,
        setGeoLocation,
      }}
    >
      {children}
    </TripFormContext.Provider>
  );
};

export { TripFormProvider, useTripForm };
