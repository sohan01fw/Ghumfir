import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./TripDetails.css";
import { SERVER_URL } from "../../utils/exportItem";
import SideBar from "../../Components/Navigation/SideBar/SideBar";
import PlacesToVisit from "../../Components/ShowTrips/placeToVisit/PlacesToVisit";
import Budget from "../../Components/ShowTrips/Budget/Budget";
import MainNavigation from "../../Components/Navigation/MainNavigation";
import OverView from "../../Components/ShowTrips/Overview/Overview";
import Notes from "../../Components/ShowTrips/Note/Notes";
import { useAppState } from "../../utils/Hooks/useAppState";
import GoogleMaps from "../../Components/Map/GoogleMaps/GoogleMaps";

const TripDetails = ({ destination }) => {
  const { state, dispatch } = useAppState();
  const { itiDetails, geoLocations } = state;
  const { itiId } = useParams();
  const [locations, setLocations] = useState([]);
  //center for map
  const itiDetailCenter = {
    lat: parseFloat(geoLocations?.lat),
    lng: parseFloat(geoLocations?.lng),
  };
  const handleAddLocation = (newLocationInfo) => {
    setLocations([...locations, newLocationInfo]);
  };
  const handleDeleteLocation = (id) => {
    setLocations(locations.filter((location) => location.id !== id));
  };
  const getdata = async () => {
    await axios
      .get(`${SERVER_URL}/api/itineries/itiId/${itiId}`)
      .then((res) => {
        if (res.data) {
          let resD = res.data;
          const resAction = {
            type: "ADD_cIti",
            payload: resD,
          };
          dispatch(resAction);

          res?.data?.itineraries?.map((data) => {
            let d = data?.itiInfo?.geolocation;
            const geoAction = {
              type: "ADD_GEOLOCATION",
              payload: d,
            };
            dispatch(geoAction);
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getdata();
  }, [itiDetails]);

  return (
    <div className="trip-details">
      <MainNavigation />
      <SideBar itiId={itiId} />

      <div className="content">
        <OverView destination={destination} />
        <Notes />
        <PlacesToVisit
          locations={locations}
          handleAddLocation={handleAddLocation}
          handleDeleteLocation={handleDeleteLocation}
        />
        <Budget />
      </div>
      <div className="map">
        {/* <h1>Map goes here</h1> */}
        <MainNavigation />

        <h1>Map goes here</h1>
        <GoogleMaps zoom={12} center={itiDetailCenter} />
      </div>
    </div>
  );
};

export default TripDetails;
