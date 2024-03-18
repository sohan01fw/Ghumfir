import { createContext, useReducer } from "react";

const initialState = {
  itiDetails: null,
  itiInfo: {},
  placeValues: null,
  pvalue: "",
  cIti: null,
  geoLocations: null,
  checkState: true,
  placesData: null,
  filterPlaceValue: null,
  triggerDeletePlace: null,
  user: null,
  Budget: null,
  expense: null,
  delexpense: null,
};

const Reducer = (state = initialState, action) => {
  switch (action.type) {
    case "ITI_DETAILS":
      return {
        ...state,
        itiDetails: action.payload,
      };
    case "ADD_PLACE_VALUE":
      return {
        ...state,
        placeValues: action.payload,
      };
    case "ADD_P_VALUE":
      return {
        ...state,
        pvalue: action.payload,
      };
    case "ADD_ITI_INFO":
      return {
        ...state,
        itiInfo: action.payload,
      };
    case "ADD_cIti":
      return {
        ...state,
        cIti: action.payload,
      };
    case "ADD_GEOLOCATION":
      return {
        ...state,
        geoLocations: action.payload,
      };
    case "CHECK_STATE":
      return {
        ...state,
        checkState: action.payload,
      };
    case "Add_PlacesData":
      return {
        ...state,
        placesData: action.payload,
      };
    case "filter_PlaceValue":
      return {
        ...state,
        filterPlaceValue: action.payload,
      };
    case "delete_PlaceValue":
      return {
        ...state,
        triggerDeletePlace: action.payload,
      };
    case "set-token":
      return {
        ...state,
        user: action.payload,
      };
    case "Budget-value":
      return {
        ...state,
        Budget: action.payload,
      };
    case "expense-value":
      return {
        ...state,
        expense: action.payload,
      };
    case "del-expense-value":
      return {
        ...state,
        delexpense: action.payload,
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
