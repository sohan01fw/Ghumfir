import React, { useEffect, useState } from "react";
import { useTripForm } from "../../Store/ItineriesContext";
import { useParams } from "react-router-dom";
import axios from "axios";
const url = "http://localhost:8000";
const DisplayPlaces = () => {
  const [placeDetails, setplaceDetails] = useState([]);
  const { cIti, geoLocations } = useTripForm();
  const { itiId } = useParams();
  const [checkState, setcheckState] = useState(true);

  //displaying the place details
  const displayPlaceDetails = () => {
    const service = new window.google.maps.places.PlacesService(
      document.createElement("div")
    );

    service.nearbySearch(
      {
        location: {
          lat: parseFloat(geoLocations?.lat),
          lng: parseFloat(geoLocations?.lng),
        },
        radius: 5000, // You can adjust the radius as needed
        type: [
          /* "natural_feature",
          "Nature & Parks",
          "Nature & Wildlife Areas",
          "Sights & Landmarks",
         
          "Waterfalls",
          "Lake", */
          "Temple",
          "Caverns & Caves",
          "Things to do",
        ], // You can specify the type of places you want
        keyword: "Things to do", // You can add a keyword to narrow down your results
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
  displayPlaceDetails();
  const insertPlaceDetails = () => {
    axios
      .post(
        `${url}/api/place-details/insertAllItiDetails/${itiId}`,
        placeDetails
      )
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  useEffect(() => {
    if (checkState) {
      cIti
        ? displayPlaceDetails()
        : console.log("no created Itineraries found");
    }
  }, [cIti]);

  useEffect(() => {
    if (checkState) {
      placeDetails
        ? insertPlaceDetails()
        : console.log("no Data in placeDetails");
    }
  }, [placeDetails]);
  const getAllPlacesData = async () => {
    await axios
      .get(`${url}/api/itineries/${itiId}`)
      .then((res) => {
        console.log("alldatares =>", res);
        res?.data?.itineraries?.map((data) => {
          if (data?.itineraryId === itiId) {
            setcheckState(!checkState);
          }
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getAllPlacesData();
  }, []);

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
