import React from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";
import { useTripForm } from "../../Store/ItineriesContext";

const GoogleMaps = ({ isLoaded }) => {
  const { geoLocations } = useTripForm();

  const containerStyle = {
    width: "100%",
    height: "100vh",
  };

  const center = {
    lat: parseFloat(geoLocations?.lat),
    lng: parseFloat(geoLocations?.lng),
  };
  return isLoaded ? (
    <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={11}>
      <Marker position={center} />
    </GoogleMap>
  ) : (
    <></>
  );
};

export default GoogleMaps;
