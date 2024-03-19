import React, { useEffect, useState } from "react";
import "./NestedLink.css";
import { ChevronRightIcon, DeleteIcon } from "@chakra-ui/icons";
import { Button, ButtonGroup, Box } from "@chakra-ui/react";
import useGetImg from "../../utils/Hooks/placesHook/useGetImg";
const NestedLink = ({ data }) => {
  const [placelinkDetails, setplacelinkDetails] = useState(null);
  const [description, setDescription] = useState("");
  const images = useGetImg(placelinkDetails?.name);

  //getting place info details..............

  useEffect(() => {
    const service = new window.google.maps.places.PlacesService(
      document.createElement("div")
    );

    service.getDetails(
      { placeId: "ChIJ_3YDv3uTlTkRZCGAJTuCz_Y" },
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
  //getting images from .........
  const imageUrls = images?.map((data) => {
    return data?.urls?.small;
  });
  //desc getting from wiki of places
  /*  const location = "phewa lake"; // replace with your location

  useEffect(() => {
    const fetchDescription = async () => {
      const url = `https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&origin=*&titles=${location}`;
      const response = await fetch(url);
      const data = await response.json();
      const pages = data?.query?.pages;
      const page = Object.values(pages)[0];
      const fullExtract = page?.extract;
      const briefExtract = fullExtract.split(". ").slice(0, 2).join(". ") + ".";
      setDescription(briefExtract);
    };

    fetchDescription();
  }, []);
  console.log(description); */
  return (
    <div className="mainlink-container">
      <div className="link-container">
        <div className="innerlink-container">
          <div className="title">
            <h2 className="t-head">{placelinkDetails?.name}</h2>
          </div>

          <div className="description">
            <p>
              pokhara is beautiful contry of nepal. Lorem ipsum dolor sit amet
              consectetur, adipisicing elit. Culpa odit sint animi ratione illo?
              Autem voluptates numquam, voluptas, dolores blanditiis, quisquam
              sapiente voluptatum magnam tempore eum fugit. Exercitationem,
              minima officiis?
            </p>
          </div>
          <Button
            className="right-arrow"
            backgroundColor="#4caf50"
            marginTop={1}
          >
            <h5>Details</h5>
            <ChevronRightIcon color={"white"} paddingTop={0.2} fontSize={23} />
          </Button>
        </div>
        {/*  <Box className="images" border="1px solid black">
          {ImageUrl.map((image, index) => {
            return (
              <Box border="1px solid black">
                <img
                  key={index}
                  src={image?.urls?.small}
                  alt={image.alt_description}
                />
              </Box>
            );
          })}
        </Box> */}
      </div>
    </div>
  );
};

export default NestedLink;
