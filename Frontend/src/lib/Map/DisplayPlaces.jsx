import React, { useEffect, useState } from "react";
import { useTripForm } from "../../Store/ItineriesContext";
import { useParams } from "react-router-dom";
import axios from "axios";
const url = "http://localhost:8000";
const DisplayPlaces = () => {
  const [placeDetails, setplaceDetails] = useState([]);
  const { cIti, geoLocations } = useTripForm();
  const { itiId } = useParams();
  const [checkState, setcheckState] = useState(false);
  const [afterINsert, setafterINsert] = useState(false);

  //displaying the place details
  const getPlaceDetails = () => {
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

                  photos: {
                    url: detailResult.photos?.[0].getUrl(),
                    height: detailResult.photos?.[0].height,
                    width: detailResult.photos?.[0].width,
                  },

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
        if (response?.status === 200) {
          setcheckState(!checkState);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  /*  useEffect(() => {
    if (checkState) {
      cIti
        ? getPlaceDetails()
        : console.log("no created Itineraries found");
    }
  }, [cIti,checkState]);

  useEffect(() => {
    if (checkState) {
      placeDetails
        ? insertPlaceDetails()
        : console.log("no Data in placeDetails");
    }
  }, [placeDetails,checkState]); */

  const getAllPlacesData = async () => {
    await axios
      .get(`${url}/api/itineries/itiId/${itiId}`)
      .then((res) => {
        if (
          res.data === "" ||
          res?.data?.itineraries[0]?.itiInfo?.ItiDetails === null
        ) {
          if (cIti) {
            getPlaceDetails();
          }

          if (placeDetails) {
            insertPlaceDetails();
          }
        } else {
          console.log("data=><", res);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (checkState) {
      getAllPlacesData();
    }
  }, [checkState]);
  //get data

  useEffect(() => {
    getAllPlacesData();
  }, [cIti, placeDetails]);

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
