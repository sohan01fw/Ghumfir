import React, { useEffect, useState } from "react";

const DisplayPlaces = () => {
  const [placeDetails, setplaceDetails] = useState([]);

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
        // Now you can iterate through the results to get details about each nearby place
        results.forEach((result) => {
          // Use the place ID to fetch details
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

              setplaceDetails((prevState) => [...prevState, places]);
            }
          );
        });
      }
    );
  };
  useEffect(() => {
    displayPlaceDetails();
  }, []);
  console.log(placeDetails);
  return (
    <div>
      <div>
        {placeDetails.map((data, index) => {
          return (
            <div key={index}>
              <h3>{data.name && data.name}</h3>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DisplayPlaces;
