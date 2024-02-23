import React, { useEffect, useState } from "react";
import axios from "axios";

import ghumfirLogo from '../../../../Assets/Ghumfir_Logo.png';

import './Overview.css';

const OverView = ({ destination }) => {
  const [imageUrl, setImageUrl] = useState("");
  const sample_dest = "pokhara"


import ghumfirLogo from "../../../../Assets/Ghumfir Logo.png";
import { useParams } from "react-router-dom";
import "./Overview.css";
import { useTripForm } from "../../Store/ItineriesContext";

const OverView = ({ destination }) => {
  const { itiId } = useParams();
  const { cIti } = useTripForm();
  const [ImageUrl, setImageUrl] = useState("");

  const sample_dest = "pokhara";
  const getPexelsImage = async () => {
    try {
      const response = await axios.get(
        `https://api.pexels.com/v1/search?query=${sample_dest}&per_page=1&page=1`,
        {
          headers: {
            Authorization:
              "IWHi9ODGmyX3pJnlnnbdSMmnl6dnUbNsrIoX3rc3JF3ReO10oUAUqlqB",
          },
        }
      );

      const photo = response.data.photos[0];
      const imageUrl = photo ? photo.src.medium : "";
      setImageUrl(imageUrl);

      localStorage.setItem("pexelsImageUrl", imageUrl);
    } catch (error) {
      console.log("Error Fetching Pexels image: ", error);
    }
  };

  useEffect(() => {
    getPexelsImage();
  }, []);

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
