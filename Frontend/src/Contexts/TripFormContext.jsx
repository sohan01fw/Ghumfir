import { createContext, useContext, useState } from 'react';

const TripFormContext = createContext();

// eslint-disable-next-line react/prop-types
export const TripFormProvider = ({ children }) => {
  const [tripData, setTripData] = useState({});
  return (
    <TripFormContext.Provider value={{ tripData, setTripData }}>
      {children}
    </TripFormContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useTripForm = () => useContext(TripFormContext);
