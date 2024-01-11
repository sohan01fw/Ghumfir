import React, { useEffect, useState } from "react";
import { useTripForm } from "../../Store/ItineriesContext";
import { useParams } from "react-router-dom";
import axios from "axios";
const url = "http://localhost:8000";
const DisplayPlaces = () => {
  const [placeDetails, setplaceDetails] = useState([]);
  const { cIti } = useTripForm();
  const { itiId } = useParams();
  const [checkState, setcheckState] = useState(true);
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
  return (
    <div>
      hey it's started
      {/*  <div>
        {placeDetails.map((data, index) => {
          return (
            <div key={index}>
            </div>
          );   <h3>{data.name && data.name}</h3>
           
        })}
      </div> */}
    </div>
  );
};

export default DisplayPlaces;
