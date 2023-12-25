// TripDetails.js
import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import { useTripForm } from "../Contexts/TripFormContext";

import "./TripDetails.css";
import SideBar from "../Components/Navigation/SideBar";
import Itineraries from "./Itineraries";
import PlacesToVisit from "./PlacesToVisit";
import Budget from "./Budget";

const TripDetails = () => {
  const { tripData, setTripData } = useTripForm();
  const navigate = useNavigate();
  const [selectedDay, setSelectedDay] = useState(1);
  const [newPlace, setNewPlace] = useState("");

  const { destination, startDate, endDate, itinerary, placesToVisit } =
    tripData || {
      destination: "",
      startDate: null,
      endDate: null,
      itinerary: [],
      placesToVisit: [],
    };

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

  const handleAddPlace = (newPlace, sectionType) => {
    if (newPlace.trim() !== "") {
      setTripData((prevData) => {
        if (sectionType === "itinerary") {
          const updatedItinerary = [...(prevData.itinerary || [])];
          const dayIndex = selectedDay - 1;
          updatedItinerary[dayIndex] = [
            ...(updatedItinerary[dayIndex] || []),
            newPlace,
          ];
          return {
            ...prevData,
            itinerary: updatedItinerary,
          };
        } else if (sectionType === "placesToVisit") {
          return {
            ...prevData,
            placesToVisit: [...(prevData.placesToVisit || []), newPlace],
          };
        }
        return prevData;
      });
      setNewPlace("");
    }
  };

  const renderPlacesToVisit = () => {
    const { placesToVisit } = tripData;
    if (!placesToVisit || placesToVisit.length === 0) {
      return <p>No Places to visit. </p>;
    }
    return (
      <div>
        <h2>Places To Visit: </h2>
        <ul>
          {placesToVisit.map((place, index) => (
            <li key={index}>{place}</li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div className="trip-details">
      <SideBar />
      <div className="content">
        <PlacesToVisit handleAddPlace={(newPlace)=> handleAddPlace(newPlace, "placesToVisit")} />
        {renderPlacesToVisit()}
        {daysBetween.map((day, index) => (
          <Itineraries
            key={index}
            itinerary={
              tripData.itinerary && tripData.itinerary[index]
                ? tripData.itinerary[index]
                : []
            }
            selectedDay={index + 1}
            handleAddPlace={(newPlace) => handleAddPlace(newPlace, "itinerary")}
          />
        ))}

        <Budget />

        <div>
          <h2>Trip Details</h2>
          <p>Destination: {destination}</p>
          <p>Start Date: {startDate.toLocaleDateString()}</p>
          <p>End Date: {endDate.toLocaleDateString()}</p>
        </div>

        <button onClick={() => navigate("/")}>Go Back to Trips</button>
      </div>
    </div>
  );
};

export default TripDetails;
