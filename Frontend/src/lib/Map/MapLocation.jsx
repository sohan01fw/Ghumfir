import React from "react";
import { useJsApiLoader } from "@react-google-maps/api";
import GoogleMaps from "../../Components/map/GoogleMaps";
import InputLocation from "../../Components/map/InputLocation";

export const key = import.meta.env.VITE_REACT_APP_GOOGLE_MAP_KEY;

const MapLocation = () => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: key,
  });

  return (
    <div>
      <GoogleMaps isLoaded={isLoaded} />
    </div>
  );
};

export default MapLocation;
