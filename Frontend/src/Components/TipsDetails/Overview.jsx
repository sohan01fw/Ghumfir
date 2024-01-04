import React, { useEffect, useState } from "react";
import axios from "axios";

const OverView = ({ destination }) => {
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    const getPexelsImage = async () => {
      try {
        const response = await axios.get(
          "https://api.pexels.com/v1/search?query=${destination}&per_page=1&page=1",
          {
            headers: {
              Authorization:
                "IWHi9ODGmyX3pJnlnnbdSMmnl6dnUbNsrIoX3rc3JF3ReO10oUAUqlqB",
            },
          }
        );
          console.log(response.data);
        const photo = response.data.photos[0];
        const imageUrl = photo ? photo.src.medium : "";
        setImageUrl(imageUrl);
      } catch (error) {
        console.log("Error Fetching Pexels image: ", error);
      }
    };
    getPexelsImage();
  }, [destination]);

  return (
    <div>
        <h1>OverView</h1>
        {imageUrl && <img src={imageUrl} alt={destination} />}
    </div>
  );
};

export default OverView;
