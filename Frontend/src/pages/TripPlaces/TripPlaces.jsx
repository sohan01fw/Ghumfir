import React, { useEffect, useState } from "react";
import "./TripPlaces.css";
import GoogleMaps from "../../Components/Map/GoogleMaps/GoogleMaps";
import TripPlaceNav from "../../Components/Navigation/TripPlaceNav/TripPlaceNav";
import NestedLink from "../../lib/ui/NestedLink";
import Softbtn from "../../lib/ui/Softbtn";
import { getPlaces } from "../../lib/Actions/ServerGetActions/getPlaces";
import { useParams, redirect, useNavigate, Link } from "react-router-dom";

const TripPlaces = () => {
  const { pId } = useParams();
  const navigate = useNavigate();
  const [PlaceData, setPlaceData] = useState();
  //center for map
  const tripPlacesCenter = {
    lat: parseFloat("28.2095831"),
    lng: parseFloat("83.9855674"),
  };

  const getPla = async () => {
    const resGetPlaces = await getPlaces(pId);
    if (!resGetPlaces) {
      navigate("/trips", { replace: true });
    }

    setPlaceData(resGetPlaces);
  };
  useEffect(() => {
    getPla();
  }, []);
  console.log(PlaceData);
  return (
    <div className="tripplaces-container">
      <div className="tripplaces-container2">
        <div className="tripplaces-nav">
          <TripPlaceNav />
        </div>
        <div className="tripplaces-heading">
          <h1>Places You Want To Visit</h1>
        </div>
        {/* display data here........ */}

        <div className="linknewplaces">
          {PlaceData?.itiPlaces?.itineraries.map((data, index) => (
            <Link key={index} to={`/tripDetails/${pId}/${data.itineraryId}`}>
              <div className="tripplaces-innerLink">
                <NestedLink data={data} />
              </div>
            </Link>
          ))}

          <div className="tripplaces-addnewplace">
            <div className="tp-line"></div>
            <div className="softbtn">
              <Softbtn />
            </div>
          </div>
        </div>
      </div>

      <div className="tripplaces-map">
        <GoogleMaps zoom={8} center={tripPlacesCenter} data={PlaceData} />
      </div>
    </div>
  );
};

export default TripPlaces;
