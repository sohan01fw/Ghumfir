import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import "./DisplayPlaceDetails.css";
import axios from "axios";
import { SERVER_URL } from "../../../utils/exportItem";
import { useAppState } from "../../../utils/Hooks/useAppState";
const DisplayPlaceDetails = ({ handleAddLocation, handleDeleteLocation }) => {
  const { state, dispatch } = useAppState();
  const { cIti, geoLocations, checkState } = state;
  const [placeDetails, setplaceDetails] = useState([]);
  const { itiId } = useParams();

  const carouselRef = useRef(null);
  const [allgetData, setallgetData] = useState();
  const [afterINsert, setafterINsert] = useState(false);

  //displaying the place details

  const scrollLeft = () => {
    carouselRef.current.scrollLeft -= 200; // Adjust scroll distance as needed
  };

  // Function to scroll carousel right
  const scrollRight = () => {
    carouselRef.current.scrollLeft += 200; // Adjust scroll distance as needed
  };

  const addToPlacesToVisit = async (value) => {
    console.log("value =>>>", value);
    if (value) {
      await axios
        .post(
          `${SERVER_URL}/api/place-details/insertAllItiDetails/${itiId}`,
          value
        )
        .then(function (response) {
          if (response?.status === 200) {
            let gg = !checkState;
            let checkAction = {
              type: "CHECK_STATE",
              payload: gg,
            };
            dispatch(checkAction);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };
  /* console.log("placedetails =>>>", placeDetails); */
  return (
    <div className="carousel-container">
      <button className="scroll-button left" onClick={scrollLeft}>
        {"<"}
      </button>
      <div className="carousel" ref={carouselRef}>
        {placeDetails &&
          placeDetails.map((place, index) => (
            <div className="place-card" key={index}>
              <h3>{place.name}</h3>
              {/* Render photos if available */}
              {place.photos && <img src={place.photos.url} alt={place.name} />}
              <button onClick={() => addToPlacesToVisit(place)}>Add</button>
            </div>
          ))}
      </div>
      <button className="scroll-button right" onClick={scrollRight}>
        {">"}
      </button>
    </div>
  );
};

export default DisplayPlaceDetails;
