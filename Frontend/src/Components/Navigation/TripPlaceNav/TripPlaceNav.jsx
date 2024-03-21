import React from "react";
import "./TripPlaceNav.css";
import Ghumfir_Logo from "../../../Assets/Ghumfir_Logo.png";
import { Avatar, Wrap, WrapItem } from "@chakra-ui/react";
import { IoIosNotifications } from "react-icons/io";
import { Link } from "react-router-dom";
const TripPlaceNav = () => {
  return (
    <div className="tp-container">
      <div className="tp-logo">
        <Link to="/">
          <img src={Ghumfir_Logo} alt="logo" height={30} width={40} />
        </Link>
      </div>

      <div className="tp-avatar">
        <div className="nofity-icon">
          <IoIosNotifications />
        </div>
        <Wrap>
          <WrapItem>
            <Avatar name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />
          </WrapItem>
        </Wrap>
      </div>
    </div>
  );
};

export default TripPlaceNav;
