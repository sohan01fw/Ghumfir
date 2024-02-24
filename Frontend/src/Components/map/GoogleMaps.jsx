import React, { useEffect, useState } from "react";
import { GoogleMap, Marker, InfoWindow } from "@react-google-maps/api";
import { useTripForm } from "../../Store/ItineriesContext";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./GoogleMaps.css";

const url = "http://localhost:8000";

const GoogleMaps = ({ isLoaded }) => {
  const { cIti, geoLocations, checkState } = useTripForm();
  const { itiId } = useParams();
  const [returnSelectedData, setReturnSelectedData] = useState();
  const [markerSelected, setMarkerSelected] = useState(null);
  const [markerValue, setmarkerValue] = useState();

  const selectedDetails = async () => {
    try {
      const response = await axios.get(
        `${url}/api/place-details/getDetails/${itiId}`
      );
      setReturnSelectedData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    cIti ? selectedDetails() : console.log("No created itineraries found");
  }, [cIti, checkState]);

  const containerStyle = {
    width: "100%",
    height: "100vh",
  };

  const center = {
    lat: parseFloat(geoLocations?.lat),
    lng: parseFloat(geoLocations?.lng),
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
          zoom={13}
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
