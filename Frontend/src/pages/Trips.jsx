import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// import FormInput from "../Components/FormInput/FormInput";

import "./Trips.css";
const Trips = () => {
  //state for form inputs
  const [destination, setDestination] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [errors, setErrors] = useState({});

  //set of hard coded valid destinations
  const validDestination = ["kathmandu", "pokhara", "lumbini", "mustang"];



    //validate function to validate form data
    const validateDestination = () => {
      const validationErrors = {};

      if (!destination.trim()) {
        validationErrors.destination = "Destination is required";
      } else if (!validDestination.includes(destination.trim())) {
        validationErrors.destination = "Invalid Destination";
      }
      setErrors((prevErrors) => ({...prevErrors, ...validationErrors}));
    };  // Validation function for dates
    const validateDates = () => {
      const validationErrors = {};
  
      if (!startDate) {
        validationErrors.startDate = 'Start date is required';
      }
  
      if (!endDate) {
        validationErrors.endDate = 'End date is required';
      }
  
      if (startDate && endDate && startDate > endDate) {
        validationErrors.dateRange = 'End date must be after start date';
      }
  
      setErrors((prevErrors) => ({ ...prevErrors, ...validationErrors }));
    };
  
    //function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    //validate the form data
    validateDestination();
    validateDates();

      if (!startDate) {
        setErrors((prevErrors) => ({ ...prevErrors, startDate: 'Start date is required' }));
      }
  
      if (!endDate) {
        setErrors((prevErrors) => ({ ...prevErrors, endDate: 'End date is required' }));
      }
  
      if (startDate && endDate && startDate > endDate) {
        setErrors((prevErrors) => ({ ...prevErrors, dateRange: 'End date must be after start date' }));
      }
  
      // If there are no errors, proceed with form submission
      if (Object.keys(errors).length === 0) {
        console.log('Form submitted successfully');
      }
  

    //perform actions to form data (send to server later)
    console.log("Destination:", destination);
    console.log("Start Date:", startDate);
    console.log("End Date:", endDate);
  };

  return (
    // <div className="trips">
      <form onSubmit={handleSubmit} className="trips-form">
        <label>
          Destination:
          <input
            type="text"
            value={destination}
            onChange={(e) => {
              setDestination(e.target.value);
              setErrors((prevErrors) => ({ ...prevErrors, destination: '' }));
              // validateDestination();
            }}
            onBlur={validateDestination}
          />
          {errors.destination && (
            <div className="error-message">{errors.destination}</div>
          )}
        </label>
        <br />

        <label className="date-label">
          Start Date:
          <DatePicker
            selected={startDate}
            onChange={(date) =>{
               setStartDate(date);
              //clear date error when the user selects a new data
              setErrors((prevErrors)=> ({...prevErrors,startDate: ''}));
              }}
              onBlur={validateDates}
            dateFormat="MM/dd/yyyy"
            isClearable
            placeholderText="Select Start Date"
          />
          {errors.startDate && (
            <div className="error-message">{errors.startDate}</div>
          )}
        </label>
        <br />

        <label className="date-label">
          End Date:
          <DatePicker
            selected={endDate}
            onChange={(date) => {
              setEndDate(date);
              setErrors((prevErrors)=> ({...prevErrors,endDate : ''}));
            }}
            onBlur={validateDates}
            dateFormat="MM/dd/yyyy"
            isClearable
            placeholderText="Select End Date"
          />
          {errors.endDate && (
            <div className="error-message">{errors.endDate}</div>
          )}
        </label>
        <br />
        {errors.dateRange && (
          <div className="error-message">{errors.dateRange}</div>
        )}

        <button type="submit">Plan Trip</button>
      </form>
    // </div>
  );
};

export default Trips;
