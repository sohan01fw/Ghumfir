import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./TripDetails.css";
import { SERVER_URL } from "../../utils/exportItem";
import SideBar from "../../Components/Navigation/SideBar/SideBar";
import PlacesToVisit from "../../Components/ShowTrips/placeToVisit/PlacesToVisit";
import Budget from "../../Components/ShowTrips/Budget/Budget";
import MainNavigation from "../../Components/Navigation/MainNavigation";
import OverView from "../../Components/ShowTrips/Overview/Overview";
import Notes from "../../Components/ShowTrips/Note/Notes";
import MapLocation from "../../Components/Map/MapLocation";
import { useAppState } from "../../utils/Hooks/useAppState";

const TripDetails = ({ destination }) => {
  const { state, dispatch } = useAppState();
  const { itiDetails } = state;
  const { itiId } = useParams();
  const [locations, setLocations] = useState([]);

  const handleAddLocation = (newLocationInfo) => {
    setLocations([...locations, newLocationInfo]);
  };
  const handleDeleteLocation = (id) => {
    setLocations(locations.filter((location) => location.id !== id));
  };
  const getdata = async () => {
    await axios
      .get(`${SERVER_URL}/api/itineries/itiId/${itiId}`)
      .then((res) => {
        if (res.data) {
          let resD = res.data;
          const resAction = {
            type: "ADD_cIti",
            payload: resD,
          };
          dispatch(resAction);

          res?.data?.itineraries?.map((data) => {
            let d = data?.itiInfo?.geolocation;
            const geoAction = {
              type: "ADD_GEOLOCATION",
              payload: d,
            };
            dispatch(geoAction);
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getdata();
  }, [itiDetails]);

  return (
    <div className="trip-details">
      <MainNavigation />
      <SideBar itiId={itiId} />

      <div className="content">
        <OverView destination={destination} />
        <Notes />
        <PlacesToVisit
          locations={locations}
          handleAddLocation={handleAddLocation}
          handleDeleteLocation={handleDeleteLocation}
        />
        <Budget />
      </div>
      <div className="map">
        {/* <h1>Map goes here</h1> */}
        <MainNavigation />

        <h1>Map goes here</h1>
        <MapLocation />
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