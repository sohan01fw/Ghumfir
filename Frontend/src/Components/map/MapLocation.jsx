import React from "react";
import { useJsApiLoader } from "@react-google-maps/api";
import GoogleMaps from "./GoogleMaps/GoogleMaps";
import { key } from "../../utils/exportItem";

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
