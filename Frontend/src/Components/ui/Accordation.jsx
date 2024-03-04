import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Button,
  Image,
} from "@chakra-ui/react";
import "./Accordation.css";
const Accordation = ({ title, dataDetails }) => {
  const [placeItiDetails, setplaceItiDetails] = useState([]);

  //getting place details from google api server
  const getPlaceDetails = () => {
    const service = new window.google.maps.places.PlacesService(
      document.createElement("div")
    );

    service.nearbySearch(
      {
        location: {
          lat: parseFloat(dataDetails?.itiInfo?.geolocation?.lat),
          lng: parseFloat(dataDetails?.itiInfo?.geolocation?.lng),
        },
        radius: 5000, // You can adjust the radius as needed
        type: [
          /* "natural_feature",
          "Nature & Parks",
          "Nature & Wildlife Areas",
          "Sights & Landmarks",
          "Waterfalls",
          "Lake", */
          "Temple",
          "Caverns & Caves",
          "Things to do",
        ], // You can specify the type of places you want
        keyword: "Things to do", // You can add a keyword to narrow down your results
        exclude: ["restaurant", "lodging"], // You can exclude places from your results
      },
      (results, status) => {
        let promise = results.map((result) => {
          return new Promise((resolve) => {
            service.getDetails(
              { placeId: result.place_id },
              (detailResult, detailStatus) => {
                const places = {
                  business_status: detailResult.business_status,
                  address: detailResult.formatted_address,
                  name: detailResult.name,
                  photos: {
                    url: detailResult.photos?.[0].getUrl(),
                    height: detailResult.photos?.[0].height,
                    width: detailResult.photos?.[0].width,
                  },
                  geo: {
                    lat: detailResult.geometry?.location?.lat(),
                    lng: detailResult.geometry?.location?.lng(),
                  },
                  place_id: detailResult.place_id,
                  rating: detailResult.rating,
                  user_total_rating: detailResult.user_ratings_total,
                  reviews: detailResult.reviews,
                };

                resolve(places);
              }
            );
          });
        });
        Promise.all(promise).then((results) => {
          setplaceItiDetails(results);
        });
      }
    );
  };
  useEffect(() => {
    getPlaceDetails();
  }, [dataDetails]);
  console.log(placeItiDetails);
  return (
    <div>
      <Accordion defaultIndex={[0]} allowMultiple border="transparent">
        <AccordionItem>
          <h2>
            <AccordionButton width={"160px"}>
              <AccordionIcon color={"black"} paddingRight={"5px"} />
              <Box color={"black"} whiteSpace={"nowrap"} fontWeight="600">
                {title}
              </Box>
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <div className="addedplaces">
              <div className="placetitle">
                <h4>Phewa Lake</h4>
              </div>
              <div className="placeimg">
                <img
                  src="https://www.bing.com/th?id=OIP.2z6Gv66T56RbDX5VMqKYUgHaFj&w=155&h=110&c=8&rs=1&qlt=90&o=6&dpr=1.1&pid=3.1&rm=2"
                  alt=""
                />
              </div>
            </div>
            <div className="inner-accor">
              <Accordion defaultIndex={[0]} allowMultiple border="transparent">
                <AccordionItem>
                  <h2>
                    <AccordionButton width={"190px"}>
                      <AccordionIcon color={"black"} paddingRight={"5px"} />
                      <Box
                        color={"black"}
                        whiteSpace={"nowrap"}
                        fontWeight="600"
                      >
                        Recomended places
                      </Box>
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>
                    <div className="recomended-places">
                      {placeItiDetails &&
                        placeItiDetails.map((place, index) => (
                          <div className="r-places">
                            <div className="r-img">
                              {place?.photos && (
                                <img
                                  src={place?.photos?.url}
                                  alt={place?.name}
                                />
                              )}
                            </div>
                            <div className="r-name">{place?.name}</div>
                            <div className="add-places">
                              <Button
                                colorScheme="blackAlpha"
                                bgColor="#f1f2f5"
                                width="10px"
                                height="29px"
                              >
                                <p>+</p>
                              </Button>
                            </div>
                          </div>
                        ))}
                    </div>
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
            </div>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default Accordation;
