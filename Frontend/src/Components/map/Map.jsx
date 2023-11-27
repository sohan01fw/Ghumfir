import React from "react";
import GoogleMapReact from "google-map-react";
const AnyReactComponent = ({ text }) => <div>{text}</div>;

export default function googleMap() {
  const defaultProps = {
    center: {
      address: "1600 Amphitheatre Parkway, Mountain View, california.",
      lat: 37.42216,
      lng: -122.08427,
    },
    zoom: 10,
  };
  let key = "AIzaSyB9BxZfImxu-M-Jm81g_wdqSwPYjGxo-YI";

  return (
    // Important! Always set the container height explicitly
    <div style={{ height: "100vh", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: key }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        <AnyReactComponent lat={59.955413} lng={30.337844} text="My Marker" />
      </GoogleMapReact>
    </div>
  );
}
