import React, { useEffect, useState } from "react";
import { GoogleMap, Marker, InfoWindow } from "@react-google-maps/api";
import { useParams } from "react-router-dom";
import "./GoogleMaps.css";
import { useAppState } from "../../../utils/Hooks/useAppState";
import { useMapLoader } from "../../../utils/Hooks/useMapLoader";
import { getPlacesDetails } from "../../../lib/Actions/ServerGetActions/getPlaceDetails";

const GoogleMaps = ({ zoom, center }) => {
  const { state } = useAppState();
  const { cIti, geoLocations, checkState } = state;
  const { itiId } = useParams();
  const { isLoaded } = useMapLoader();
  const [returnSelectedData, setReturnSelectedData] = useState();
  const [markerSelected, setMarkerSelected] = useState(null);
  const [markerValue, setmarkerValue] = useState();

  const selectedDetails = async () => {
    const resValue = await getPlacesDetails(itiId);
    setReturnSelectedData(resValue);
  };

  useEffect(() => {
    cIti ? selectedDetails() : console.log("No created itineraries found");
  }, [cIti, checkState]);

  const containerStyle = {
    width: "156%",
    height: "100vh",
  };

  const handleMarkerHover = (data, index) => {
    if (markerSelected !== data) {
      setMarkerSelected({ data, index });
    }
  };

  return (
    <>
      {isLoaded && (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={zoom}
          options={{ disableAutoPan: true }}
        >
          {returnSelectedData &&
            returnSelectedData.ItiDetails.map((data, index) => (
              <Marker
                key={index}
                position={{
                  lat: parseFloat(data.geo.lat),
                  lng: parseFloat(data.geo.lng),
                }}
                onClick={(e) => setmarkerValue(data)}
                onMouseOver={() => handleMarkerHover(data, index)}
                onMouseOut={() => setMarkerSelected(null)}
              >
                {markerSelected && markerSelected.index === index && (
                  <InfoWindow options={{ disableAutoPan: true }}>
                    <div className="infowindow">
                      <h4>{data.name}</h4>
                    </div>
                  </InfoWindow>
                )}
              </Marker>
            ))}
        </GoogleMap>
      )}

      {markerValue && (
        <div>
          <h1>{markerValue.name}</h1>
        </div>
      )}
    </>
  );
};

export default GoogleMaps;
