// import React, { useContext, useEffect } from "react";
// import axios from "axios";
// import { SERVER_URL } from "../../utils/exportItem";
// import { useAppState } from "../../utils/Hooks/useAppState";

// const Home = () => {
//   const { state } = useAppState();

//   /*  useEffect(() => {
//     axios
//       .get(`${SERVER_URL}/api/itineries/getAllIti`)
//       .then((data) => {
//         console.log(data);
//       })
//       .catch((error) => {
//         throw new Error(error);
//       });
//   }, []); */
//   const { itiDetails } = state;
//   console.log("checking reducer from homepage", itiDetails);
//   return <div>Home</div>;
// };
import { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Heading,
  Button,
  Text,
  Image,
  IconButton,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { StarIcon } from "@chakra-ui/icons";
import MainNavigation from "../../Components/Navigation/MainNavigation";
import Footer from "../../Components/Footer/Footer";
import travelingImage from "../../assets/traveling-image.jpg";
import user1Image from "../../assets/traveling-image.jpg";
import user2Image from "../../assets/traveling-image.jpg";
import user3Image from "../../assets/traveling-image.jpg";
import user4Image from "../../assets/traveling-image.jpg";
import { getAllPlaces } from "../../lib/Actions/ServerGetActions/getAllPlaces";
const tripsData = [
  {
    id: 1,
    coverPage: travelingImage,
    title: "Trip to Kathmandu",
    userLogo: "../../assets/traveling-image.jpg",
    startDate: "2024-03-10",
    endDate: "2024-03-15",
    numberOfPlaces: 10,
  },
  {
    id: 2,
    coverPage: travelingImage,
    title: "Hiking in the Himalayas",
    userLogo: "../../assets/traveling-image.jpg",
    startDate: "2024-04-01",
    endDate: "2024-04-07",
    numberOfPlaces: 8,
  },

  // Add more trips as needed
];
const reviewsData = [
  {
    id: 1,
    userImage: user1Image,
    userName: "John Doe",
    stars: 5,
    review:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce euismod justo nec urna laoreet, sit amet luctus nunc vestibulum.",
  },
  {
    id: 2,
    userImage: user2Image,
    userName: "Jane Smith",
    stars: 4,
    review:
      "Integer euismod, lacus ut consequat vestibulum, nulla nunc sollicitudin leo, a mattis felis urna vel dui.",
  },
  {
    id: 3,
    userImage: user3Image,
    userName: "Michael Johnson",
    stars: 5,
    review:
      "Duis quis arcu tortor. Sed quis arcu fermentum, interdum eros vel, rutrum magna. Quisque ut justo non tortor.",
  },
  {
    id: 4,
    userImage: user4Image,
    userName: "Emily Williams",
    stars: 4,
    review:
      "Nam convallis sapien sit amet velit placerat, id hendrerit risus semper. Nulla posuere arcu et diam consequat convallis.",
  },
  {
    id: 4,
    userImage: user4Image,
    userName: "Emily Williams",
    stars: 4,
    review:
      "Nam convallis sapien sit amet velit placerat, id hendrerit risus semper. Nulla posuere arcu et diam consequat convallis.",
  },
  {
    id: 4,
    userImage: user4Image,
    userName: "Emily Williams",
    stars: 4,
    review:
      "Nam convallis sapien sit amet velit placerat, id hendrerit risus semper. Nulla posuere arcu et diam consequat convallis.",
  },
  {
    id: 4,
    userImage: user4Image,
    userName: "Emily Williams",
    stars: 4,
    review:
      "Nam convallis sapien sit amet velit placerat, id hendrerit risus semper. Nulla posuere arcu et diam consequat convallis.",
  },
  {
    id: 4,
    userImage: user4Image,
    userName: "Emily Williams",
    stars: 4,
    review:
      "Nam convallis sapien sit amet velit placerat, id hendrerit risus semper. Nulla posuere arcu et diam consequat convallis.",
  },
  {
    id: 4,
    userImage: user4Image,
    userName: "Emily Williams",
    stars: 4,
    review:
      "Nam convallis sapien sit amet velit placerat, id hendrerit risus semper. Nulla posuere arcu et diam consequat convallis.",
  },
];

const Home = ({ isLoggedIn }) => {
  const [resPlacesData, setresPlacesData] = useState(null);
  const [placeId, setPlaceId] = useState(null);

  useEffect(() => {
    const getPlaces = async () => {
      const res = await getAllPlaces();
      setresPlacesData(res);
    };
    getPlaces();
  }, []);
  console.log();
  return (
    <Box>
      <MainNavigation />

      {isLoggedIn ? (
        <></>
      ) : (
        <>
          <Box p={8}>
            <Flex justify="space-between" align="center" mb={4}>
              <Heading as="h2" size="lg">
                Recently Viewed & Upcoming Trips
              </Heading>
              <Link to="/trips">
                <Button colorScheme="green">Plan New Trip</Button>
              </Link>
            </Flex>
            <Flex
              className="recent-upcoming-trips"
              overflowX="auto"
              whiteSpace="nowrap"
              css={{ scrollbarWidth: "none" }} // Hide scrollbar for Firefox
              sx={{
                "&::-webkit-scrollbar": {
                  display: "none", // Hide scrollbar for WebKit browsers
                },
              }}
            >
              {resPlacesData &&
                resPlacesData.map((trip, index) => {
                  const parsedEndDate = new Date(trip?.dates?.endDate); // Use endDate instead of startDate
                  const parsedDate = new Date(trip?.dates?.startDate);

                  // Extract the date components for the start date
                  const year = parsedDate.getUTCFullYear();
                  const month = parsedDate.getUTCMonth() + 1; // Months are zero-based, so add 1
                  const day = parsedDate.getUTCDate();

                  // Extract the date components for the end date
                  const years = parsedEndDate.getUTCFullYear();
                  const months = parsedEndDate.getUTCMonth() + 1; // Months are zero-based, so add 1
                  const days = parsedEndDate.getUTCDate();

                  // Format the start date
                  const formattedStartDate = `${year}-${month
                    .toString()
                    .padStart(2, "0")}-${day.toString().padStart(2, "0")}`;

                  // Format the end date
                  const formattedEndDate = `${years}-${months
                    .toString()
                    .padStart(2, "0")}-${days.toString().padStart(2, "0")}`;

                  console.log(`Formatted start date: ${formattedStartDate}`);
                  console.log(`Formatted end date: ${formattedEndDate}`);

                  return (
                    <TripCard
                      key={index}
                      {...trip}
                      startDate={formattedStartDate}
                      endDate={formattedEndDate}
                    />
                  );
                })}
            </Flex>
          </Box>
          {/* Text Section */}
          <Flex>
            <Box flex="1" bg="white" p={8} position="relative" zIndex="1">
              <Box bg="white" p={6}>
                <Heading as="h1" size="2xl" mb={4}>
                  You'll never travel without our trip planner again
                </Heading>
                <Text fontSize="lg" mb={6}>
                  Travel planning at its best. Build, organize, and map your
                  custom itineraries in a free travel app designed for vacations
                  & road trips, powered by our trip planner AI.
                </Text>
                <Link to="/trips">
                  <Button colorScheme="green" size="lg">
                    Start Planning
                  </Button>
                </Link>
              </Box>
              <Box
                bg="white"
                w="0"
                h="0"
                borderTop="50px solid transparent"
                borderBottom="50px solid transparent"
                borderRight="50px solid white"
                position="absolute"
                right="0"
                bottom="0"
              />
            </Box>

            {/* Image Section */}
            <Flex flex="1" justifyContent="flex-end">
              <Image
                src={travelingImage}
                alt="Traveling"
                objectFit="cover"
                w="100%"
                h="100%"
              />
            </Flex>
          </Flex>

          {/* Reviews Section */}

          <Box bg="gray.100" py={8}>
            <Heading as="h2" size="lg" textAlign="center" mb={6}>
              What travelers can't stop talking about
            </Heading>
            <Flex
              overflowX="auto"
              css={{
                "&::-webkit-scrollbar": {
                  display: "none",
                },
                scrollSnapType: "x mandatory",
              }}
            >
              {reviewsData.map((review) => (
                <ReviewCard key={review.id} {...review} />
              ))}
            </Flex>
          </Box>
        </>
      )}

      <Footer />
    </Box>
  );
};

const TripCard = ({ coverPage, title, id, places, startDate, endDate }) => {
  return (
    <Link to={`/tripPlaces/${id}`}>
      <Box
        maxW="sm"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        flex="0 0 auto"
        mr={4}
        boxShadow="md"
      >
        <Image src={coverPage} alt={title} />
        <Box p="4">
          <Flex align="center" mb={2}>
            <Image
              src="https://images.unsplash.com/photo-1618083840944-31cc42fcf250?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cG9raGFyYXxlbnwwfHwwfHx8MA%3D%3D"
              alt="User Logo"
              boxSize="30px"
              borderRadius="10%"
              mr={2}
            />
            <Text fontSize="sm">{places}</Text>
          </Flex>
          <Heading as="h3" size="md" mb={2}>
            {title}
          </Heading>
          <Text fontSize="sm" color="gray.500" mb={2}>
            {startDate} - {endDate}
          </Text>
        </Box>
      </Box>
    </Link>
  );
};

const ReviewCard = ({ userImage, userName, stars, review }) => {
  return (
    <Box
      bg="white"
      p={4}
      mx={2}
      borderRadius="lg"
      boxShadow="md"
      maxW="320px"
      flex="0 0 auto"
    >
      <Flex align="center" mb={2}>
        <Image
          src={userImage}
          alt="User"
          boxSize="40px"
          borderRadius="full"
          mr={2}
        />
        <Text>{userName}</Text>
      </Flex>
      <Flex mb={2}>
        {Array.from({ length: stars }, (_, index) => (
          <StarIcon key={index} color="green.400" />
        ))}
      </Flex>
      <Text mb={4}>{review}</Text>
    </Box>
  );
};
export default Home;
