// TripFormContext.js
import  { createContext, useContext, useState } from 'react';

const TripFormContext = createContext();

// eslint-disable-next-line react/prop-types
export const TripFormProvider = ({ children }) => {
  const [tripData, setTripData] = useState({
    destination: '',
    startDate: null,
    endDate: null,
    itinerary: [],
  });

  return (
    <TripFormContext.Provider value={{ tripData, setTripData }}>
      {children}
    </TripFormContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useTripForm = () => {
  const context = useContext(TripFormContext);
  if (!context) {
    throw new Error('useTripForm must be used within a TripFormProvider');
  }
  return context;
};
