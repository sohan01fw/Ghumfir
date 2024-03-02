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
import TripPlaceNav from "../../Components/Navigation/TripPlaceNav/TripPlaceNav";
import { ArrowRightIcon, ArrowLeftIcon } from "@chakra-ui/icons";
const TripDetails = ({ destination }) => {
  const { state, dispatch } = useAppState();
  const { itiDetails, geoLocations } = state;
  const { itiId } = useParams();
  const [locations, setLocations] = useState([]);
  const [toggleIcon, settoggleIcon] = useState(true);
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
    <div className="main-container">
      <div className="sub-maincontainer">
        <div className="container-navbar">
          <h2>Ghumfir</h2>
        </div>
        <div className="middle-section">
          <div className={`${toggleIcon ? "c-sidebar" : "expanded-sidebar"}`}>
            {toggleIcon ? (
              <div
                className="arrow-icon"
                onClick={() => {
                  settoggleIcon(!toggleIcon);
                }}
              >
                <ArrowRightIcon />
              </div>
            ) : (
              <div
                className="arrow-icon-2"
                onClick={() => {
                  settoggleIcon(!toggleIcon);
                }}
              >
                <ArrowLeftIcon />
              </div>
            )}
          </div>
          <div className="main-section">kaa</div>
        </div>
      </div>
      <div className="trip-details-mapcontainer">
        <div>
          <GoogleMaps zoom={12} center={itiDetailCenter} className="maps" />
        </div>
      </div>
    </div>
  );
};

export default TripDetails;
