import React, { useEffect, useState, useRef } from "react";
import { useTripForm } from "../../Store/ItineriesContext";
import { useParams } from "react-router-dom";
import axios from "axios";
import './DisplayPlaces.css';

const url = "http://localhost:8000";
const DisplayPlaces = ({handleAddLocation, handleDeleteLocation}) => {
  const [placeDetails, setplaceDetails] = useState([]);
  const { cIti } = useTripForm();
  const { itiId } = useParams();
  const [checkState, setcheckState] = useState(true);
  const carouselRef = useRef(null);
  //displaying the place details
  const displayPlaceDetails = () => {
    const service = new window.google.maps.places.PlacesService(
      document.createElement("div")
    );

    service.nearbySearch(
      {
        location: { lat: 28.2095831, lng: 83.9855674 },
        radius: 5000, // You can adjust the radius as needed
        type: [
          "natural_feature",
          "Nature & Parks",
          "Nature & Wildlife Areas",
          "Sights & Landmarks",
          "Caverns & Caves",
          "Waterfalls",
          "Lake",
        ], // You can specify the type of places you want
        keyword: "tourist attraction", // You can add a keyword to narrow down your results
        exclude: ["restaurant", "lodging"], // You can exclude places from your results
      },
      (results, status) => {
        let promise = results.map((result) => {
          return new Promise((resolve) => {
            service.getDetails(
              { placeId: result.place_id },
              (detailResult, detailStatus) => {
                const places = {
                  business_status: detailResult.business_status,
                  address: detailResult.formatted_address,
                  name: detailResult.name,
                  photos: detailResult.photos,
                  place_id: detailResult.place_id,
                  rating: detailResult.rating,
                  user_total_rating: detailResult.user_ratings_total,
                  reviews: detailResult.reviews,
                };

                resolve(places);
              }
            );
          });
        });
        Promise.all(promise).then((results) => {
          setplaceDetails(results);
        });
      }
    );
  };

  const insertPlaceDetails = () => {
    axios
      .post(
        `${url}/api/place-details/insertAllItiDetails/${itiId}`,
        placeDetails
      )
      .then(function (response) {
        if (response.data) {
          setcheckState(!checkState);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  useEffect(() => {
    checkState &&
      (cIti
        ? displayPlaceDetails()
        : console.log("no created Itineraries found"));
  }, [cIti]);

  useEffect(() => {
    checkState &&
      (placeDetails
        ? insertPlaceDetails()
        : console.log("no Data in placeDetails"));
  }, [placeDetails]);
  console.log("This is getItiData", cIti);

  const scrollLeft = () => {
    carouselRef.current.scrollLeft -= 200; // Adjust scroll distance as needed
  };

  // Function to scroll carousel right
  const scrollRight = () => {
    carouselRef.current.scrollLeft += 200; // Adjust scroll distance as needed
  };

  const addToPlacesToVisit = (place) => {
    handleAddLocation(place);
  }

  return (
    // <div>
    //   hey it's started
      <div className="carousel-container">
        <button className="scroll-button left" onClick={scrollLeft}>{'<'}</button>
        <div className="carousel" ref={carouselRef}>
          {cIti && cIti.itineraries[0]?.itiInfo?.ItiDetails?.ItiDetails.map((place, index) => (
            <div className="place-card" key={index}>
              <h3>{place.name}</h3>
              {/* Render photos if available */}
              {place.photos && place.photos.length > 0 && (
                <img src={place.photos[0]} alt={place.name} />
              )}
              <button onClick={() => addToPlacesToVisit(place)}>Add</button>
            </div>
          ))}
        </div>
        <button className="scroll-button right" onClick={scrollRight}>{'>'}</button>
      </div>

    // </div>
  );
};

export default DisplayPlaces;
