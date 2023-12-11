// TripDetails.js
import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import { useTripForm } from "../Contexts/TripFormContext";

import './TripDetails.css';
import SideBar from "../Components/Navigation/SideBar";

const TripDetails = () => {
  const { tripData, setTripData } = useTripForm();
  const navigate = useNavigate();
  const [newPlace, setNewPlace] = useState("");
  const [selectedDay, setSelectedDay] = useState(1);

  const getDaysArray = (start, end) => {
    const daysArray = [];
    for (
      let currentDate = start;
      currentDate <= end;
      currentDate.setDate(currentDate.getDate() + 1)
    ) {
      daysArray.push(new Date(currentDate));
    }
    return daysArray;
  };

  const daysBetween = getDaysArray(
    new Date(tripData.startDate),
    new Date(tripData.endDate)
  );

  const handleAddPlace = () => {
    if (newPlace.trim() !== "") {
      setTripData((prevData) => {
        const updatedItinerary = [...prevData.itinerary];
        const dayIndex = selectedDay - 1;
        updatedItinerary[dayIndex] = [
          ...(updatedItinerary[dayIndex] || []),
          newPlace,
        ];
        return {
          ...prevData,
          itinerary: updatedItinerary,
        };
      });

      setNewPlace("");
    }
  };

  return (
    <div className="trip-details">
      <SideBar />
      <div className="content">
      <Routes>
        <Route path = "/places" element = {<PlacesToVisit />}></Route>
        <Route path = "/itineraries" element = {<Itineraries />}></Route>
        <Route path = "/budget" element = {<Budget />}></Route>
      </Routes>
      </div>
      <div>
        <h2>Trip Details</h2>
        <p>Destination: {tripData.destination}</p>
        <p>Start Date: {tripData.startDate}</p>
        <p>End Date: {tripData.endDate}</p>
      </div>

      {daysBetween.map((day, index) => (
        <div key={index}>
          <h3>{`Day ${index + 1} - ${day.toDateString()}`}</h3>
          <ul>
            {tripData.itinerary &&
              tripData.itinerary[index] &&
              tripData.itinerary[index].map((place, placeIndex) => (
                <li key={placeIndex}>{place}</li>
              ))}
          </ul>
          <form>
            <label>
              Places to Visit:
              <input
                type="text"
                value={newPlace}
                onChange={(e) => setNewPlace(e.target.value)}
              />
              <button type="button" onClick={handleAddPlace}>
                Add
              </button>
            </label>
          </form>
        </div>
      ))}

      <button onClick={() => navigate("/")}>Go Back to Trips</button>
    </div>
  );
};

export default TripDetails;
