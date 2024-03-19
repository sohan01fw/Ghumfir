import usePlacesAutocomplete, {
  getDetails,
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import "./PlacesInputLoc.css";
import { useEffect, useMemo, useState } from "react";
import { useAppState } from "../../../../utils/Hooks/useAppState";
import short from "short-uuid";
import { useParams } from "react-router-dom";
import { PostPlaces } from "../../../../lib/Actions/ServerPostActions/PostPlaces";
import useGetImg from "../../../../utils/Hooks/placesHook/useGetImg";

const PlacesInputLoc = ({ place }) => {
  const { pId } = useParams();
  const itiId = short.generate();
  const { state, dispatch } = useAppState();
  const { placeValues } = state;
  const [PlaceName, setPlaceName] = useState("");
  const images = useGetImg(PlaceName);
  console.log(PlaceName);
  console.log(images);
  /*   const parts = placeValues?.split(",");
  const placeName = parts[0]?.trim(); // Remove any leading/trailing spaces */

  //getting place info details..............

  const {
    value,
    suggestions: { status, data },
    setValue,
  } = usePlacesAutocomplete();

  //caching google map
  usePlacesAutocomplete({
    // Provide the cache time in seconds, the default is 24 hours
    cache: 24 * 60 * 60,
  });

  useMemo(() => {
    setValue(place);
  }, [place]);

  //selecting the location to get it's geo-code
  const handleSelect =
    ({ description, place_id }) =>
    () => {
      setValue(place, false);
      setPlaceName(() => description);
      //add place value to global store
      const placeValueAction = {
        type: "ADD_PLACE_VALUE",
        payload: description,
      };

      dispatch(placeValueAction);
      //images urls
      //for places images
      /*  const imageUrls = images?.map((data) => {
        return data?.urls?.small;
      }); */

      // Get latitude and longitude via utility functions
      getGeocode({ address: description }).then(async (results) => {
        const { lat, lng } = getLatLng(results[0]);
        const info = {
          place_Id: place_id,
          geolocation: { lat, lng },
          place: description,
          /* images: imageUrls, */
        };
        const itiInfoAction = {
          type: "ADD_ITI_INFO",
          payload: info,
        };
        dispatch(itiInfoAction);
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
        <div className="showplaces">
          <ul
            key={place_id}
            onClick={handleSelect(suggestion)}
            className="ul-div"
          >
            <strong className="s-text">{main_text}</strong>
            <small className="smallss-text">{secondary_text}</small>
          </ul>
        </div>
      );
    });

  return (
    <div className="renderPlace">
      {/* Render dropdown location  */}
      {status === "OK" && <ul>{renderSuggestions()}</ul>}
    </div>
  );
};
export default PlacesInputLoc;
