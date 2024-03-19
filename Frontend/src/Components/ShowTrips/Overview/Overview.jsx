import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Overview.css";
import ghumfirLogo from "../../../Assets/Ghumfir_Logo.png";
const OverView = ({ destination }) => {
  return (
    <div className="overview" id="overview">
      <div className="overview-image">
        {ImageUrl && <img src={ImageUrl} alt={destination} />}
      </div>
      <div className="overview-info">
        <h1>Trip to {sample_dest}</h1>
        <div className="overview-details">
          <h5>11/21 - 11/24</h5>
          <div className="user-logo">
            <img src={ghumfirLogo} alt="logo" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverView;
