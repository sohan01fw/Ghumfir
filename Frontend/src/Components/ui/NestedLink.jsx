import React, { useEffect, useState } from "react";
import "./NestedLink.css";
import { ChevronRightIcon, DeleteIcon } from "@chakra-ui/icons";
import { Button, ButtonGroup, Box } from "@chakra-ui/react";
import useGetImg from "../../utils/Hooks/placesHook/useGetImg";
const NestedLink = ({ data }) => {
  const [placelinkDetails, setplacelinkDetails] = useState(null);
  const [description, setDescription] = useState("");
  //place name
  let p_name = placelinkDetails?.name;
  //getting place info details..............

  useEffect(() => {
    const service = new window.google.maps.places.PlacesService(
      document.createElement("div")
    );

    service.getDetails(
      { placeId: data?.itiInfo?.place_Id },
      (place, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          // Access place details here:
          const { name, photos, place_id } = place;
          const photo = photos.slice(0, 4);
          const showObj = {
            name,
          };
          setplacelinkDetails(showObj);

          // Handle additional logic based on the place data
        } else {
          console.error("Places API error:", status);
        }
      }
    );
  }, [data]);

  //desc getting from wiki of places

  useEffect(() => {
    const fetchDescription = async () => {
      const url = `https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&origin=*&titles=${p_name}`;
      const response = await fetch(url);
      const data = await response.json();
      const pages = data?.query?.pages;
      const page = Object.values(pages)[0];
      const fullExtract = page?.extract;
      const briefExtract = fullExtract.split(". ").slice(0, 2).join(". ") + ".";
      setDescription(briefExtract);
    };

    fetchDescription();
  }, [p_name]);

  return (
    <Box className="mainlink-container">
      <Box className="link-container">
        <Box className="innerlink-container">
          <div className="title">
            <h2 className="t-head">{placelinkDetails?.name}</h2>
          </div>

          <Box className="description" border="1px solid black">
            <p>{description}</p>
          </Box>
          <Button
            className="right-arrow"
            backgroundColor="#4caf50"
            marginTop={1}
          >
            <h5>Details</h5>
            <ChevronRightIcon color={"white"} paddingTop={0.2} fontSize={23} />
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default NestedLink;
