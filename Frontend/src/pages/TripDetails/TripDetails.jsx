import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./TripDetails.css";
import { SERVER_URL } from "../../utils/exportItem";
import { useAppState } from "../../utils/Hooks/useAppState";
import GoogleMaps from "../../Components/Map/GoogleMaps/GoogleMaps";
import { ArrowRightIcon, ArrowLeftIcon } from "@chakra-ui/icons";
import { Avatar, WrapItem } from "@chakra-ui/react";
import Accordation from "../../Components/ui/Accordation";
import { getPlaces } from "../../lib/Actions/ServerGetActions/getPlaces";
import SideBar from "../../Components/Navigation/SideBar/SideBar";
import IconSideBar from "../../Components/Navigation/SideBar/IconSideBar/IconSideBar";
const TripDetails = ({ destination }) => {
  const { state, dispatch } = useAppState();
  const { itiDetails, geoLocations, placesData } = state;
  const { itiId, pId } = useParams();
  const [toggleIcon, settoggleIcon] = useState(true);
  const [dataDetails, setdataDetails] = useState();
  //center for map
  const itiDetailCenter = {
    lat: parseFloat(dataDetails?.itiInfo?.geolocation?.lat),
    lng: parseFloat(dataDetails?.itiInfo?.geolocation?.lng),
  };
  //getting data from server
  const getdata = async () => {
    const resGetPlaces = await getPlaces(pId);
    const findD = resGetPlaces.find((data) => data.itineraryId === itiId);
    setdataDetails(findD);
  };
  useEffect(() => {
    getdata();
  }, [pId]);

  return (
    <div className="main-container">
      <div className="sub-maincontainer">
        <div className="container-navbar">
          <h2>Ghumfir</h2>
        </div>
        <div className="middle-section">
          <div className={`${toggleIcon ? "c-sidebar" : "expanded-sidebar"}`}>
            {toggleIcon ? (
              <>
                <div className="sidebar-content">
                  <IconSideBar />
                </div>
                <div
                  onClick={() => {
                    settoggleIcon(!toggleIcon);
                  }}
                >
                  <div className="arrow-icon">
                    <ArrowRightIcon />
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="sidebar-content-expand">
                  <SideBar />
                </div>
                <div
                  onClick={() => {
                    settoggleIcon(!toggleIcon);
                  }}
                >
                  <div className="arrow-icon-2">
                    <ArrowLeftIcon />
                  </div>
                </div>
              </>
            )}
          </div>
          <div className="main-section">
            <div className="cover-img">
              <img
                src="https://images.unsplash.com/photo-1562462181-b228e3cff9ad?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cG9raGFyYXxlbnwwfHwwfHx8MA%3D%3D"
                alt="img"
              />
            </div>
            <div className="cover-board">
              <h2>Trip to {dataDetails?.itiInfo?.place}</h2>

              <div className="dateandprofile">
                <div className="for-date">2021-2022</div>
                <div className="for-profile">
                  <WrapItem>
                    <Avatar
                      name="Dan Abrahmov"
                      src="https://bit.ly/dan-abramov"
                    />
                  </WrapItem>
                </div>
              </div>
            </div>
            <div className="placetovisit-container">
              <Accordation title="Places To Visit" dataDetails={dataDetails} />
            </div>
          </div>
        </div>
      </div>
      <div className="trip-details-mapcontainer">
        <div className="maps">
          <GoogleMaps zoom={12} center={itiDetailCenter} />
        </div>
      </div>
    </div>
  );
};

export default TripDetails;
