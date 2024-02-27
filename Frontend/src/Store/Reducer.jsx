import { createContext, useContext, useReducer } from "react";

const initialState = {
  itiDetails: null,
};

const Reducer = (state = initialState, action) => {
  switch (action.type) {
    case "ITI_DETAILS":
      return {
        ...state,
        itinerariesDetails: action.payload,
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
