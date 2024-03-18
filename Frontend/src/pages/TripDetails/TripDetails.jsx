import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./TripDetails.css";
import { useAppState } from "../../utils/Hooks/useAppState";
import GoogleMaps from "../../Components/Map/GoogleMaps/GoogleMaps";
import {
  ArrowRightIcon,
  ArrowLeftIcon,
  EmailIcon,
  Search2Icon,
} from "@chakra-ui/icons";
import { Avatar, WrapItem, Button, Box } from "@chakra-ui/react";
import Accordation from "../../Components/ui/Accordation";
import { getPlaces } from "../../lib/Actions/ServerGetActions/getPlaces";
import SideBar from "../../Components/Navigation/SideBar/SideBar";
import IconSideBar from "../../Components/Navigation/SideBar/IconSideBar/IconSideBar";
import Ghumfir_Logo from "../../Assets/Ghumfir_Logo.png";
import { IoIosNotifications } from "react-icons/io";
import AccordionExplore from "../../Components/ui/AccordionExplore";
import Notes from "../../Components/ShowTrips/Note/Notes";
import { FaBed } from "react-icons/fa";
import { FaCar } from "react-icons/fa";
import { MdFlight } from "react-icons/md";
import useToken from "../../lib/useToken";
import { useNavigate } from "react-router-dom";
import Budget from "../../Components/TripDetails/Budget/Budget";

const TripDetails = ({ destination }) => {
  const { state, dispatch } = useAppState();
  const { itiDetails, geoLocations, placesData, filterPlaceValue, user } =
    state;

  const { itiId, pId } = useParams();
  const [toggleIcon, settoggleIcon] = useState(true);
  const [dataDetails, setdataDetails] = useState();
  const navigate = useNavigate();
  //for authorization of user
  useToken();
  if (!user) {
    navigate("/auth/login");
  }
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
          <Box width="8%" paddingBottom={-3} cursor="pointer">
            <Link to="/">
              <img src={Ghumfir_Logo} alt="logo" className="cn-logo" />
            </Link>
          </Box>

          <Box marginRight={3} paddingTop={2} cursor="pointer">
            <div className="nofityicon">
              <IoIosNotifications />
            </div>
          </Box>
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
            <div id="Overview" className="cover-img">
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
            {/* Explore container */}
            <div className="Explore-container">
              <div id="Explore">
                <AccordionExplore />
              </div>

              <div className="browseall-btn">
                <Button
                  leftIcon={<Search2Icon />}
                  colorScheme="teal"
                  variant="solid"
                  borderRadius={20}
                  backgroundColor={"green"}
                  _hover={{ backgroundColor: "#4caf50" }}
                >
                  Browse all
                </Button>
              </div>
            </div>
            <div className="reservation-budget-conatainer">
              <div className="reservation">
                <h3>Reservations and attachments</h3>
                <div className="reserve-icons">
                  <div className="i-1">
                    <FaBed
                      style={{
                        paddingLeft: "3px",
                        width: "30px",
                      }}
                    />
                    <p>Lodging</p>
                  </div>
                  <div className="i-2">
                    <FaCar
                      style={{
                        paddingLeft: "17px",
                        width: "30px",
                      }}
                    />
                    <p>Rental Cars</p>
                  </div>
                  <div className="i-3">
                    <MdFlight
                      style={{
                        paddingLeft: "3px",
                        width: "30px",
                      }}
                    />
                    <p>Flights</p>
                  </div>
                </div>
              </div>
              <div className="view-budget">
                <h3>Budget</h3>
                <div className="money">
                  <p>Rs.00</p>
                </div>
                <p>View Details</p>
              </div>
            </div>

            {/* place to visit section */}
            <div id="PlacesToVisit" className="placetovisit-container">
              <Accordation title="Places To Visit" dataDetails={dataDetails} />
            </div>
            {/* For Budget */}
            <Box marginLeft="10%" id="budget">
              <Budget />
            </Box>
          </div>
        </div>
      </div>
      <div className="trip-details-mapcontainer">
        <div className="maps">
          <GoogleMaps
            zoom={12}
            center={itiDetailCenter}
            data={filterPlaceValue}
          />
        </div>
      </div>
    </div>
  );
};

export default TripDetails;
