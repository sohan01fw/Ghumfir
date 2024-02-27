import React from "react";
import "./TripPlaceNav.css";
import Ghumfir_Logo from "../../../Assets/Ghumfir_Logo.png";
import { Avatar, Wrap, WrapItem } from "@chakra-ui/react";
const TripPlaceNav = () => {
  return (
    <div className="tp-container">
      <div className="tp-logo">
        <img src={Ghumfir_Logo} alt="logo" height={30} width={40} />
        <div className="tp-logoname">
          <h3>Ghumfir</h3>
        </div>
      </div>
      <div className="tp-avatar">
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
