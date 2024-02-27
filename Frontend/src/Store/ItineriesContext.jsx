// TripFormContext.js
import { createContext, useContext, useState } from "react";
import axios from "axios";
import { SERVER_URL } from "../utils/exportItem";
import { AppContext } from "./Reducer";
export const TripFormContext = createContext();
const useTripForm = () => {
  const context = useContext(TripFormContext);
  if (!context) {
    throw new Error("useTripForm must be used within a TripFormProvider");
  }
  return context;
};

// eslint-disable-next-line react/prop-types
const TripFormProvider = ({ children }) => {
  const { state, dispatch } = useContext(AppContext);

  const [itiInfo, setitiInfo] = useState({});
  const [Values, setValues] = useState();
  const [cIti, setCIti] = useState();
  const [resData, setResData] = useState();
  const [geoLocations, setGeoLocation] = useState();

  const [checkState, setcheckState] = useState(true);

  const addPlaceValue = (value) => {
    setValues(value);
  };
  //adding intineries info in state
  const addItineriesInfo = (itineriesInfos) => {
    setitiInfo(itineriesInfos);
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

        /*     postAndGetAllDetails, */
        cIti,
        setCIti,
        resData,
        geoLocations,
        setGeoLocation,
        checkState,
        setcheckState,
      }}
    >
      {children}
    </TripFormContext.Provider>
  );
};

export { TripFormProvider, useTripForm };
