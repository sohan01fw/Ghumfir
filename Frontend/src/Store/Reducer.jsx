import { createContext, useReducer } from "react";

const initialState = {
  itiDetails: null,
  itiInfo: {},
  placeValues: null,
  cIti: null,
  geoLocations: null,
  checkState: true,
  placesData: null,
};

const Reducer = (state = initialState, action) => {
  switch (action.type) {
    case "ITI_DETAILS":
      return {
        itiDetails: action.payload,
      };
    case "ADD_PLACE_VALUE":
      return {
        placeValues: action.payload,
      };
    case "ADD_ITI_INFO":
      return {
        itiInfo: action.payload,
      };
    case "ADD_cIti":
      return {
        cIti: action.payload,
      };
    case "ADD_GEOLOCATION":
      return {
        geoLocations: action.payload,
      };
    case "CHECK_STATE":
      return {
        checkState: action.payload,
      };
    case "Add_PlacesData":
      return {
        placesData: action.payload,
      };
    default:
      return state;
  }
};

//define context
export const AppContext = createContext({
  state: initialState,
  dispatch: () => null,
});

//getting state or dispatch from appcontext

//wraaping all the children down the component tree
export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, initialState);
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};
