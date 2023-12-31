import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
const url = "http://localhost:8000";
import SideBar from "../Navigation/SideBar";
import PlacesToVisit from "./PlacesToVisit";
import Budget from "./Budget";
import MainNavigation from "../Navigation/MainNavigation";

import "./TripDetails.css";
import OverView from "./Overview";
import MapLocation from "../../lib/Map/MapLocation";

const TripDetails = ({ destination }) => {
  console.log(destination);
  const { itiId } = useParams();

  const getdata = async () => {
    await axios
      .get(`${url}/api/itineries/${itiId}`)
      .then((res) => {
        console.log("response:", res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getdata();
  }, []);

  return (
    <div className="trip-details">
      <MainNavigation />
      <div className="content">
        <SideBar itiId={itiId} />
        <OverView destination={destination} />
        <PlacesToVisit />
        <Budget />
      </div>
      <div className="map">
        <h1>
          <MapLocation />
        </h1>
      </div>
    </div>
  );
};

export default TripDetails;

// import "react-datepicker/dist/react-datepicker.css";
// import "./TripDetails.css";
// import SideBar from "../Navigation/SideBar";
// import PlacesToVisit from "./PlacesToVisit";
// import Budget from "./Budget";

// const TripDetails = () => {
//   return (
//     <div className="trip-details">
//       <SideBar />
//       <div className="content">
//         <PlacesToVisit />
//         <Budget />
//       </div>
//     </div>
//   );
// };

// export default TripDetails;

/* // TripDetails.js
import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import { useTripForm } from "../../Store/Contexts/TripFormContext";
import "./TripDetails.css";
import SideBar from "../Navigation/SideBar";
import Itineraries from "./Itineraries";
import PlacesToVisit from "./PlacesToVisit";
import Budget from "./Budget";
import { axios } from 'axios';

const TripDetails = () => {
  const { tripData, setTripData } = useTripForm();
  const navigate = useNavigate();
  const [selectedDay, setSelectedDay] = useState(1);
  const [newPlace, setNewPlace] = useState("");

  const {
    destination,
    startDate,
    endDate,
    itinerary = [],
  } = tripData || {
    destination: "",
    startDate: null,
    endDate: null,
    itinerary: [],
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

  const handleAddPlace = () => {
    if (newPlace.trim() !== "") {
      setTripData((prevData) => {
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
      });

      setNewPlace("");
    }
  };

  return (
    <div className="trip-details">
      <SideBar />
      <div className="content">
        <PlacesToVisit handleAddPlace={handleAddPlace} />
        {daysBetween.map((day, index) => (
          <Itineraries
            key={index}
            itinerary={
              tripData.itinerary && tripData.itinerary[index]
                ? tripData.itinerary[index]
                : []
            }
            selectedDay={index + 1}
            handleAddPlace={handleAddPlace}
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
 */
