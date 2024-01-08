import React, { useEffect, useState } from "react";
import { useTripForm } from "../../Store/ItineriesContext";

const DisplayPlaces = () => {
  const [placeDetails, setplaceDetails] = useState([]);
  const { postAndGetAllDetails } = useTripForm();
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
  useEffect(() => {
    displayPlaceDetails();
  }, []);

  postAndGetAllDetails(placeDetails);
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
