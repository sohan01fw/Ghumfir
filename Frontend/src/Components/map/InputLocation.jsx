import usePlacesAutocomplete, {
  getDetails,
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import "./InputLocation.css";
import { useEffect, useMemo, useState } from "react";
import TripDetails from "../TipsDetails/TripDetails";

const InputLocation = ({ destination }) => {
  const [placeDetails, setplaceDetails] = useState([]);
  const {
    value,
    suggestions: { status, data },
    setValue,
  } = usePlacesAutocomplete();
  //caching google map
  const methods = usePlacesAutocomplete({
    // Provide the cache time in seconds, the default is 24 hours
    cache: 24 * 60 * 60,
  });
  useMemo(() => {
    setValue(destination);
  }, [destination]);

  //selecting the location to get it's geo-code
  const handleSelect =
    ({ description, place_id }) =>
    () => {
      console.log(place_id);
      setValue(description, false);

      // Get latitude and longitude via utility functions
      getGeocode({ address: description }).then((results) => {
        const { lat, lng } = getLatLng(results[0]);
        console.log("📍 Coordinates: ", { lat, lng });

        //getting place details like photos, reveiws etc
      });
    };

  // renders bunch of suggestions based on the input
  const renderSuggestions = () =>
    data.map((suggestion) => {
      const {
        place_id,
        structured_formatting: { main_text, secondary_text },
      } = suggestion;
      return (
        <li key={place_id} onClick={handleSelect(suggestion)}>
          <strong>{main_text}</strong> <small>{secondary_text}</small>
        </li>
      );
    });
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
        {/* {placeDetails.map((data, index) => {
          return (
            <div key={index}>
              <h3>{data.name && data.name}</h3>
            </div>
          );
        })} */}
      </div>
      {/* Render dropdown location  */}
      {status === "OK" && <ul>{renderSuggestions()}</ul>}
    </div>
  );
};
export default InputLocation;
