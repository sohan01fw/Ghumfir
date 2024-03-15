import { useNavigate, redirect } from "react-router-dom";
import { useCallback, useEffect, useId, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./Trips.css";
import short from "short-uuid";
import { key } from "../../utils/exportItem";
import InputLocation from "../../Components/Map/InputLocation/InputLocation";
import MainNavigation from "../../Components/Navigation/MainNavigation";
import { useAppState } from "../../utils/Hooks/useAppState";
import { PostPlaces } from "../../lib/Actions/ServerPostActions/PostPlaces";
import { Input, Button } from "@chakra-ui/react";
import useToken from "../../lib/useToken";
const Trips = () => {
  const { state, dispatch } = useAppState();
  const { itiInfo, placeValues, user, pvalue } = state;
  const navigate = useNavigate();
  const itiId = short.generate();
  //for authorization of user
  useToken();
  if (!user) {
    navigate("/auth/login");
  }
  //state for form inputs
  const [destination, setDestination] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [errors, setErrors] = useState({});

  //validate function to validate form data
  const validateDestination = () => {
    const validationErrors = {};
    if (!destination.trim()) {
      validationErrors.destination = "Destination is required";
    }
    setErrors((prevErrors) => ({ ...prevErrors, ...validationErrors }));
  };
  // Validation function for dates
  const validateDates = () => {
    const validationErrors = {};

    if (!startDate) {
      validationErrors.startDate = "Start date is required";
    }

    if (!endDate) {
      validationErrors.endDate = "End date is required";
    }

    if (startDate && endDate && startDate > endDate) {
      validationErrors.dateRange = "End date must be after start date";
    } else {
      validationErrors.dateRange = "";
    }

    setErrors((prevErrors) => ({ ...prevErrors, ...validationErrors }));
  };

  //function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    //validate the form data
    validateDestination();
    validateDates();

    if (
      !errors.destination &&
      !errors.startDate &&
      !errors.endDate &&
      startDate &&
      endDate &&
      startDate <= endDate
    ) {
      const pId = short.generate();

      const newPlaces = await PostPlaces(pId, {
        itineraryId: itiId,
        itiInfo,
        startDate,
        endDate,
      });

      if (newPlaces) {
        navigate(`/tripPlaces/${pId}`);
      }
    } else {
      console.log("Form validation failed");
    }
  };
  console.log(pvalue);
  return (
    <>
      <MainNavigation />
      <div className="trips">
        <h2>Plan a New Trip</h2>
        <form onSubmit={handleSubmit} className="trips-form">
          <div className="destination-input">
            <label className="destination-label">Destination:</label>
            <Input
              type="text"
              value={destination}
              onChange={(e) => {
                setDestination(e.target.value);
                setErrors((prevErrors) => ({ ...prevErrors, destination: "" }));
              }}
              onBlur={validateDestination}
              placeholder="e.g pokhara,Kathmandu,Mustang"
            />
            {errors.destination && (
              <div className="error-message">{errors.destination}</div>
            )}
          </div>
          {!pvalue && (
            <InputLocation
              apiKey={key}
              destination={destination}
              getPlacesData={(data) => setDestination(data)}
            />
          )}

          <br />

          <div className="date-input">
            <label className="date-label">Start Date:</label>
            <DatePicker
              selected={startDate}
              onChange={(date) => {
                setStartDate(date);
                setErrors((prevErrors) => ({ ...prevErrors, startDate: "" }));
              }}
              onBlur={validateDates}
              dateFormat="MM/dd/yyyy"
              isClearable
              placeholderText="Select Start Date"
              showTimeInput={false}
            />

            {errors.startDate && (
              <div className="error-message">{errors.startDate}</div>
            )}
            <label className="date-label">End Date:</label>
            <DatePicker
              selected={endDate}
              onChange={(date) => {
                setEndDate(date);
                setErrors((prevErrors) => ({ ...prevErrors, endDate: "" }));
              }}
              onBlur={validateDates}
              dateFormat="MM/dd/yyyy"
              isClearable
              placeholderText="Select End Date"
            />
            {errors.endDate && (
              <div className="error-message">{errors.endDate}</div>
            )}
          </div>
          <br />
          {errors.dateRange && (
            <div className="error-message">{errors.dateRange}</div>
          )}

          <Button colorScheme=" #45a049" className="trips-button" type="submit">
            Plan Trip
          </Button>
        </form>
      </div>
    </>
  );
};

export default Trips;
