import React, { useEffect, useRef, useState } from "react";
import "./TripPlaces.css";
import GoogleMaps from "../../Components/Map/GoogleMaps/GoogleMaps";
import TripPlaceNav from "../../Components/Navigation/TripPlaceNav/TripPlaceNav";
import { getPlaces } from "../../lib/Actions/ServerGetActions/getPlaces";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Input, Button } from "@chakra-ui/react";
import { key } from "../../utils/exportItem";
import short from "short-uuid";
import { useAppState } from "../../utils/Hooks/useAppState";
import PlacesInputLoc from "../../Components/Map/InputLocation/Places/PlacesInputLoc";
import { PostPlaces } from "../../lib/Actions/ServerPostActions/PostPlaces";
import { DeleteIcon } from "@chakra-ui/icons";
import NestedLink from "../../Components/ui/NestedLink";
import Softbtn from "../../Components/ui/Softbtn";
import { deletePlaces } from "../../lib/Actions/ServerDeleteActions/deletePlaces";
import useToken from "../../lib/useToken";

const TripPlaces = () => {
  const { state, dispatch } = useAppState();
  const { itiInfo, placeValues, user } = state;
  const { pId } = useParams();
  const navigate = useNavigate();
  const [PlaceData, setPlaceData] = useState();
  const [watchState, setwatchState] = useState(true);
  const [inputPlace, setinputPlace] = useState("");
  const [addPlaces, setaddPlaces] = useState();
  const [placesExists, setplacesExists] = useState(false);
  const [deletePla, setdeletePla] = useState();
  //for authorization of user
  useToken();
  if (!user) {
    navigate("/auth/login");
  }
  //center for map
  const tripPlacesCenter = {
    lat: parseFloat("28.2095831"),
    lng: parseFloat("83.9855674"),
  };
  //generate itinerary id
  const itiId = short.generate();

  //posting data to server for same place_Id
  const handlePostPlaces = async () => {
    let place_id = itiInfo.place_Id;
    const existingPlace = PlaceData.find(
      (element) => element.itiInfo.place_Id === place_id
    );
    if (existingPlace) {
      setplacesExists(true);
      alert("Places already exist!!!");
      setwatchState(!watchState);
      return; // Early exit if place already exists
    }
    if (!placesExists) {
      const newPlace = await PostPlaces(pId, {
        itineraryId: itiId,
        itiInfo,
      });
      if (newPlace) {
        setwatchState(!watchState);
        setaddPlaces(newPlace);
      }
    }
  };

  //gettng data from server
  const getPla = async () => {
    const resGetPlaces = await getPlaces(pId);
    if (!resGetPlaces) {
      navigate("/trips", { replace: true });
    }
    setPlaceData(resGetPlaces);
  };
  useEffect(() => {
    getPla();
  }, [pId, addPlaces, deletePla]);
  /*  console.log(PlaceData); */
  /* const AddedPlacesDetails = () => {
    const addPDetails = {
      type: "Add_PlacesData",
      payload: PlaceData,
    };
    dispatch(addPDetails);
  }; */
  //delete place
  const handleDeletePlace = async (id) => {
    const resDeletePlace = await deletePlaces(pId, { itiId: id.id });
    if (resDeletePlace) {
      setdeletePla(resDeletePlace);
    }
  };
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
          {PlaceData?.map((data, index) => (
            <>
              <div className="tripplaces-innerLink">
                <Link
                  key={index}
                  to={`/tripDetails/${pId}/${data.itineraryId}`}
                  className="innerlinkage"
                >
                  <NestedLink data={data} />
                </Link>
                <div
                  className="delete-icon"
                  onClick={() =>
                    handleDeletePlace({
                      id: data?.itineraryId,
                    })
                  }
                >
                  <p>
                    <DeleteIcon />
                  </p>
                </div>
              </div>
            </>
          ))}
          <div className="alltrip">
            <div className="tp-line"></div>
            {!watchState && (
              <div
                className="resetcover"
                onClick={() => {
                  setwatchState(true);
                }}
              ></div>
            )}
            <div className="tripplaces-addnewplace">
              {watchState ? (
                <div
                  className="softbtn"
                  onClick={() => {
                    setwatchState(false);
                  }}
                >
                  <Softbtn />
                </div>
              ) : (
                <>
                  <div className="inputandbtn">
                    <Input
                      variant="filled"
                      placeholder="Add a new place"
                      onChange={(e) => setinputPlace(e.target.value)}
                      value={placeValues && placeValues}
                      className="i-input"
                    />
                    <Button
                      backgroundColor="#4caf50"
                      color={"white"}
                      _hover={{ color: "white" }}
                      size="md"
                      onClick={handlePostPlaces}
                      className="i-btn"
                    >
                      Add
                    </Button>
                  </div>
                  {!placeValues && (
                    <PlacesInputLoc apiKey={key} place={inputPlace} />
                  )}
                </>
              )}
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
