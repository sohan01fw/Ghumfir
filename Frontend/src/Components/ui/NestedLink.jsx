import React, { useEffect, useState } from "react";
import "./NestedLink.css";
import { ChevronRightIcon, DeleteIcon } from "@chakra-ui/icons";
import { Button, ButtonGroup, Box, Image } from "@chakra-ui/react";
import useGetImg from "../../utils/Hooks/placesHook/useGetImg";
import { useParams } from "react-router-dom";
const NestedLink = ({ data }) => {
  const [placelinkDetails, setplacelinkDetails] = useState(null);
  const [description, setDescription] = useState("");
  const { pId } = useParams();

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
  }, []);

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
          <Box display="flex" justifyContent="space-between">
            <Box>
              <Box className="title">
                <h2 className="t-head">{placelinkDetails?.name}</h2>
              </Box>
              <Box className="description" width="80%">
                <p>{description}</p>
              </Box>
            </Box>

            <Box>
              <Image
                src="https://images.unsplash.com/photo-1618083840944-31cc42fcf250?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cG9raGFyYXxlbnwwfHwwfHx8MA%3D%3D"
                alt="img"
                height="60%"
              />
            </Box>
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
