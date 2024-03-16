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
import { DeleteIcon } from "@chakra-ui/icons";
import "./Accordation.css";
import { PostPlacesItiId } from "../../lib/Actions/ServerPostActions/PostPlacesItiId";
import { useParams } from "react-router-dom";
import { GetPlacesItiId } from "../../lib/Actions/ServerGetActions/GetPlacesItiId";
import { useAppState } from "../../utils/Hooks/useAppState";
import axios from "axios";
import { SERVER_URL } from "../../utils/exportItem";
const Accordation = ({ title, dataDetails }) => {
  const { state, dispatch } = useAppState();
  const [placeItiDetails, setplaceItiDetails] = useState([]);
  const { itiId, pId } = useParams();
  const [AddPlaceValue, setAddPlaceValue] = useState();
  const [getPlacesValue, setGetPlacesValue] = useState();
  const [filterPlacetoVisitData, setfilterPlacetoVisitData] = useState();
  const [filterRecomendedPlace, setfilterRecomendedPlace] = useState();
  const [deletePlacesId, setdeletePlacesId] = useState();
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

  //Adding places with marker in map
  const handleAddPlaces = async (data) => {
    const returnValue = await PostPlacesItiId(itiId, data);
    setAddPlaceValue(returnValue);
  };

  //Getting places detail with place_id
  const getPlacesAddedDetails = async () => {
    const xRes = await GetPlacesItiId(itiId);
    setGetPlacesValue(xRes);
  };
  useEffect(() => {
    getPlacesAddedDetails();
  }, [itiId, AddPlaceValue, deletePlacesId]);

  //Apply filter
  const filterPost = async () => {
    // Filter out elements based on place_id comparison
    const filteredArray = placeItiDetails.filter((place) => {
      return getPlacesValue?.ItiDetails.some(
        (detail) => detail.place_itiid === place.place_id
      );
    });
    setfilterPlacetoVisitData(filteredArray);
    const addPla = {
      type: "filter_PlaceValue",
      payload: filteredArray,
    };
    dispatch(addPla);

    //filter array for recomended places
    const filteredArrays = placeItiDetails.filter((place) => {
      return !getPlacesValue?.ItiDetails.some(
        (detail) => detail.place_itiid === place.place_id
      );
    });
    setfilterRecomendedPlace(filteredArrays);
  };

  useEffect(() => {
    filterPost();
  }, [getPlacesValue, placeItiDetails]);
  //get delete
  const handleDeletePlaceId = async (data) => {
    let place_ItiId = data.place_id;

    const response = await axios.delete(
      `${SERVER_URL}/api/place-details/deleteItiPlacesDetails/${itiId}/${place_ItiId}`
    );

    let xvalue = response.data;

    if (xvalue) {
      setdeletePlacesId(xvalue);
    }
  };
  return (
    <div>
      <Accordion
        defaultIndex={[0]}
        allowMultiple
        border="transparent"
        marginTop={5}
      >
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
            {filterPlacetoVisitData
              ? filterPlacetoVisitData.map((data) => (
                  <div className="addedplaces">
                    <div className="placetitle">
                      <h4>{data?.name}</h4>
                    </div>
                    <div className="placeimg">
                      {data?.photos && (
                        <img src={data?.photos?.url} alt={data?.name} />
                      )}
                    </div>
                    <div
                      className="delete-icon"
                      onClick={() => handleDeletePlaceId(data)}
                    >
                      <p>
                        <DeleteIcon />
                      </p>
                    </div>
                  </div>
                ))
              : "Add place u want to visit"}

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
                      {filterRecomendedPlace &&
                        filterRecomendedPlace.map((place, index) => (
                          <div className="r-places" key={index}>
                            <div className="r-img">
                              {place?.photos && (
                                <img
                                  src={place?.photos?.url}
                                  alt={place?.name}
                                />
                              )}
                            </div>
                            <div className="r-name">{place?.name}</div>
                            <div
                              className="add-places"
                              onClick={() => handleAddPlaces(place?.place_id)}
                            >
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
