import React from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";

const GoogleMaps = ({ isLoaded }) => {
  const containerStyle = {
    width: "100%",
    height: "600px",
  };

  const center = {
    lat: 28.2669,
    lng: 83.9685,
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
