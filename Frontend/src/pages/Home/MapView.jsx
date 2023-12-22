import React from "react";
import { useJsApiLoader } from "@react-google-maps/api";
import GoogleMaps from "../../Components/map/GoogleMaps";
import InputLocation from "../../Components/map/InputLocation";
const MapView = () => {
  let key = import.meta.env.VITE_REACT_APP_GOOGLE_MAP_KEY;
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: key,
  });

  return (
    <div>
      <InputLocation apiKey={key} />
      <GoogleMaps isLoaded={isLoaded} />
    </div>
  );
};

export default MapView;
