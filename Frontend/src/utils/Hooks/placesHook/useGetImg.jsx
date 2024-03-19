import React, { useEffect, useState } from "react";
import axios from "axios";

const useGetImg = (location) => {
  const [ImageUrl, setImageUrl] = useState();

  const accessKey = "a-8CNHSyvKrgd6-rEuTZZuC7mvPILLS60Pauq07S9f0"; // replace with your Unsplash Access Key

  useEffect(() => {
    const fetchImages = async () => {
      const response = await fetch(
        `https://api.unsplash.com/search/photos?query=${location}&client_id=${accessKey}`
      );
      const data = await response.json();
      setImageUrl(data?.results.slice(0, 4));
    };

    fetchImages();
  }, []);
  return ImageUrl;
};

export default useGetImg;
