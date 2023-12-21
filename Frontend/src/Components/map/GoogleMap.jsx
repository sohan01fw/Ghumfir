import GoogleMapReact from "google-map-react";
import LocationPin from "./LocationPin";

export default function GoogleMap() {
  const defaultProps = {
    center: {
      address: "1600 Amphitheatre Parkway, Mountain View, california.",
      lat: 37.42216,
      lng: -122.08427,
    },
    zoom: 10,
  };
  let key = import.meta.env.VITE_REACT_APP_GOOGLE_MAP_KEY;

  return (
    // Important! Always set the container height explicitly
    <div style={{ height: "100vh", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: key }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      ></GoogleMapReact>
    </div>
  );
}
