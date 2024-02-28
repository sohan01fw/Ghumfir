import { useNavigate } from "react-router-dom";
import { useId, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./Trips.css";
import short from "short-uuid";
import { key } from "../../utils/exportItem";
import InputLocation from "../../Components/Map/InputLocation/InputLocation";
import MainNavigation from "../../Components/Navigation/MainNavigation";
import { useAppState } from "../../utils/Hooks/useAppState";
import { postItineriesDetails } from "../../lib/Actions/ServerPostActions/PostItiDetails";
import { PostPlaces } from "../../lib/Actions/ServerPostActions/PostPlaces";

const Trips = () => {
  const { state, dispatch } = useAppState();
  const { itiInfo, placeValues } = state;
  /* const { itiInfo, postItineriesDetails, Values, addPlaceValue } =
    useTripForm(); */

  const navigate = useNavigate();
  const itiId = short.generate();
  const pId = short.generate();

  //state for form inputs
  const [destination, setDestination] = useState();
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
      const newPlaces = await PostPlaces(pId);
      if (newPlaces) {
        const res = await postItineriesDetails({
          itineraryId: itiId,
          itiInfo,
          startDate,
          endDate,
        });
        if (res) {
          const action = {
            type: "ITI_DETAILS",
            payload: res,
          };
          dispatch(action);
        }

        navigate(`/tripPlaces/${pId}`);
      }
    } else {
      console.log("Form validation failed");
    }
  };
  const handlePlaceValue = (value) => {
    const placevalueaction = {
      type: "ADD_PLACE_VALUE",
      payload: value,
    };
    dispatch(placevalueaction);
  };
  return (
    <div className="trips">
      <MainNavigation />
      <h2>Plan a New Trip</h2>
      <form onSubmit={handleSubmit} className="trips-form">
        <div className="destination-input">
          <label className="destination-label">Destination:</label>
          <input
            type="text"
            value={placeValues}
            onChange={(e) => {
              setDestination(e.target.value);
              handlePlaceValue(e.target.value);
              setErrors((prevErrors) => ({ ...prevErrors, destination: "" }));
            }}
            onBlur={validateDestination}
            placeholder="e.g pokhara,Kathmandu,Mustang"
          />
          {errors.destination && (
            <div className="error-message">{errors.destination}</div>
          )}
        </div>
        <InputLocation apiKey={key} destination={placeValues} />
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

        <button className="trips-button" type="submit">
          Plan Trip
        </button>
      </form>
    </div>
  );
};

export default Trips;
