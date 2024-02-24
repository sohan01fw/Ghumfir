import React, { useEffect, useState } from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";
import { useTripForm } from "../../Store/ItineriesContext";
import axios from "axios";
import { useParams } from "react-router-dom";
const url = "http://localhost:8000";
const GoogleMaps = ({ isLoaded }) => {
  const { cIti, geoLocations, checkState } = useTripForm();
  const { itiId } = useParams();
  console.log("itiId=>>>", itiId);
  console.log("checkstate value=>>", checkState);
  const [returnSelectedData, setreturnSelectedData] = useState();
  const selectedDetails = async () => {
    await axios
      .get(`${url}/api/place-details//getDetails/${itiId}`)
      .then(function (response) {
        setreturnSelectedData(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  useEffect(() => {
    cIti ? selectedDetails() : console.log("no created Itineraries found");
  }, [cIti, checkState]);

  const containerStyle = {
    width: "100%",
    height: "100vh",
  };

  const center = {
    lat: parseFloat(geoLocations?.lat),
    lng: parseFloat(geoLocations?.lng),
  };
  console.log(returnSelectedData);
  return isLoaded ? (
    <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={11}>
      {returnSelectedData &&
        returnSelectedData?.data?.ItiDetails?.map((data) => (
          <Marker
            position={{
              lat: parseFloat(data?.geo?.lat),
              lng: parseFloat(data?.geo?.lng),
            }}
          />
        ))}
    </GoogleMap>
  ) : (
    <></>
  );
};

export default GoogleMaps;
