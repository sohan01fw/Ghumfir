import GoogleMapReact from "google-map-react";

export default function GoogleMap() {
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
      </GoogleMapReact>
    </div>
  );
}
